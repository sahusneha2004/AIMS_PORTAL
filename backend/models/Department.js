const mongoose = require('mongoose');


const departmentSchema = new mongoose.Schema({
    departmentName: {
        type: String,
    }
});


const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
