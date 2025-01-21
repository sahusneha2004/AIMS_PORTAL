import React, { useEffect, useState } from 'react';
import axios from 'axios'

function ActionPending(){
    
    const [create , setCreate] = useState(true)
    const [main, setMain] = useState(false)
    const [enrollment, setEnrollment] = useState(false)
    const [data, setData] = useState([]);

    async function handleCreate(){
        setCreate(true)
        setMain(false)
        setEnrollment(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/createdcourseneedapproval');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for create:', error);
        }
    }

    async function handleMain(){
        setEnrollment(false)
        setMain(true)
        setCreate(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/courseneedadminapproval');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for main:', error);
        }
    }
        
    async function handleEnrollment(){
        setMain(false)
        setEnrollment(true)
        setCreate(false)
        try {
            const response = await axios.get('http://localhost:5000/faculty/studentneedapproval');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data for enrollment:', error);
        }
    }
    
    return (
    
    <div className='mt-[2rem] ml-[4rem]'>
        <div className='flex '>
            <button onClick={handleCreate} className='pl-1 border border-gray-500 bg-gray-300' > New Courses Created </button>
            <button onClick={handleMain} className='pl-1 border border-gray-500 bg-gray-300' > OfferedCourses </button>
            <button onClick={handleEnrollment} className='pl-1 border border-gray-500 bg-gray-300' >Enrollment</button>
        </div>
        {create &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Course Name</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>L-T-P-S-C</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>{d.coursecode}</td>
                                <td>{d.coursename}</td>
                                <td>{d.department}</td>
                                <td>{d.ltpsc}</td>
                                <td className='font-semibold'>Needs Admin Approval</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }

        {main &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Eligible Batches</th>
                        <th className='font-light'>Max Seats</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>2024-I</td>
                                <td>{d.coursecode}</td>
                                <td>{d.eligibleBatches.forEach( (e)=> (
                                    <h1>{e}</h1>
                                ) )}</td>
                                <td>{d.maxSeats} </td>
                                <td className='font-semibold'>Needs Admin Approval</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    
        {
            enrollment &&
            (
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Student Name</th>
                        <th className='font-light'>Batch-year</th>
                        <th className='font-light'>Department</th>
                        <th className='font-light'>Status</th>
                        <th className='font-light'>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'} >
                                <td>2024-I</td>
                                <td>CS-302</td>
                                <td>Prateek Bansal</td>
                                <td>2022</td>
                                <td>Dept of Computer Science </td>
                                <td className='font-semibold'>Enrolling</td>
                                <button >Offer</button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
        }
    </div>
    )

};

export default ActionPending;
