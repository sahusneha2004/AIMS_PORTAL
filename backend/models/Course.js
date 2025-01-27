const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  
  courseCode: {
    type: String,
    required : true,
  },
  courseName: {
    type: String,
    required : true,
  },
  departmentName: {
    type : String,
    required : true,
  },
  ltpsc: {
    type : String,
    required : true,
  },
  prerequisites: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ['approved','notapproved'],
    required: true,
  },
  facultyId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  }
});

const course = mongoose.model('course', courseSchema);
module.exports = course;
