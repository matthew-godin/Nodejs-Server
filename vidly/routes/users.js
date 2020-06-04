// Introduction to Authorization and Authentication
// Authentication:
// check if the user is who he claims he is
// Authorization:
// determine if the user has the right permissions
// for the operation he is trying to do
// Register a user: POST /api/users
// Login a user: POST /api/logins
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    let user = 
        await User.findOne({ email: req.body.email });
    if (user) return res.status(400)
        .send('User already registered.');
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    res.send(user);
});
// It's always better to type the code by hand
// than to copy-paste it (unless you look at
// it very carefully). - Mosh
// To dodge having bugs by forgetting to replace
// some code for the new location.
module.exports = router;