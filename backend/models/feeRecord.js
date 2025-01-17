const mongoose = require('mongoose');

// Define the Fees Record schema
const feeRecordSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    image: {
        type: Buffer,
        required: false
    },
    transactionId: {
        type: String,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const feeRecord = mongoose.model('feeRecord', feeRecordSchema);

module.exports = feeRecord;
