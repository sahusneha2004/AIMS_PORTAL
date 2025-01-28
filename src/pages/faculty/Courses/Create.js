import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Landing from '../Landing'

import {useAuth} from '../../../AuthContext'


function Create(){

    const [formData, setFormData] = useState({coursecode : '', coursename : '', department: '' , ltpsc:'' });
    const [message, setMessage] = useState('');
    const [preq , setPreq] = useState('')
    const { token, role, email} = useAuth();
    const [departments, setDepartments] = useState([]);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/departments');
            const data = response.data;
            
            const departmentMap = [];
            data.forEach((dept) => {
                departmentMap.push(dept.departmentName);
            });
            
            setDepartments(departmentMap); // Update state with the department names
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };
    

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handlePreq = (event) =>{
        const value = event.target.value
        setPreq(value)
    }

    const handleSubmit = async (e) => {
        
        const wordsArray = preq.split(/[\s,]+/);
        const updatedFormData = { ...formData, prerequisites :  wordsArray  };
        e.preventDefault();
        try {
        const response = await axios.post(`http://localhost:5000/faculty/createcourse/${email}`, updatedFormData);
        setMessage('Course added successfully!');
        setFormData({coursecode : '', coursename : '', department: '' , ltpsc:'' , prerequisites : []});
        setPreq('')
        } catch (error) {
        console.error('Error adding course:', error);
        setMessage('Error adding course');
        setFormData({coursecode : '', coursename : '', department: '' , ltpsc:'', prerequisites : []});
        setPreq('')
        }
    };
    
    function setOff(){
        setMessage('')
    }

        
    
        return (
            <div>
                <Landing />
                <div className='mt-[4rem] ml-[6rem]'>
                <div className='flex items-center justify-start w-[70rem] border-b h-[6rem]'>
                    <form className='flex gap-6 flex-wrap text-sm' onSubmit={handleSubmit}>
                        <div  className='flex gap-2'>
                            <label>Coursecode: </label>
                            <input className='pl-1 border' value={formData.coursecode}  onChange={handleChange}  name='coursecode' placeholder='Enter the Course-code' ></input>
                        </div>
                        <div  className='flex gap-2'>
                            <label>Coursename: </label>
                            <input className='pl-1 border' value={formData.coursename}  onChange={handleChange}  name='coursename' placeholder='Enter the Course-Name' ></input>
                        </div>
                        <div  className='flex gap-2'>
                            <label for="dropdown">Department:</label>
                            <select className='border' id="dropdown" name="department" value={formData.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            {departments.map( (d) => (
                                <option  value={d}>
                                {d}
                                </option>
                            ))}
                            </select>
                        </div>
                        <div  className='flex gap-2'>
                            <label>L-T-P-S-C: </label>
                            <input className='pl-1 border ' value={formData.ltpsc}  onChange={handleChange}  name='ltpsc' placeholder='L-T-P-S-C' ></input>
                        </div>
                        <div className='flex gap-2'>
                            <label>Pre-requisites:</label>
                            <input className='pl-1 border w-60' onChange={handlePreq} value={preq} placeholder='prerequisites' ></input>
                        </div>
                        <button className='border-2 bg-zinc-400 text-sm w-[4rem] ' type="submit">Create</button>
                    </form >
                </div>
        
                {message &&
                <div className='flex mt-[4rem] gap-2 items-center border-2 border-green-500 p-5 w-[32rem] '>
                    <p className="text-green-500 text-sm">{message}</p>
                    <button onClick={setOff} className='border bg-green-400 w-10 rounded-lg' >Ok</button>
                </div>
                }
            </div>
            </div>
        );
};

export default Create;
