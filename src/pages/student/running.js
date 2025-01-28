import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {useAuth} from '../../AuthContext';

import Navbar from './navbar'

const RunningEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, role, email} = useAuth();

    // Fetch running enrollments on component mount
    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/student/enrollmentsrunning/${email}`);
                setEnrollments(response.data);
            } catch (err) {
                console.error('Error fetching running enrollments:', err);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchEnrollments();
    }, []);

    return (
        <div className="">
            <Navbar />
            <h1 className=" font-bold mb-4">Running Enrollments</h1>
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Student Name</th>
                        <th className="border border-gray-300 p-2">Student ID</th>
                        <th className="border border-gray-300 p-2">Department</th>
                        <th className="border border-gray-300 p-2">Program</th>
                        <th className="border border-gray-300 p-2">Course</th>
                        <th className="border border-gray-300 p-2">Status</th>
                        <th className="border border-gray-300 p-2">Enrollment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {enrollments.map((enrollment) => (
                        <tr key={enrollment._id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 p-2">
                                {enrollment.studentId?.userId?.name || 'N/A'}
                            </td>
                            <td className="border border-gray-300 p-2">{enrollment.studentId?.studentId}</td>
                            <td className="border border-gray-300 p-2">{enrollment.studentId?.department}</td>
                            <td className="border border-gray-300 p-2">{enrollment.studentId?.program}</td>
                            <td className="border border-gray-300 p-2">{enrollment.offeringId?.courseCode}</td>
                            <td className="border border-gray-300 p-2">{enrollment.status}</td>
                            <td className="border border-gray-300 p-2">
                                {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RunningEnrollments;
