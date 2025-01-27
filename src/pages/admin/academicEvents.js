import React, { useState } from 'react';
import axios from 'axios';
import Header from './admin';

function AcademicEvents() {
    const [academicYear, setAcademicYear] = useState('');
    const [phase, setPhase] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [newSession, setNewSession] = useState({
        academicYear: '',
        phase: '',
    });
    
    const [newEvent, setNewEvent] = useState({
        eventName: '',
        startDate: '',
        endDate: '',
        academicYear: '',
        academicPhase: '',
    });
    
    // Single state variable to toggle between forms
const     [isFormVisible, setIsFormVisible] = useState(null); // null means no form is visible, 'session' for session form, 'event' for event form

    const handleFetchEvents = async () => {
        try {
            setError(''); // Clear any previous errors

            // Step 1: Fetch session ID
            const sessionResponse = await axios.get('http://localhost:8080/admin/session', {
                params: { academicYear, phase },
            });

            const sessionId = sessionResponse.data.sessionId;
            console.log('Session ID:', sessionId);

            // Step 2: Fetch events using session ID
            const eventsResponse = await axios.get('http://localhost:8080/admin/events', {
                params: { sessionId },
            });

            setEvents(eventsResponse.data); // Store events in state
        } catch (err) {
            console.error(err);
            setError('Error fetching session or events. Please check your input.');
        }
    };

    const handleCreateEvent = async () => {
        try {
            setError(''); // Clear any previous errors

            const sessionResponse = await axios.get('http://localhost:8080/admin/session', {
                params: { 
                    academicYear: newEvent.academicYear, 
                    phase: newEvent.academicPhase 
                },
            });

            const sessionId = sessionResponse.data.sessionId;
            console.log('Session ID:', sessionId);

            const newEventData = {
                eventName: newEvent.eventName,
                sessionId: sessionId,
                startDate: newEvent.startDate,
                endDate: newEvent.endDate,
            };

            // Create new event via API
            const response = await axios.post('http://localhost:8080/admin/events', newEventData);
            // const { eventName, sessionId, startDate, endDate } = req.body;
           
            setNewEvent({
                eventName: '',
                startDate: '',
                endDate: '',
                academicYear: '',
                academicPhase: '', // Reset academicPhase
            }); // Reset form fields
            setIsFormVisible(null); // Hide the form after event is created
        } catch (err) {
            console.error(err);
            setError('Error creating event. Please check your input.');
        }
    };

    const handleCreateSession = async () => {
        try {
            setError(''); // Clear any previous errors

            const newSessionData = {
                academicYear: newSession.academicYear,
                phase: newSession.academicPhase,
            };

            // Create new session via API
            const response = await axios.post('http://localhost:8080/admin/sessions', newSessionData);
            // const { academicYear, phase } = req.body;
           
            setNewSession({
                academicYear: '',
                academicPhase: '', // Reset academicPhase
            }); // Reset form fields
            setIsFormVisible(null); // Hide the form after session is created
        } catch (err) {
            console.error(err);
            setError('Error creating session. Please check your input.');
        }
    };

    return (
        <div>
            <Header />
            <div style={{ marginTop: '150px', marginLeft: '50px' }}>
            <button className="aims-login" onClick={() => setIsFormVisible(isFormVisible === 'session' ?  null : 'session')}>
                Add Session
            </button>

            <button className="aims-login" onClick={() => setIsFormVisible(isFormVisible === 'event' ?  null : 'event')}>
                Add Event
            </button>
                {isFormVisible === 'session' && (
                    <div>
                        <h3>Create New Session</h3>
                        <div>
                            <label>Academic Year:</label>
                            <input
                                type="text" // Corrected input type to text
                                value={newSession.academicYear}
                                onChange={(e) => setNewSession({ ...newSession, academicYear: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Phase (I or II):</label>
                            <input
                                type="text" // Corrected input type to text
                                value={newSession.academicPhase}
                                onChange={(e) => setNewSession({ ...newSession, academicPhase: e.target.value })}
                            />
                        </div>

                        <button className="aims-login" onClick={handleCreateSession}>Create Session</button>
                    </div>
                )}

                {isFormVisible === 'event' && (
                    <div>
                        <h3>Create New Event</h3>
                        <div>
                            <label>Event Name:</label>
                            <input
                                type="text"
                                value={newEvent.eventName}
                                onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Academic Year:</label>
                            <input
                                type="text" // Corrected input type to text
                                value={newEvent.academicYear}
                                onChange={(e) => setNewEvent({ ...newEvent, academicYear: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Phase (I or II):</label>
                            <input
                                type="text" // Corrected input type to text
                                value={newEvent.academicPhase}
                                onChange={(e) => setNewEvent({ ...newEvent, academicPhase: e.target.value })}
                            />
                        </div>

                        <div>
                            <label>Start Date:</label>
                            <input
                                type="date"
                                value={newEvent.startDate}
                                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={newEvent.endDate}
                                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                            />
                        </div>
                        <button className="aims-login" onClick={handleCreateEvent}>Create Event</button>
                    </div>
                )}

                <div>
                    <label>Academic Year:</label>
                    <input
                        type="text"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phase:</label>
                    <select value={phase} onChange={(e) => setPhase(e.target.value)}>
                        <option value="">Select Phase</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                    </select>
                </div>
                <button className="aims-login" onClick={handleFetchEvents}>Fetch Events</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div>
                    <h2>Events:</h2>
                    {events.length > 0 ? (
                        <ul>
                            {events.map((event, index) => (
                                <li key={event._id || index}>  {/* Use event._id or fallback to index */}
                                    <h3>{event.eventName}</h3>
                                    <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
                                    <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AcademicEvents;
