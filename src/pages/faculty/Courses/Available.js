import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Landing from '../Landing'

import {useAuth} from '../../../AuthContext'


function Available(){

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token, role, email} = useAuth();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/faculty/availablecourse/${email}`);
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };
    
        fetchData();
    }, []);

    return (
        <div>
            <Landing />
            <div className='mt-[4rem] ml-[6rem]'>
            <div className='border-b w-[72rem] h-[2rem]'>
                <h1>Courses available for offerings</h1>
            </div>
            {loading ? (
            <p>Loading...</p>) :
            (
                <div className='flex flex-wrap '>
                    {courses.map((course) => (
                        <div className='border w-80 p-5 text-sm'>
                            <h1>{course.departmentName}</h1>
                            <h1>{course.courseCode}</h1>
                            <h1>{course.courseName}</h1>
                            <h1>{course.ltpsc}</h1>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
        
    );
};

export default Available;
