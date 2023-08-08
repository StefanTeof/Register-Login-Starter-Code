const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res)=>{
    res.status(200).send({
        success: true,
        user: {
            id: req.user._id,
            username: req.user.username,
        }
    })
});

module.exports = router;