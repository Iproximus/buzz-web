const PropertySchema = require('../../models/property.model');
const express = require('express');
const router = express.Router();


router.post('/addProperty', async(req, res) => {
    const properties = new PropertySchema({
        smallpicture: req.body.smallPicture,
        streetnumber: req.body.streetnumber,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        lastname: req.body.lastName,
        firstname: req.body.firstName,
        phone: req.body.phone,
        email: req.body.email,
        yearbuilt: req.body.yearBuilt,
        area: req.body.area,
        lotarea: req.body.lotArea,
        bedrooms: req.body.bedRooms,
        bathrooms: req.body.bathRooms,
        storey: req.body.storey,
        ownedorrented: req.body.ownedOrRented,
        type: req.body.typeId,
        schooldistrict: req.body.schoolDistrict,
        elementaryschool: req.body.elementarySchool,
        middleschool: req.body.middleSchool,
        highschool: req.body.highSchool
    })
    try {
        const newUser = await properties.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});



module.exports = router;