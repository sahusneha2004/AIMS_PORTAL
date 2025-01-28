import React, { useEffect, useState } from 'react';
import Header from './admin';
import { useAuth } from "../../AuthContext";

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;

function AcademicProfiles() {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState({});
  const [view, setView] = useState('students');
  const [formData, setFormData] = useState({});
  const [isStudentForm, setIsStudentForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    fetchUsers();
    fetchDepartments();// Fetch categories for the dropdown
    fetchFaculty();
    fetchStudents();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
 
  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/departments`);
      const data = await response.json();
      const departmentMap = {};
      data.forEach((dept) => {
        departmentMap[dept._id] = dept.departmentName;
      });
      setDepartments(departmentMap);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchFaculty = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/faculty`);
      const data = await response.json();
      setFaculty(data);
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${ADMIN_URL}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.name : 'N/A';
  };

  const getUserEmail = (userId) => {
    const user = users.find((u) => u._id === userId);
    return user ? user.email : 'N/A';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create the user
      const userResponse = await fetch(`${ADMIN_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: isStudentForm ? 'student' : 'faculty',
        }),
      });

      if (!userResponse.ok) {
        const error = await userResponse.json();
        throw new Error(error.message);
      }

      const user = await userResponse.json();

      const endpoint = isStudentForm ? `${ADMIN_URL}/students` : `${ADMIN_URL}/faculty`;

      const body= isStudentForm ? {
        userId: user.user.id,
        studentId:formData.studentId, 
        enrollmentYear:formData.enrollmentYear , 
        program:formData.program , 
        department:formData.department
      }:
      {
        userId: user.user.id,
        joiningYear:formData.joiningYear , 
        designation:formData.designation , 
        department:formData.department
      }
      ;

      console.log(body);

      const entityResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!entityResponse.ok) {
        const error = await entityResponse.json();
        throw new Error(error.message);
      }
      fetchUsers(); // Refresh users list
      if (isStudentForm) fetchStudents();
      else fetchFaculty();

      setShowForm(false);
      alert(`${isStudentForm ? 'Student' : 'Faculty'} added successfully!`);
    } catch (error) {
      console.error('Error adding student/faculty:', error);
      alert(`Failed to add ${isStudentForm ? 'student' : 'faculty'}: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
    

      <div style={{ display: 'flex', margin: '20px', marginTop:"50px" }}>
        <button
          style={{
            margin: '20px 10px',
            padding: '10px 20px',
            backgroundColor: view === 'students' ? '#007bff' : '#f8f9fa',
            color: view === 'students' ? '#fff' : '#000',
            border: '1px solid #007bff',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
          onClick={() => setView('students')}
        >
          Students
        </button>
        <button
          style={{
            margin: '20px',
            padding: '10px 20px',
            backgroundColor: view === 'faculty' ? '#007bff' : '#f8f9fa',
            color: view === 'faculty' ? '#fff' : '#000',
            border: '1px solid #007bff',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
          onClick={() => setView('faculty')}
        >
          Faculty
        </button>
      </div>

      {view === 'students' ? (
        <div style={{ padding: '20px' }}>
          <button className="bg-green-600 text-white font-bold p-4 rounded-lg"
            onClick={() => {
              setIsStudentForm(true);
              setShowForm(true);
            }}
          >
            Add a Student
          </button>
          <h2 style={{margin: '5px'}} >Students</h2>
          <table   style={{
                width: '100%',
                textAlign: 'left',
                marginBottom: '20px',
                borderCollapse: 'collapse',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ddd',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',}}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Program</th>
                <th>Department</th>
                <th>Enrollment Year</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.studentId}</td>
                  <td>{getUserName(student.userId)}</td>
                  <td>{getUserEmail(student.userId)}</td>
                  <td>{student.program}</td>
                  <td>{student.department || 'N/A'}</td>
                  <td>{student.enrollmentYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <button className="bg-green-600 text-white font-bold p-4 rounded-lg"
            onClick={() => {
              setIsStudentForm(false);
              setShowForm(true);
            }}
          >
            Add a Faculty
          </button>
          <h2 style={{margin: '5px'}}>Faculty</h2>
          <table border="1" style={{
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: '20px',
                  borderCollapse: 'collapse',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '14px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Joining Year</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((member) => (
                <tr key={member._id}>
                  <td>{getUserName(member.userId)}</td>
                  <td>{getUserEmail(member.userId)}</td>
                  <td>{member.department || 'N/A'}</td>
                  <td>{member.designation}</td>
                  <td>{member.joiningYear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div
        style={{
          position: 'fixed',
          top: '20%',
          left: '30%',
          width: '40%',
          maxHeight: '70vh', // Ensure the form doesn't overflow the viewport height
          overflowY: 'auto', // Add vertical scrolling inside the form
          padding: '20px',
          background: '#fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          zIndex: 1000, // Ensure it's above other content
        }}
      >
      
          <h2>{isStudentForm ? 'Add Student' : 'Add Faculty'}</h2>
          <form className= "addForm" onSubmit={handleFormSubmit}>
            <input name="name" placeholder="Name" onChange={handleInputChange} required />
            <input name="email" placeholder="Email" type="email" onChange={handleInputChange} required />
           
            {isStudentForm ? (
              <>
                <input name="studentId" placeholder="Student ID" onChange={handleInputChange} required />
                <select name="program" onChange={handleInputChange} required>
                  <option value="">Select Program</option>
                  <option value="BTech">BTech</option>
                  <option value="BSc">BSc</option>
                  <option value="MSc">MSc</option>
                  <option value="PhD">PhD</option>
                  <option value="MTech">MTech</option>
                </select>
                <input name="enrollmentYear" placeholder="Enrollment Year" onChange={handleInputChange} required />
                <select name="department" onChange={handleInputChange} required>
                  <option value="">Select Department</option>
                  {Object.entries(departments).map(([id, name]) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
             
             <select name="designation" onChange={handleInputChange} required>
                  <option value="">Designation</option>
                  <option value="Associate Professor">Associate Professor</option>
                  <option value="Professor">Professor</option>
                </select>

                <input name="joiningYear" placeholder="Joining Year" onChange={handleInputChange} required />
                <select name="department" onChange={handleInputChange} required>
                  <option value="">Select Department</option>
                  {Object.entries(departments).map(([id, name]) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </>
            )}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AcademicProfiles;
