//const config = require('config');
//const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    let user = 
        await User.findOne({ email: req.body.email });
    if (!user) return res.status(400)
        .send('Invalid email or password.');
    const validatePassword 
        = await bcrypt.compare(req.body.password,
                               user.password);
    if (!validatePassword) return res.status(400)
        .send('Invalid email or password.');
    const token = user.generateAuthToken();
    //res.send(true);
    // A JSON Web Token is basically
    // a long string that identifies
    // a user
    // The key should normally be in an
    // environment variable and never be
    // in the source code
    //const token = jwt.sign({ _id: user._id },
    //             config.get('jwtPrivateKey'));
    res.send(token);
});

// Information Expert Principle
// A chef cooks, not a waitress

function validate(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required()
            .email(),
        password: Joi.string().min(5).max(255)
            .required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;