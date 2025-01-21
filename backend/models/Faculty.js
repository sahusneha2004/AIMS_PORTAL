const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({

  name: {
    type: String,
  },
  // redundancy in fetching the id first to get just the name
  department: {
    type : String,
  },
  designation: {
    type: String,
  },
  joiningYear: {
    type: Number,
  },
  retiringYear: {
    type: Number,
  },
});

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;
