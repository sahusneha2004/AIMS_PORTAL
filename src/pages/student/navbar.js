import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="flex items-center">
                <div className="space-x-4">
                <Link
                        to="/student/enroll"
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                        Enroll for Courses
                    </Link>
                    <Link
                        to="/student/enrollmentspending"
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                        Pending Enrollments
                    </Link>
                    <Link
                        to="/student/enrollmentsrunning"
                        className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded"
                    >
                        Running Enrollments
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
