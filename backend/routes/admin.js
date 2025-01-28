const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js');
const Session =require('../models/Session.js');
const Student = require('../models/Student.js');
const Faculty = require('../models/Faculty.js');
const Event = require('../models/Event.js');
const Department = require('../models/Department.js');
const Course = require('../models/Course.js');
const Admin = require('../models/Admin.js');
const Offering = require('../models/Offering.js');
const Enrollment = require('../models/Enrollment.js');
// const URI =' mongodb+srv://sahusneha031:aimsportal@cluster0a.uvrcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0a'

const router = express.Router()

let otpStorage = {};
const bodyParser = require('body-parser');
const multer = require('multer');

const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');
const JWT_SECRET= secret;


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: "sahusneha031@gmail.com", // Ensure the email is correctly formatted
    pass: "eitm jykj rmes ckfu", // Use your actual app-specific password here
  },
  debug: true,
  port: 587, // Use 587 for TLS
  secure: false, // Set to false for TLS
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Error:", error); // Log detailed SMTP error
  } else {
    console.log("SMTP Connection successful:", success);
  }
});

// Endpoint to send OTP
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Check if the email exists in the User collection
    const user = await User.findOne({ email }); // Replace 'User' with your Mongoose model name
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate OTP if email exists
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false });
    console.log("Generated OTP:", otp);
    otpStorage[email] = [otp, user.role]; // Store the OTP and role in the temporary storage

    const mailOptions = {
      from: "sahusneha031@gmail.com", // Your email
      to: email,
      subject: "Your OTP for Login",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions); // Sending the email
    res.json({ message: "OTP sent successfully!", role: user.role }); // Include role in the response
  } catch (error) {
    console.error("Error sending OTP:", error); // Log the detailed error
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// Endpoint to verify OTP
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  console.log(otpStorage[email]);
  const role = otpStorage[email][1];
  if (otpStorage[email] && otpStorage[email][0] === otp) {
    delete otpStorage[email]; // Clear OTP after verification

    // Query the database to get the user's role
    const token = jwt.sign(
      { email, role }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    ); 
    res.json({ message: "OTP verified successfully!", token, role, email });
     // Include role in the response
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const { academicYear, phase } = req.body;

    const newSession = new Session({ academicYear, phase });
    const savedSession = await newSession.save();

    res.status(201).json({ message: 'Session created successfully!', session: savedSession });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});
router.post('/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user with the hashed password
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Save to the database
    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User created successfully!',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Email must be unique' });
    } else {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
});
router.post('/students', upload.single('studentImage'), async (req, res) => {
    try {
      const { userId, studentId, enrollmentYear, program, department} = req.body;
  
      // Check for required fields
      if (!userId || !studentId || !enrollmentYear || !program || !department) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
  
      // Check if studentId already exists
      const existingStudent = await Student.findOne({ studentId });
      if (existingStudent) {
        return res.status(400).json({ message: `Student ID '${studentId}' already exists!` });
      }
  
      // Create a new student
      const newStudent = new Student({
        userId,
        studentId,
        enrollmentYear,
        program,
        department
      });
  
      // If an image is uploaded, store it in the student record
      if (req.file) {
        newStudent.studentImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
  
      // Save to the database
      const savedStudent = await newStudent.save();
  
      res.status(201).json({
        message: 'Student created successfully!',
        student: savedStudent,
      });
    } catch (error) {
      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Duplicate key error. Ensure all unique fields are unique.' });
      }
  
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });

router.post('/faculty', async (req, res) => {
    try {
      const { userId, facultyId, department, designation, joiningYear, retiringYear } = req.body;
  
      const newFaculty = new Faculty({ userId, facultyId, department, designation, joiningYear, retiringYear });
      const savedFaculty = await newFaculty.save();
  
      res.status(201).json({ message: 'Faculty created successfully!', faculty: savedFaculty });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  router.post('/events', async (req, res) => {
    try {
      const { eventName, sessionId, startDate, endDate } = req.body;
  
      const newEvent = new Event({ eventName, sessionId, startDate, endDate });
      const savedEvent = await newEvent.save();
  
      res.status(201).json({ message: 'Event created successfully!', event: savedEvent });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  router.post('/departments', async (req, res) => {
    try {
      const { departmentName } = req.body;
  
      const newDepartment = new Department({ departmentName });
      const savedDepartment = await newDepartment.save();
  
      res.status(201).json({ message: 'Department created successfully!', department: savedDepartment });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  router.post('/courses', async (req, res) => {
    try {
      const { courseId, courseName, offeringDepartment, credits, ltpsc, prerequisites } = req.body;
      console.log(req.body);
      const newCourse = new Course({ courseId, courseName, offeringDepartment, credits, ltpsc, prerequisites });
      const savedCourse = await newCourse.save();
  
      res.status(201).json({ message: 'Course created successfully!', course: savedCourse });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  router.post('/categories', async (req, res) => {
    try {
      const { categoryName } = req.body;
  
      const newCategory = new Category({ categoryName });
      const savedCategory = await newCategory.save();
  
      res.status(201).json({ message: 'Category created successfully!', category: savedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
  router.post('/feedback', async (req, res) => {
    try {
        const { studentId, offeringId, feedback } = req.body;

        // Validate the request body
        if (!studentId || !offeringId || !feedback) {
            return res.status(400).json({ message: 'Student ID, Offering ID, and Feedback are required.' });
        }

        // Create new feedback entry
        const newFeedback = new Feedback({
            studentId,
            offeringId,
            feedback
        });

        // Save the feedback to the database
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully.', feedback: newFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
router.get('/session', async (req, res) => {
    try {
        const { academicYear, phase } = req.query;

        // Validate input
        if (!academicYear || !phase) {
            return res.status(400).json({ message: 'academicYear and phase are required' });
        }

        // Find the session in the database
        const session = await Session.findOne({ academicYear, phase });

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Respond with the session _id
        res.status(200).json({ sessionId: session._id });
    } catch (error) {
        console.error('Error fetching session:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
router.get('/events', async (req, res) => {
  const { sessionId } = req.query;

  if (!sessionId) {
      return res.status(400).json({ message: 'sessionId is required' });
  }

  try {
      // Find all events with the given sessionId
      const events = await Event.find({ sessionId: mongoose.Types.ObjectId(sessionId) });

      if (events.length === 0) {
          return res.status(404).json({ message: 'No events found for the given sessionId' });
      }

      res.status(200).json(events);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

router.get('/departments', async (req, res) => {
  try {
      // Find all departments
      const departments = await Department.find();
      
      // Return the list of departments
      res.json(departments);
  } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/courses', async (req, res) => {
  try {
      // Find all courses
      const courses = await Course.find();
      
      // Return the list of courses
      res.json(courses);
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/department/:id', async (req, res) => {
  const departmentId = req.params.id;
  
  try {
    const department = await Department.findById(departmentId);
    
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ departmentName: department.departmentName });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// API to get Course ID and Name by Course _id
router.get('/course/:id', async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      courseId: course.courseId,
      courseName: course.courseName,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/faculty', async (req, res) => {
  try {
    const faculty = await Faculty.find();  // Populate user details
    res.json(faculty);
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();  // Populate user details
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports=router;

