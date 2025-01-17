const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pendingAdminApproval', 'approved', 'rejected'],
    required: true,
  },
  maxSeats: {
    type: Number,
    required: true,
  },
});

const Offering = mongoose.model('Offering', offeringSchema);
module.exports = Offering;
