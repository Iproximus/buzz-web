const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
    smallpicture: {
        type: String,
    },
    streetnumber: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zip: {
        type: String,
    },
    lastname: {
        type: String,
    },
    firstname: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    yearbuilt: {
        type: String,
    },
    area: {
        type: String,
    },
    lotarea: {
        type: String,
    },
    bedrooms: {
        type: String,
    },
    bathrooms: {
        type: String,
    },
    storey: {
        type: String,
    },
    ownedorrented: {
        type: String,
    },
    type: {
        type: String,
    },
    schooldistrict: {
        type: String,
    },
    elementaryschool: {
        type: String,
    },
    middleschool: {
        type: String,
    },
    highschool: {
        type: String,
    }
})

module.exports = mongoose.model('sampleProperty', PropertySchema)