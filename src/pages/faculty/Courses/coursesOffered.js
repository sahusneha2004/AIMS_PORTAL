import React, { useEffect, useState } from 'react';
import Landing from '../Landing'

import axios from 'axios'

import {useAuth} from '../../../AuthContext'

function Coursesoffered(){

    const [formData, setFormData] = useState({academicyear: '',phase: ''});
    const [data, setData] = useState([]);
    const { token, role, email} = useAuth();
    const [show , setShow] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/faculty/allofferedcourses/${email}`,formData);
            setData(response.data);
            setShow(true)
            setFormData({academicyear: '',phase: ''});
        } catch (error) {
            console.error('Error adding course:', error);
            setFormData({academicyear: '',phase: ''});
        }
    };

        return (
            <div>
                <Landing />
                <div className='flex items-center justify-start w-[70rem] mt-[4rem] ml-[6rem]  h-[4rem] text-sm'>
                <form className='flex gap-6' onSubmit={handleSubmit}>
                <div className='flex gap-2' >
                    <label>Academic-year:</label>
                    <input className='pl-1 border w-80 ' value={formData.academicyear}  onChange={handleChange} name='academicyear' placeholder='Write the academic year' ></input>
                </div>
                <div  className='flex gap-2'>
                    <label>Phase:</label>
                    <input className='pl-1 border ' value={formData.phase} onChange={handleChange} name='phase' placeholder='Write the phase' ></input>
                </div>
                <button className='border-2 bg-zinc-400 text-sm w-[4rem] ' type="submit">Submit</button>
                </form >
                </div>
                {
                    show &&
                    <table className="ml-4 mt-4 table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr>
                        <th className='font-light'>Academic Session</th>
                        <th className='font-light'>Course Code</th>
                        <th className='font-light'>Faculty Offering</th>
                        <th className='font-light'>Eligible Batches</th>
                        <th className='font-light'>MaxSeats</th>
                        <th className='font-light'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((d,index) => (
                            <tr className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white '} >
                                <td>{d.sessionId.academicYear} {d.sessionId.phase}</td>
                                <td>{d.courseCode}</td>
                                <td>{d.facultyId.userId.name}</td>
                                <td> {d.eligibleBatches &&  d.eligibleBatches.map( (e)=> (
                                    <h1>{e}</h1>))} </td>
                                <td>{d.maxSeats}</td>
                                <td className='font-semibold'>Offered</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                }
            </div>
            
        );
};

export default Coursesoffered;
