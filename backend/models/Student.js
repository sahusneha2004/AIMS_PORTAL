const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  enrollmentYear: {
    type: Number,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  studentImage: {
    data: Buffer,
    contentType: String,  // Store image content type (e.g., 'image/jpeg')
  },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
