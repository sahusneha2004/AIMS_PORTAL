const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Offering = require('../models/Offering')
const Enrollment = require('../models/Enrollment')
const router = express.Router();

router.get('/eligible-courses', async (req, res) => {
    try {
      const { email } = req.query;
  
      // Step 1: Find the User ID using email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Step 2: Find the Student details using userId
      const student = await Student.findOne({ userId: user._id });
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Step 3: Fetch all offerings where the student's enrollmentYear matches eligibleBatches
      const eligibleCourses = await Offering.find({
        eligibleBatches: { $in: [student.enrollmentYear] }, // Match enrollmentYear with eligibleBatches
      });
      
      // Step 4: Return eligible courses
      res.status(200).json({ courses: eligibleCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
router.post('/create-enrollment', async (req, res) => {
    const { email, offeringId } = req.body;

    try {
        // Step 1: Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Step 2: Find student by userId
        const student = await Student.findOne({ userId: user._id });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Step 3: Check if the student is already enrolled in the same course
        const existingEnrollment = await Enrollment.findOne({
            studentId: student._id,
            offeringId: offeringId,
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Student is already enrolled in this course' });
        }

        // Step 4: Create enrollment
        const newEnrollment = new Enrollment({
            studentId: student._id,
            offeringId: new mongoose.Types.ObjectId(offeringId), // Proper instantiation of ObjectId
            enrollmentDate: new Date(),
            status: 'pendingInstructorApproval',
            departmentName: student.department, // Assuming department is in Student model
        });

        // Step 5: Save the enrollment
        const savedEnrollment = await newEnrollment.save();

        // Send response
        return res.status(201).json({
            message: 'Enrollment created successfully',
            enrollment: savedEnrollment,
        });
    } catch (error) {
        console.error('Error creating enrollment:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

  
module.exports = router;
