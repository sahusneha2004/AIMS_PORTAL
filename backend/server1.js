const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/AIMS-Portal")
const enrollment = require('./models/Enrollment')
const Offering = require('./models/Offering')
const course = require('./models/Course')
const session = require('./models/Session')
const department = require('./models/Department')
const user = require('./models/User')
const student = require('./models/Student')

const app = express();
app.use(cors());
app.use(express.json());


app.get('/hit', async (req,res) => {
    
//await user.create({
//    name: 'Lakshay Pant',
//      email: 'lp@gmail.com' ,
//      password: '123',
//      role: 'student',
//})

    //await student.create({
    //    userId: '679122313919d4c14686c1f4',
    //    enrollmentYear: 2022,
    //    program: 'BTech',
    //    department : 'Department of Computer Science',
    //})
    
    await enrollment.create({
        studentId: '679124d2d00b93f4b2f82ca7',
        enrollmentDate: new Date(),
        status: 'pendingInstructorApproval',
        offeringId: '67911ce69303630b4577d532',
    })

    //await course.create({
    //    courseCode: 'MA-20',
    //    courseName: 'Probability and Statistics',
    //    departmentName: 'Department of Mathematics',
    //    ltpsc: '3-4-4-4-3',
    //    status: 'approved',
    //})
    res.send("done")
})

app.listen(3000)