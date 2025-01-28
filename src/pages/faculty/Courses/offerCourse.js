import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Landing from '../Landing'

import {useAuth} from '../../../AuthContext'

function Offercourse(){

    const [formData, setFormData] = useState({academicyear: '',phase: '', coursecode : '' });
    const [batches, setBatches] = useState('')
    const [message, setMessage] = useState('');
    const { token, role, email} = useAuth();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleBatch = (event) => {
        const value = event.target.value
        setBatches(value)
    }

    const handleSubmit = async (e) => {
        
        const numberArray = batches
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(Number);
        
        const updatedFormData = { ...formData, batch: numberArray };
        console.log(formData)
        e.preventDefault();
        try {
        const response = await axios.post(`http://localhost:5000/faculty/offercourse/${email}`, updatedFormData);
        setMessage('Course offered successfully!');
        setFormData({academicyear: '',phase: '',batch:[], coursecode : '' });
        setBatches('')
        } catch (error) {
        console.error('Error adding course:', error);
        setMessage('Error adding course');
        setFormData({academicyear: '',phase: '',batch:[], coursecode : '' });
        setBatches('')
        }
    };

    function setOff(){
        setMessage('')
    }

    return (
        <div>
            <Landing />
            <div className='mt-[4rem] ml-[6rem]'>
            <div className='flex items-center justify-start w-[70rem] border-b h-[6rem] text-sm'>
                <form className='flex gap-4 flex-wrap' onSubmit={handleSubmit}>
                    <div className='flex gap-2' >
                        <label>Academic-year:</label>
                        <input className='pl-1 border w-80 ' value={formData.academicyear}  onChange={handleChange} name='academicyear' placeholder='Write the academic year' ></input>
                    </div>
                    <div  className='flex gap-2'>
                        <label>Phase:</label>
                        <input className='pl-1 border ' value={formData.phase} onChange={handleChange} name='phase' placeholder='Write the phase' ></input>
                    </div>
                    <div  className='flex gap-2'>
                        <label>Coursecode: </label>
                        <input className='pl-1 border ' value={formData.coursecode} onChange={handleChange}  name='coursecode' placeholder='Enter the Course-code' ></input>
                    </div>
                    <div  className='flex gap-2'>
                        <label>Eligible-Batches: </label>
                        <input className='pl-1 border w-60' value={batches} onChange={handleBatch}  placeholder='Enter the Eligible Batches' ></input>
                    </div>
                    <button className='border-2 bg-zinc-400 text-sm w-[4rem] rounded-lg ' type="submit">Offer</button>
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

export default Offercourse;
