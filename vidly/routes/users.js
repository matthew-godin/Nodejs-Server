const auth = require('../middleware/auth');
// Introduction to Authorization and Authentication
// Authentication:
// check if the user is who he claims he is
// Authorization:
// determine if the user has the right permissions
// for the operation he is trying to do
// Register a user: POST /api/users
// Login a user: POST /api/logins
// Lodash is an optimized version of underscore
// The joi-password-complexity package
// can be useful to manage password complexity
//const jwt = require('jsonwebtoken');
//const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.get('/me', auth, async(req, res) => {
    const user = await User.findById(req.user._id)
                           .select('-password');
    res.send(user);
});
// You should not store tokens in the database
// Or if you store it in the database, make sure
// you encrypt it
// You should store them in the client
// Make sure you use HTTPS when sending tokens
// between the client and the server
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    let user = 
        await User.findOne({ email: req.body.email });
    if (user) return res.status(400)
        .send('User already registered.');
    /*user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });*/
    user = new User(_.pick(req.body,
                           ['name', 'email',
                            'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,
                                      salt);
    await user.save();
    //req.send(user);
    //res.send(_.pick(user, ['_id', 'name', 'email']));
    //const token = jwt.sign({ _id: user._id },
    //    config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
                    .send(_.pick(user,
                    ['_id', 'name', 'email']));
});
// It's always better to type the code by hand
// than to copy-paste it (unless you look at
// it very carefully). - Mosh
// To dodge having bugs by forgetting to replace
// some code for the new location.
module.exports = router;