import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios'
import Landing from '../Landing'
import { useNavigate } from 'react-router-dom';

import {useAuth} from '../../../AuthContext'

function MyCoursesOffered(){
    
    const navigate = useNavigate();
    const [main, setMain] = useState(false);
    const [enrollment, setEnrollment] = useState(false);
    const [data, setData] = useState([]);
    const { token, role, email} = useAuth();
    
    const handleButtonClick = (e) => {
        const id = e.target.value; // Example ID
        navigate(`/enrolledstudents/${id}`);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/faculty/offeredcourses/${email}`);
            setData(response.data);
        } catch (err) {
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
    <div>
        <Landing />
        <div className='flex flex-col mt-[4rem] ml-[6rem] gap-2 '>
            <h1>Offered Courses Detail</h1>
                <table className=" table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Eligible Batches</th>
                        <th className='font-light'>MaxSeats</th>
                        <th className='font-light'>Status</th>
                        <th className='font-light'>Show Students Enrolled</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                <td>{d.sessionId.academicYear} {d.sessionId.phase}</td>
                                <td>{d.courseCode}</td>
                                <td> {d.eligibleBatches &&  d.eligibleBatches.map( (e)=> (
                                    <h1>{e}</h1>))} </td>
                                <td>{d.maxSeats}</td>
                                <td className='font-semibold'>Offered</td>
                                <td><button className='px-2 py-1 bg-orange-500 text-white rounded' value={d._id} onClick={handleButtonClick}>Enrolled Students</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        </div>
    )
};

export default MyCoursesOffered;
