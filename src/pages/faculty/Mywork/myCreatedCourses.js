import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Landing from '../Landing'

import {useAuth} from '../../../AuthContext'

function MyCreatedCourses(){

    const [data, setData] = useState([]);
    const { token, role, email} = useAuth();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/faculty/createdcourses/${email}`);
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
            <h1>Created Courses Detail</h1>
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr >
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Course Name</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>L-T-P-S-C</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                <td>{d.courseCode}</td>
                                <td>{d.courseName}</td>
                                <td>{d.departmentName}</td>
                                <td>{d.ltpsc}</td>
                                <td className='font-semibold'>Approved by Admin</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        </div>
    )
};

export default MyCreatedCourses;
