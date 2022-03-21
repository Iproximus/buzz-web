const express = require('express')
const router = express.Router()
const User = require('../../models/user.model')

router.get('/', (req, res) => {
    res.json({ msg: "hello world" });
})
router.get('/listAll', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
})

router.get('/listOne/:_id', getUser, (req, res) => {
    res.send(res.user)
})

router.post('/addUser', async(req, res) => {
    const users = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailid: req.body.emailid,
        role: req.body.role,
        phnumber: req.body.phnumber
    })
    try {
        const newUser = await users.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/updateUser/:_id', getUser, async(req, res) => {
    if (req.body.firstname != null) {
        res.user.firstname = req.body.firstname
    }
    if (req.body.lastname != null) {
        res.user.lastname = req.body.lastname
    }
    if (req.body.emailid != null) {
        res.user.emailid = req.body.emailid
    }
    if (req.body.role != null) {
        res.user.role = req.body.role
    }
    if (req.body.phnumber != null) {
        res.user.phnumber = req.body.phnumber
    }
    try {
        const updateUser = await res.user.save()
        res.json(updateUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/deleteUser/:_id', getUser, async(req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User removed successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params._id);
        if (user == null) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()
}

module.exports = router;