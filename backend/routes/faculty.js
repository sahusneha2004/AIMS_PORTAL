const express = require('express');
const router = express.Router();

const Enrollment = require('../models/Enrollment')
const Offering = require('../models/Offering')
const course = require('../models/Course')
const session = require('../models/Session')

// create a course by faculty
router.post('/createcourse', async (req, res) => {
    const savedCourse = await course.create({
        coursecode : req.body.coursecode,
        coursename : req.body.coursename,
        department : req.body.department,
        ltpsc : req.body.ltpsc,
        prerequisites : req.body.prerequisites,
        status : 'created',
    });
    res.json({ message: 'Course added successfully'});
});


// offer the course by faculty
router.post('/offercourse' , async(req,res) =>{
    
    const s = await session.findOne({academicYear : Number(req.body.academicyear) , phase : req.body.phase })
    const offering = await Offering.create({
        coursecode : req.body.coursecode,
        sessionId : s._id,
        status : 'pendingAdminApproval',
        eligibleBatches : req.body.batch,
        maxSeats : 120
    })
    res.json({ message: 'Course offered successfully'});
})


// fetch all the courses that have been available for offerings
router.get('/availablecourse', async(req,res) => {

    const courses = await course.find();
    res.status(200).json(courses);
})


// fetch the courses that have been offered by the faculty but needs approval from the admin
router.get('/courseneedadminapproval', async (req,res) =>{
    const offerings = await Offering.find({status : 'pendingAdminApproval'});
    res.status(200).json(offerings);
})


// fetch all the students that must be given acceptance or rejection
router.get('/studentneedapproval', async (req,res) =>{
    const enrollment = await Enrollment.find({status : 'pendingInstructorApproval'})
    res.status(200).json(enrollment);
})


// fetch all the courses you created and needs approval from admin
router.get('/createdcourseneedapproval', async (req,res) =>{
    const courses = await course.find({status : 'created'});
    res.status(200).json(courses);
})

// fetch the courses that have been approved by the admin
router.get('/offeredcourses' , async (req,res) =>{
    const offerings = await Offering.find({status : 'approved'});
    res.status(200).json(offerings);
})

// fetch all the courses created by the faculty and has been approved
router.get('/createdcourses' , async (req,res) =>{
    const courses = await course.find({status : 'approved'});
    res.status(200).json(courses);
})

module.exports = router;
