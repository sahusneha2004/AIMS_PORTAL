import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'

import { useParams } from 'react-router-dom';

function Enrolledstudents(){
    
    const { id } = useParams();
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/faculty/enrolledstudents/${id}`);
            setData(response.data);
        } catch (err) {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
    
        <div className='flex flex-col mt-[2rem] ml-[4rem] gap-2 '>
            <h1>Offered Courses Detail</h1>
                <table className=" table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Student Name</th>
                        <th className='font-light'>Enrollment Year</th>
                        <th className='font-light'>Course Code</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                <td>{d.offeringId.sessionId.academicYear} {d.offeringId.sessionId.phase}</td>
                                <td>{d.studentId.userId.name}</td>
                                <td>{d.studentId.enrollmentYear}</td>
                                <td>{d.offeringId.courseCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
};

export default Enrolledstudents;
