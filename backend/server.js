const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const facultyRoutes = require('./routes/faculty');
const adminRoutes = require('./routes/admin.js')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/faculty', facultyRoutes);
app.use('/admin',adminRoutes)
app.listen(5000)


const uri = "mongodb+srv://prathisthapandey10:123456prathistha@cluster0.nxb2y.mongodb.net/AIMS-Portal?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log("Connected to MongoDB Atlas"))
   .catch((error) => console.error("MongoDB connection error:", error));

