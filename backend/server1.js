const express = require('express')
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/AIMS-portal');
const course = require('./models/Course')
const department = require('./models/Department')
const enrollment = require('./models/Enrollment')
const faculty = require('./models/Faculty')
const offering = require('./models/Offering')
const session = require('./models/Session')
const student = require('./models/Student')

const app = express();
app.use(express.json());



app.get('/hit', async (req,res)=>{
    
    await course.create({
        coursecode: 'CS-402',
        coursename: 'Image Processing',
        department: 'Department of Computer Science',
        ltpsc: '3-4-5-6-2',
        status: 'offered',
    })
    res.send("done")
})

app.listen(3000)
