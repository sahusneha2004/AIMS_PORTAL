import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./admin";
import { useAuth } from '../../AuthContext';
require('dotenv').config();

const ADMIN_URL = process.env.ADMIN_URL;
const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const { token, role,email} = useAuth();
    console.log(email)
  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${ADMIN_URL}/departments`);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Add a new department
  const addDepartment = async () => {
    if (!newDepartmentName.trim()) {
      alert("Department name cannot be empty!");
      return;
    }

    try {
      await axios.post(`${ADMIN_URL}/departments`, {
        departmentName: newDepartmentName,
      });
      setNewDepartmentName(""); // Clear the input field
      fetchDepartments(); // Refresh the list
    } catch (error) {
      console.error("Error adding department:", error);
      alert("Failed to add department. Please try again.");
    }
  };

  // Fetch departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);
  
  return (
    <div>
      <Header></Header>
        <div style={{ margin: "100px" }}>
            <h1>Departments</h1>
            <ul>
                {departments.map((department) => (
                <li key={department._id}>{department.departmentName}</li>
                ))}
            </ul>

            <div style={{ marginTop: "20px" }}>
                <input
                type="text"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                placeholder="Enter department name"
                style={{ marginRight: "10px", padding: "5px" }}
                />
                <button onClick={addDepartment} style={{ padding: "5px 10px" }}>
                Add Department
                </button>
            </div>
        </div>
    </div>
  );
};

export default DepartmentsPage;
