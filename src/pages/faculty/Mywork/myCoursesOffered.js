import React, { useEffect, useState } from 'react';

import axios from 'axios'

function MyCoursesOffered(){

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/faculty/offeredcourses');
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
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Course Name</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>2024-I</td>
                                <td>CS-302</td>
                                <td>Computer Networking</td>
                                <td>Dept of Computer Science </td>
                                <td className='font-semibold'>Approved by Admin</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
};

export default MyCoursesOffered;
