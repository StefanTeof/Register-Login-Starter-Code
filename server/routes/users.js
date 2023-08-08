const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../config/database');
const jwt = require('jsonwebtoken');

require('../config/passport');


router.post('/register', (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.send({
            success: true,
            message: "User Created Successfuly",
            user: {
                id: user._id,
                username: user.username
            }
        })
    }).catch(err => {
        res.send({
            success: false,
            message: "Something went wrong",
            error: err
        })
    })
})


router.post('/login', (req, res) => {
    UserModel.findOne({ username: req.body.username }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })

        return res.status(200).send({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
})



module.exports = router;