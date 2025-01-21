const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  
  coursecode: {
    type: String,
  },
  coursename: {
    type: String,
  },
  department: {
    type : String,
  },
  ltpsc: String,
  prerequisites: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ['created', 'offered', 'approved','notoffered'],
    required: true,
  },
});

const course = mongoose.model('course', courseSchema);
module.exports = course;
