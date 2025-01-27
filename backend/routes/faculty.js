const express = require('express');
const router = express.Router();

const Enrollment = require('../models/Enrollment')
const Offering = require('../models/Offering')
const course = require('../models/Course')
const session = require('../models/Session')
const user = require('../models/User')
const student = require('../models/Student')

// create a course by faculty
router.post('/createcourse', async (req, res) => {
    const savedCourse = await course.create({
        courseCode : req.body.coursecode,
        courseName : req.body.coursename,
        departmentName : req.body.department,
        ltpsc : req.body.ltpsc,
        prerequisites : req.body.prerequisites,
        status : 'notapproved',
        // facultyId :
    });
    res.json({ message: 'Course added successfully'});
});


// offer the course by faculty
router.post('/offercourse' , async(req,res) =>{
    
    const s = await session.findOne({academicYear : Number(req.body.academicyear) , phase : req.body.phase })
    const offering = await Offering.create({
        // facultyId :
        courseCode : req.body.coursecode,
        sessionId : s._id,
        status : 'pendingAdminApproval',
        eligibleBatches : req.body.batch,
        maxSeats : 120
    })
    res.json({ message: 'Course offered successfully'});
})


// fetch all the courses that have been available for offerings
router.get('/availablecourse', async(req,res) => {

    const courses = await course.find({status : 'approved'});
    res.status(200).json(courses);
})


// fetch the courses that have been offered by the faculty but needs approval from the admin
router.get('/courseneedadminapproval', async (req,res) =>{

    const offerings = await Offering.find({status : 'pendingAdminApproval'})
    .populate('sessionId');
    //const offerings = await Offering.find({status : 'pendingAdminApproval' , facultyId : });
    res.status(200).json(offerings);
})


// fetch all the students that must be given acceptance or rejection
router.get('/studentneedapproval', async (req,res) =>{

    //const enrollment = await Enrollment.find({ status: 'pendingInstructorApproval', facultyId :  })
    const enrollment = await Enrollment.find({ status: 'pendingInstructorApproval' })
    .populate('studentId')
    .populate({
        path: 'studentId',
        populate: { path: 'userId' },
    })
    .populate('offeringId')
    .populate({
        path: 'offeringId',
        populate: { path: 'sessionId' },
    });
    res.status(200).json(enrollment);
})


// fetch all the courses you created and needs approval from admin
router.get('/createdcourseneedapproval', async (req,res) =>{
    const courses = await course.find({status : 'notapproved'});
    //const courses = await course.find({status : 'notapproved' , facultyId : });
    res.status(200).json(courses);
})

// fetch the courses that have been approved by the admin
router.get('/offeredcourses' , async (req,res) =>{

    //const offerings = await Offering.find({status : 'approved', facultyId : })
    const offerings = await Offering.find({status : 'approved'})
    .populate('sessionId')
    res.status(200).json(offerings);
})

// fetch all the courses created by the faculty and has been approved
router.get('/createdcourses' , async (req,res) =>{
    const courses = await course.find({status : 'approved'});
    //const courses = await course.find({status : 'approved', facultyId : });
    res.status(200).json(courses);
})

router.post('/changecoursestatus', async (req, res) => {
    try {
        const { ids, action } = req.body; // Receive selected row IDs and action
        if (!ids || !action) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        // Update status for all selected IDs
        await Enrollment.updateMany(
            { _id: { $in: ids } },
            { $set: { status: action === 'Approve' ? 'pendingAdvisorApproval' : 'rejected' } }
        );

        res.status(200).json({ message: `Status updated to ${action}` });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

router.get('/enrolledstudents/:id', async (req,res) =>{
    const enrollment = await Enrollment.find({ offeringId : req.params.id , status : 'running' })
    .populate('studentId')
    .populate({
        path: 'studentId',
        populate: { path: 'userId' },
    })
    .populate('offeringId')
    .populate({
        path: 'offeringId',
        populate: { path: 'sessionId' },
    });
    res.status(200).json(enrollment);
})

router.get('/studentneedadvisorapproval' , async (req,res) => {
    
    //const enrollment = await Enrollment.find({ status: 'pendingAdvisorApproval', departmentName :  })
    const enrollment = await Enrollment.find({ status: 'pendingAdvisorApproval'})
    .populate('studentId')
    .populate({
        path: 'studentId',
        populate: { path: 'userId' },
    })
    .populate('offeringId')
    .populate({
        path: 'offeringId',
        populate: { path: 'sessionId' },
    });
    res.status(200).json(enrollment);
})

router.post('/changecoursestatusadvisor', async (req, res) => {
    try {
        const { ids, action } = req.body; // Receive selected row IDs and action
        if (!ids || !action) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        // Update status for all selected IDs
        await Enrollment.updateMany(
            { _id: { $in: ids } },
            { $set: { status: action === 'Approve' ? 'running' : 'rejected' } }
        );

        res.status(200).json({ message: `Status updated to ${action}` });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

module.exports = router;
