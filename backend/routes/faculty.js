const express = require('express');
const router = express.Router();

const Enrollment = require('../models/Enrollment')
const Offering = require('../models/Offering')
const course = require('../models/Course')
const session = require('../models/Session')
const user = require('../models/User')
const student = require('../models/Student')
const faculty = require('../models/Faculty')
const department = require('../models/Department')




// create a course by faculty
router.post('/createcourse/:email', async (req, res) => {

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});
    const savedCourse = await course.create({
        courseCode : req.body.coursecode,
        courseName : req.body.coursename,
        departmentName : req.body.department,
        ltpsc : req.body.ltpsc,
        prerequisites : req.body.prerequisites,
        status : 'notapproved',
        // facultyId : fid
    });
    res.json({ message: 'Course added successfully'});
});




// offer the course by faculty
router.post('/offercourse/:email' , async(req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});
    const s = await session.findOne({academicYear : Number(req.body.academicyear) , phase : req.body.phase })
    const offering = await Offering.create({
        // facultyId : fid
        courseCode : req.body.coursecode,
        sessionId : s._id,
        status : 'pendingAdminApproval',
        eligibleBatches : req.body.batch,
        maxSeats : 120
    })
    res.json({ message: 'Course offered successfully'});
})




// fetch all the courses that have been available for offerings
router.get('/availablecourse/:email', async(req,res) => {

    const courses = await course.find({status : 'approved'});
    res.status(200).json(courses);
})




// fetch the courses that have been offered by the faculty but needs approval from the admin
router.get('/courseneedadminapproval/:email', async (req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    //const offerings = await Offering.find({status : 'pendingAdminApproval' , facultyId : fid });
    const offerings = await Offering.find({status : 'pendingAdminApproval'})
    .populate('sessionId');
    res.status(200).json(offerings);
})




// fetch all the students that must be given acceptance or rejection
router.get('/studentneedapproval/:email', async (req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});


    //const enrollment = await Enrollment.find({ status: 'pendingInstructorApproval', facultyId : fid })
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
router.get('/createdcourseneedapproval/:email', async (req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    const courses = await course.find({status : 'notapproved'});
    //const courses = await course.find({status : 'notapproved' , facultyId : fid });
    res.status(200).json(courses);
})




// fetch the courses that have been approved by the admin
router.get('/offeredcourses/:email' , async (req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    //const offerings = await Offering.find({status : 'approved', facultyId : fid })
    const offerings = await Offering.find({status : 'approved'})
    .populate('sessionId')
    res.status(200).json(offerings);
})




// fetch all the courses created by the faculty and has been approved
router.get('/createdcourses/:email' , async (req,res) =>{

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    //const did = await department.findOne( { departmentName : fid.department } )
    const courses = await course.find({status : 'approved'});
    //const courses = await course.find({status : 'approved', facultyId : });
    res.status(200).json(courses);
})




router.post('/changecoursestatus/:email', async (req, res) => {
    try {
        const { ids, action } = req.body;
        if (!ids || !action) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

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




router.get('/studentneedadvisorapproval/:email' , async (req,res) => {

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    //const did = await department.findOne( { departmentName : fid.department } )
    
    //const enrollment = await Enrollment.find({ status: 'pendingAdvisorApproval', departmentName : did.departmentName })
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




router.post('/changecoursestatusadvisor/:email', async (req, res) => {
    try {
        const { ids, action } = req.body;
        if (!ids || !action) {
            return res.status(400).json({ error: 'Invalid request data' });
        }
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




router.get('/facultyadvisor/:email' , async (req,res) => {

    //const uid = await user.findOne({email : req.params.email})
    //const fid = await faculty.findOne({ userId : uid});

    //const did = await department.findOne( { departmentName : fid.department } )

    //if( did.facultyAdvisor === fid )
    //{
    //    res.status(200).json(true);
    //}
    //else{
    //    res.status(200).json(false)
    //}

} )



router.get('allofferedcourses/:email' , async (req,res) => {

    const s = await session.findOne({academicYear : Number(req.body.academicyear) , phase : req.body.phase })
    const offerings = await Offering.find({ sessionId : s._id })
    .populate('sessionId')
    .populate('facultyId')
    .populate({
        path: 'facultyId',
        populate: { path: 'userId' },
    })
    
    res.status(200).json(offerings)
})


module.exports = router;
