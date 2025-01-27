import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Help from './Help'
import Coursesoffered from './Courses/coursesOffered'
import Create from './Courses/Create'
import Offercourse from './Courses/offerCourse';
import Uploadgrade from './Courses/uploadGrades';
import Available from './Courses/Available';

import Actionpending from './Mywork/actionPending'
import Mycoursesoffered from './Mywork/myCoursesOffered';
import Mycreatedcourses from './Mywork/myCreatedCourses';

import Enrolledstudents from './Mywork/enrolledStudents'

import '../../App.css'


function Landing(){

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
        <Router>
        <div >

        <div className="flex bg-[#333] w-full items-center">

            <div onClick={setOff}>
                <h6 className="text-zinc-100 ml-4"><Link to='/'> AIMS </Link></h6>
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
        </div>
        </div>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<Help />} />
        <Route path="/coursesoffered" element={<Coursesoffered />} />
        <Route path="/create" element={<Create />} />
        <Route path="/offercourse" element={<Offercourse />} />
        <Route path="/uploadgrade" element={<Uploadgrade />} />
        <Route path="/available" element={<Available />} />
        <Route path="/actionpending" element={<Actionpending />} />
        <Route path="/mycoursesoffered" element={<Mycoursesoffered />} />
        <Route path="/mycreatedcourses" element={<Mycreatedcourses />} />
        <Route path='/enrolledstudents/:id' element={<Enrolledstudents />} />
    </Routes>
    </Router>
);
}

export default Landing;


//how can my frontend interact with my backend in react , suppose my pages want to fetch some data from the apis set
//  up in the backend or want to submit a form and upload some info in my database at the backend , how can i do this in react