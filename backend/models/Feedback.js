const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    offeringId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offering',
        required: true
    },
    feedback: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
