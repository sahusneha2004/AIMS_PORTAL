const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

mongoose.connect("mongodb://127.0.0.1:27017/AIMS-Portal")
const enrollment = require('./models/Enrollment')
const Offering = require('./models/Offering')
const course = require('./models/Course')
const session = require('./models/Session')
const department = require('./models/Department')
const user = require('./models/User')
const student = require('./models/Student')
const faculty = require('./models/Faculty')


const app = express();
app.use(cors());
app.use(express.json());



//async function sendMailToUser(userId) {
//  
//    const transporter = nodemailer.createTransport({
///      host: "smtp.gmail.com",
//      service: "gmail",
//      auth: {
//        user: "prathisthapandey10@gmail.com", // Ensure the email is correctly formatted
//        pass: "nbyc tymg hqnr eaxs", // Use your actual app-specific password here
//      },
//      debug: true,
//      port: 587, // Use 587 for TLS
//      secure: false, // Set to false for TLS
//    });

//    transporter.verify((error, success) => {
//      if (error) {
//        console.error("SMTP Error:", error); // Log detailed SMTP error
//      } else {
//        console.log("SMTP Connection successful:", success);
//      }
//    });

//    const mailOptions = {
//      from: "prathisthapandey10@gmail.com", // Your email
//      to: 'prathisthapandey10@gmail.com',
//      subject: "Your OTP for Login",
//      text: 'hii pandey',
//    };

//     await transporter.sendMail(mailOptions); // Sending the email

//}
  // Example: Call the function with a user ID
//sendMailToUser('67912245f38f9fa1f73a1388');

app.get('/hit' , async (req,res)=>{

    //await user.create({
    //  name : 'Apurva Mudgal',
    //  email : 'am11@gmail.com',
    //  password : '123',
    //  role: 'faculty'
    //})

    //await faculty.create({
    //  userId : '6797b7606736420356496e96',
    //  department : 'Department of Computer Science',
    //  designation : 'Professor',
    //  joiningYear : 2015,
    //})

    const d = await department.findOne({ departmentName : 'Department of Computer Science'});
    d.facultyAdvisor = '6797b86bacaa9bfe03ba6483'
    await d.save();

    res.send("done")
})

app.listen(3000)