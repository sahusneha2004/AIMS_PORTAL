import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Landing from '../Landing'

import {useAuth} from '../../../AuthContext'
function ActionPending(){
    
    const [isadvisor, setIsadvisor] = useState(false);
    const [create , setCreate] = useState(true)
    const [main, setMain] = useState(false)
    const [enrollment, setEnrollment] = useState(false)
    const [advisor, setAdvisor]  = useState(false);
    const [data, setData] = useState([]);
    const { token, role, email} = useAuth();
    
    
    // set this to true if your logged in faculty is an advisor
    //const isadvisor = false;
    const [loading, setLoading] = useState(true);
    const [selectedRows, setSelectedRows] = useState([]);
    const [rows , setRows] = useState([]);
    const [show , setShow] = useState(false)
    const [s , setS] = useState(false)
    
    const checkAdvisor = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/faculty/facultyadvisor/${email}`);
            console.log('Advisor check response:', response.data);
            setIsadvisor(response.data); // Update the state with true/false
        } catch (err) {
            console.error('Error fetching advisor:', err);
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };

    useEffect(() => {
        if (email) {
            checkAdvisor(); // Call checkAdvisor when email is available
        }
    }, [email]);

    useEffect( () => {
        handleCreate();
    }, [])

    async function handleCreate(){
        setCreate(true)
        setMain(false)
        setEnrollment(false)
        setAdvisor(false)
        try {
            const response = await axios.get(`http://localhost:5000/faculty/createdcourseneedapproval/${email}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for create:', error);
        }
    }

    async function handleMain(){
        setAdvisor(false)
        setEnrollment(false)
        setMain(true)
        setCreate(false)
        try {
            const response = await axios.get(`http://localhost:5000/faculty/courseneedadminapproval/${email}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for main:', error);
        }
    }
        
    async function handleEnrollment(){
        setMain(false)
        setEnrollment(true)
        setCreate(false)
        setAdvisor(false)
        try {
            const response = await axios.get(`http://localhost:5000/faculty/studentneedapproval/${email}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for enrollment:', error);
        }
    }

    async function handleAdvisor(){
        setAdvisor(true)
        setMain(false)
        setCreate(false)
        setEnrollment(false)
        try {
            const response = await axios.get(`http://localhost:5000/faculty/studentneedadvisorapproval/${email}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for enrollment:', error);
        }
    }

    const handleCheckboxChange = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id)); // Unselect row
        } else {
            setSelectedRows([...selectedRows, id]); // Select row
        }
    };
    
    const handleCheckbox = (id) => {
        if (rows.includes(id)) {
            setRows(rows.filter((rowId) => rowId !== id)); // Unselect row
        } else {
            setRows([...rows, id]); // Select row
        }
    };

    function handleClick(){
        setShow(!show)
    }

    function handleClickadvisor(){
        setS(!s)
    }

    const handleAction = async (action) => {
        try {
            // Send selected row IDs and action to the backend
            await axios.post(`http://localhost:5000/faculty/changecoursestatus/${email}`, {
                ids: selectedRows,
                action: action,
            });
            setShow(false)
            alert(`${action} action applied successfully`);
            setSelectedRows([]);
            handleEnrollment();
        } catch (error) {
            console.error(`Error applying ${action} action:`, error);
        }
    };

    const handleActionadvisor = async (action) => {
        try {
            // Send selected row IDs and action to the backend
            await axios.post(`http://localhost:5000/faculty//changecoursestatusadvisor/${email}`, {
                ids: rows,
                action: action,
            });
            setS(false)
            alert(`${action} action applied successfully`);
            setRows([]);
            handleAdvisor();
        } catch (error) {
            console.error(`Error applying ${action} action:`, error);
        }
    };
    

    if (loading) {
        return <div>Loading...</div>; // Show a loading screen while waiting for `checkAdvisor`
    }
    
    return (
    
    <div>
    <Landing />
    <div className='mt-[4rem] ml-[6rem]'>
        <div className='flex '>
            <button onClick={handleCreate} className='pl-1 border border-gray-500 bg-gray-300' > New Courses Created </button>
            <button onClick={handleMain} className='pl-1 border border-gray-500 bg-gray-300' > OfferedCourses </button>
            <button onClick={handleEnrollment} className='pl-1 border border-gray-500 bg-gray-300' >Enrollment</button>
            {isadvisor && <button onClick={handleAdvisor} className='pl-1 border border-gray-500 bg-gray-300' >Approve as Advisor</button> }
        </div>
        {create &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Course Name</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>L-T-P-S-C</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data&&data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                <td>{d.courseCode}</td>
                                <td>{d.courseName}</td>
                                <td>{d.departmentName}</td>
                                <td>{d.ltpsc}</td>
                                <td className='font-semibold'>Needs Admin Approval</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }

        {main &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Eligible Batches</th>
                        <th className='font-light'>Max Seats</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                {d && <td> {d.sessionId?.academicYear || 'N/A'} {d.sessionId?.phase || 'N/A'} </td>}
                                <td>{d.courseCode}</td>
                                <td> {d.eligibleBatches &&  d.eligibleBatches.map( (e)=> (
                                    <h1>{e}</h1>))} </td>
                                <td>{d.maxSeats} </td>
                                <td className='font-semibold'>{d.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    
        {
            enrollment &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Student Name</th>
                        <th className='font-light'>Batch-year</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>Status</th>
                        <th className='font-light'>

                        <div className="relative">
                            <button
                            className="px-2 py-1 bg-orange-500 text-white rounded"
                            onClick={handleClick}>Action</button>
                            {show && < div
                            className="absolute right-0 mt-1 w-32 bg-white shadow-lg border "
                            style={{ zIndex: 1000 }}>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleAction('Approve')}>Approve</button>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleAction('Reject')}>Reject</button>
                            </div>}
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '}>
                                {d&&<td>{d.offeringId?.sessionId.academicYear || 'N/A'} {d.offeringId?.sessionId.phase || 'N/A'} </td>}
                                <td>{d.offeringId?.courseCode || 'N/A'}</td>
                                <td>{d.studentId?.userId?.name || 'N/A'}</td>
                                <td>{d.studentId?.enrollmentYear || 'N/A'}</td>
                                <td>{d.studentId?.department || 'N/A'}</td>
                                <td className='font-semibold'>{d.status}</td>
                                <td className='flex gap-2'>
                                    <input type="checkbox"
                                        onChange={() => handleCheckboxChange(d._id)}
                                        checked={selectedRows.includes(d._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                

                
            )
        }
        
        {
            advisor &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Student Name</th>
                        <th className='font-light'>Batch-year</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>Status</th>
                        <th className='font-light'>

                        <div className="relative">
                            <button
                            className="px-2 py-1 bg-orange-500 text-white rounded"
                            onClick={handleClickadvisor}>Action</button>
                            {s && < div
                            className="absolute right-0 mt-1 w-32 bg-white shadow-lg border "
                            style={{ zIndex: 1000 }}>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleActionadvisor('Approve')}>Approve</button>
                                <button
                                className="block w-full px-2 py-1 hover:bg-gray-200 text-left"
                                onClick={() => handleActionadvisor('Reject')}>Reject</button>
                            </div>}
                        </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {data && data.map((d, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '}>
                                {d&&<td>{d.offeringId?.sessionId.academicYear || 'N/A'} {d.offeringId?.sessionId.phase || 'N/A'} </td>}
                                <td>{d.offeringId?.courseCode || 'N/A'}</td>
                                <td>{d.studentId?.userId?.name || 'N/A'}</td>
                                <td>{d.studentId?.enrollmentYear || 'N/A'}</td>
                                <td>{d.studentId?.department || 'N/A'}</td>
                                <td className='font-semibold'>{d.status}</td>
                                <td className='flex gap-2'>
                                    <input type="checkbox"
                                        onChange={() => handleCheckbox(d._id)}
                                        checked={rows.includes(d._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                

                
            )
        }

    </div>
    </div>
    )

};

export default ActionPending;
