import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../App.css'


function Landing(){

     const { logout } = useAuth(); // Get logout function from AuthContext
     const navigate = useNavigate();   
          
       
    function HandleLogout() {
        logout(); // Perform logout
        navigate('/'); // Redirect to login page
    }
    const [a, seta] = useState(false);
    const [b, setb] = useState(false);

    const toggleDropa = () => {
    if( b === true )
        setb(false)
    seta(!a);
};

    const toggleDropb = () => {

    if( a === true )
        seta(false)
    setb(!b);
};

    function setOff(){
        seta(false)
        setb(false)
    }
    return (
       
        <div >

        <div className="flex bg-[#333] w-full items-center header">

            <div onClick={setOff}>
                <h6 className="text-zinc-100 ml-4"><Link to='/home'> AIMS </Link></h6>
            </div>

            <div className="menu">
                <button className="menu-button flex-item" onClick={toggleDropa}>
                Courses ▾
                </button>
                {a && (
                <div className="dropdown">
                <ul>
                    <li onClick={toggleDropa}> <Link to="/coursesoffered">Courses Offered For Enrolment</Link> </li>
                    <li onClick={toggleDropa}> <Link to="/offercourse">Offer a Course For Enrolment</Link> </li>
                    <li onClick={toggleDropa}> <Link to="/available">Courses Available For Offering</Link> </li>
                    <li onClick={toggleDropa}> <Link to="/create">Create New Course</Link> </li>
                    <li onClick={toggleDropa}> <Link to="/uploadgrade">Upload Grades</Link> </li>
                </ul>
            </div>
            )}
            </div>

            <div className="menu">
                <button className="menu-button" onClick={toggleDropb}>
                    My Work ▾
                </button>
                {b && (
                    <div className="dropdown">
                    <ul>
                    <li onClick={toggleDropb}> <Link to="/mycoursesoffered"> Courses Offered</Link></li>
                    <li onClick={toggleDropb}> <Link to="/mycreatedcourses"> Courses Created</Link></li>
                    <li onClick={toggleDropb}> <Link to="/actionpending"> Action Pending</Link> </li>
                    </ul>
                    </div>
                    )}
            </div>

            <div onClick={setOff}  >
                <h6 className="text-zinc-100 ml-4"> <Link to='/help' >  Help </Link> </h6>
            </div>
            <button className="logout-button ml-14 " onClick={HandleLogout}>
                                <FaSignOutAlt size={20} />
            </button>
        </div>
        </div>
   
);
}

export default Landing;


//how can my frontend interact with my backend in react , suppose my pages want to fetch some data from the apis set
//  up in the backend or want to submit a form and upload some info in my database at the backend , how can i do this in react