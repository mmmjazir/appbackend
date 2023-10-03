require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const shopRoutes =require('./routes/shops')
const medicineRoutes =  require('./routes/medicines')
const publicMedicinesRoutes = require('./routes/publicmedicines')
const publicShopsRoutes = require('./routes/publicshops')

const cors = require('cors');

// Express app
const app = express();

// middleware
app.use(cors({
    origin: 'http://localhost:3000',
  }));

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/shops', shopRoutes)
app.use('/api/user', userRoutes)
app.use('/api/medicines', medicineRoutes)
app.use('/api/publicmedicines', publicMedicinesRoutes)
app.use('/api/publicshops', publicShopsRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
// listen for requests
app.listen(process.env.PORT,()=>{
    console.log('Connected to db & listening on the port', process.env.PORT);
})

}).catch((error)=>{
    console.log(error);
})