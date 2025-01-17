const mongoose = require('mongoose');

// Define the Fee Details schema
const feedetailSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true
    },
    fee: {
        type: Number,
        required: true
    }
});


const feeDetail = mongoose.model('feeDetail', feedetailSchema);

module.exports = feeDetail
