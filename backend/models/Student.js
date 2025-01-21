const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type : String,
  },
  enrollmentYear: {
    type: Number,
  },
  program: {
    type: String,
  },
  department :{
    type : String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  studentImage: {
    data: Buffer,
    contentType: String,  // Store image content type (e.g., 'image/jpeg')
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
