const propertyService = require('./src/services/propertyRoute');
const userRoute = require('./src/services/userRoute');

var cors = require('cors');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(cors())

// const conection1 = mongoose.createConnection('mongodb://localhost:27017/property', { useNewUrlParser: true })
const conection = mongoose.createConnection('mongodb://localhost:27017/buzz', { useNewUrlParser: true })
    // conection1.model('users', require('../buzz-web/models/user.model'))
    // conection2.model('sampleProperty', require('../buzz-web/models/property.model'))


conection.on('error', (error) => console.error(error))
conection.once('open', () => console.log('Connected two Database'))

app.use(express.json());
app.use('/api/users', userRoute);

app.listen(2552, () => console.log('#### Two DBs Connected 2552 ####'))



//----->npm run start
//-----localhost:3003