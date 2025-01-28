import React, { useEffect, useState } from 'react';
import Landing from './Landing'
import { useAuth } from '../../AuthContext';
function AboutPage(){
    const {email, role, token} = useAuth();
    console.log("help");
    console.log(role, email);
    console.log("help");
    return (
        <div>
        <Landing/>
        <div className='mt-[6rem] ml-14 items-center justify-center'>
            <h1>Looking for a help,</h1>
            <h2>Go to our User Guide <span className='font-semibold'> provide Link to user guide here </span></h2>
        </div>
        </div>

    );
};

export default AboutPage;
