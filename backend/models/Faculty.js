const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  facultyId: {
    type: String,
    required: true,
    unique: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joiningYear: {
    type: Number,
    required: true,
  },
  retiringYear: {
    type: Number,
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;
