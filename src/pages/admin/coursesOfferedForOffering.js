import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './admin';

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;
const CoursesAvailableForOffering = () => {
  const [courses, setCourses] = useState([]); // For storing available courses
  const [departments, setDepartments] = useState([]); // For storing available departments
  const [newCourse, setNewCourse] = useState({
    courseId: '',
    courseName: '',
    offeringDepartment: '', // This will store the department's _id
    credits: '',
    ltpsc: '',
    prerequisites: [], // This will store array of selected prerequisite course IDs
  });

  useEffect(() => {
    // Fetch all available courses
    axios.get(`${ADMIN_URL}/courses`)
      .then(response => setCourses(response.data))
      .catch(error => console.error('Error fetching courses:', error));

    // Fetch all available departments
    axios.get(`${ADMIN_URL}/departments`)
      .then(response => setDepartments(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handlePrerequisiteToggle = (courseId) => {
    setNewCourse((prevState) => {
      const isAlreadySelected = prevState.prerequisites.includes(courseId);
      const updatedPrerequisites = isAlreadySelected
        ? prevState.prerequisites.filter(id => id !== courseId)
        : [...prevState.prerequisites, courseId];

      return {
        ...prevState,
        prerequisites: updatedPrerequisites,
      };
    });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ADMIN_URL}/courses`, newCourse);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      <Header></Header>
      <div style={{ margin: '70px'}}>
        <h2>Courses Available for Offering</h2>
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.courseId} className="course-box">
              <p><strong>Course ID:</strong> {course.courseId}</p>
              <p><strong>Course Name:</strong> {course.courseName}</p>
              <p><strong>Offering Department:</strong> {course.offeringDepartment}</p>
              <p><strong>Credits:</strong> {course.credits}</p>
              <p><strong>LTPSC:</strong> {course.ltpsc}</p>
              <p><strong>Prerequisites:</strong> {course.prerequisites.map(p => p.courseId).join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
           
        <h2>Create a New Course</h2>
        <form onSubmit={handleCreateCourse}>
          <div>
            <label>Course ID</label>
            <input
              type="text"
              name="courseId"
              value={newCourse.courseId}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Course Name</label>
            <input
              type="text"
              name="courseName"
              value={newCourse.courseName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Offering Department</label>
            <select
              name="offeringDepartment"
              value={newCourse.offeringDepartment}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments && departments.length > 0 ? (
                departments.map(({ _id, departmentName }) => (
                  <option key={_id} value={_id}>{departmentName}</option>
                ))
              ) : (
                <option disabled>No departments available</option>
              )}
            </select>
          </div>

          <div>
            <label>Credits</label>
            <input
              type="number"
              name="credits"
              value={newCourse.credits}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>LTPSC</label>
            <input
              type="text"
              name="ltpsc"
              value={newCourse.ltpsc}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Prerequisites</label>
            <div>
              {courses && courses.length > 0 ? (
                courses.map(({ _id, courseId, courseName }) => (
                  <div key={_id} style={{display:'flex',alignItems: 'center'}}>
                    <label htmlFor={`prerequisite-${_id}`} >
                      {courseId} - {courseName}
                    </label>
                    <input
                      style = {{width: '20px', height: '20px', marginLeft: '10px'}}
                      type="checkbox"
                      id={`prerequisite-${_id}`}
                      checked={newCourse.prerequisites.includes(_id)}
                      onChange={() => handlePrerequisiteToggle(_id)}
                    />
                  </div>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          </div>

          {/* Display selected prerequisites */}
          {newCourse.prerequisites.length > 0 && (
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {newCourse.prerequisites.map((courseId) => {
                  const selectedCourse = courses.find(course => course._id === courseId);
                  return (
                    selectedCourse && (
                      <div
                        key={courseId}
                      >
                        {selectedCourse.courseId}
                        <button
                          type="button"
                          style={{
                            marginLeft: '1px',
                            background: 'none',
                            border: 'none',
                            color: '#f00',
                            cursor: 'pointer',
                          }}
                          onClick={() => handlePrerequisiteToggle(courseId)}
                        >
                          ✖
                        </button>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )}

          <button type="submit">Create Course</button>
        </form>
      </div> 
     
    </div>
  );
};

export default CoursesAvailableForOffering;
