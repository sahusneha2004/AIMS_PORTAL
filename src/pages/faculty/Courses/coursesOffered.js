import React, { useEffect, useState } from 'react';
import Landing from '../Landing'

function Coursesoffered(){

    const [formData, setFormData] = useState({academicyear: '',phase: '',});
        const [message, setMessage] = useState('');
    
        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            // Example: Sending data to a backend API (use fetch or axios)
            setMessage('Form submitted successfully!');
        };
    
        return (
            <div>
                <Landing />
                <div className='flex items-center justify-start w-[70rem] mt-[6rem] ml-[6rem] border-b h-[4rem] text-sm'>
                <form className='flex gap-6' onSubmit={handleSubmit}>
                <div className='flex gap-2' >
                    <label>Academic-year:</label>
                    <input className='pl-1 border w-80 '  onChange={handleChange} name='academicyear' placeholder='Write the academic year' ></input>
                </div>
                <div  className='flex gap-2'>
                    <label>Phase:</label>
                    <input className='pl-1 border '  onChange={handleChange} name='phase' placeholder='Write the phase' ></input>
                </div>
                <button className='border-2 bg-zinc-400 text-sm w-[4rem] ' type="submit">Submit</button>
                </form >
            </div>
            </div>
            
        );
};

export default Coursesoffered;
