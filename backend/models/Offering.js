const mongoose = require('mongoose');
const course = require('./Course');

const offeringSchema = new mongoose.Schema({
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty',
  },
  coursecode :{
    type : String,
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
  slot: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pendingAdminApproval', 'approved', 'rejected'],
  },
  maxSeats: {
    type: Number,
  },
  eligibleBatches :[
    {
      type : Number,
    }
  ]
});

const Offering = mongoose.model('Offering', offeringSchema);
module.exports = Offering;
