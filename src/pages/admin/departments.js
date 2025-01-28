import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./admin";
import { useAuth } from '../../AuthContext';

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL;
const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const { token, role, email } = useAuth();
  console.log(token, role, email);
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
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Departments</h1>

        <ul className="bg-white shadow-md rounded-md p-4 mb-6">
          {departments.length > 0 ? (
            departments.map((department) => (
              <li
                key={department._id}
                className="border-b last:border-none py-2 px-4 text-gray-700"
              >
                {department.departmentName}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-center">No departments available.</p>
          )}
        </ul>

        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Department</h2>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
              placeholder="Enter department name"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addDepartment}
              className="bg-blue-500 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Department
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsPage;