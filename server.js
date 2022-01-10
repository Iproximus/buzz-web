const propertyService = require('./src/services/propertyRoute');
var cors = require('cors');
    // Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(cors()) // Use this after the variable declaration

mongoose.connect('mongodb://localhost:27017/property', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use('/api/property',propertyService);
//const users = require('./routes/registerRoute')

app.listen(2552, () => console.log('Server Started at 2552'))