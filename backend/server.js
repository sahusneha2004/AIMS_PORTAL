const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/AIMS-portal');
const facultyRoutes = require('./routes/faculty');

const app = express();
app.use(cors());
app.use(express.json());


app.use('/faculty', facultyRoutes);
app.listen(5000)

