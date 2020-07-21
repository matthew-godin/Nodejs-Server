//const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
//const Joi = require('joi');
const express = require('express');
const router = express.Router();
//const genres = [];
/*const Genre = mongoose.model('Genre',
                             new mongoose.Schema({
    name: { type: String, required: true,
            minlength: 5, maxlength: 50 }
}));*/
/*function asyncMiddleware(handler) {
    return (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            next(ex);
        }
    };
}*/
router.get('/', /*asyncMiddleware(*/
    async (req, res) => {
    //res.send(genres);
    // winston will log this automatically
    // below was for some error logging testing
    //throw new Error('Could not get the genres.');
    const genres = await Genre
            .find()
            .sort('name');
        res.send(genres);
    /*try {
        const genres = await Genre
            .find()
            .sort('name');
        res.send(genres);
    } catch (ex) {
        // Log the exception also
        // (will be implemented later)
        //res.status(500).send('Something failed.');
        next(ex);
    }*/
})/*)*/;
router.get('/:id', validateObjectId, async (req, res) => {
    //const genre = genres.find(c => c.id ===
    //    parseInt(req.params.id));
    // Better to be refactored in middleware
    // module validateObjectId
    /*if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID.');*/
    const genre = await Genre
        .findById(req.params.id);
    if (!genre)
        return res.status(404).send(
        'The genre with the '
        + 'given ID was not found');
    res.send(genre);
});
// The express-async-errors module
// will wrap our routes within
// something like this at runtime
// for us
router.post('/', auth, //asyncMiddleware(
    async (req, res) => {
    const { error } = validate(req.body);
    //validateGenre(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const length = await Genre
        .find()
        .count();
    //const genre = {
    //    id: genres.length + 1,
    //    name: req.body.name // must enable JSON parsing
    //                        // in Express
    //};
    const genre = new Genre({
        name: req.body.name
    });
    //genres.push(genre);
    try {
        const result = await genre.save();
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    res.send(genre);
})/*)*/;
router.put('/:id', auth, async (req, res) => {
    //const genre = genres.find(c => c.id ===
    //    parseInt(req.params.id));
    var genre = await Genre
        .findById(req.params.id);
    if (!genre || genre.length === 0)
            return res.status(404).send(
            'The genre with the '
            + 'given ID was not found');
    const { error } = validate(req.body);
    //validateGenre(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    //genre.name = req.body.name;
    genre = await Genre.findByIdAndUpdate(
        req.params.id,
        { $set: { name: req.body.name}},
        {new: true});
    res.send(genre);
});
router.delete('/:id', [auth, admin], async (req, res) => {
    //const genre = genres.find(c => c.id ===
    //    parseInt(req.params.id));
    const genre = await Genre
        .findById(req.params.id);
    if (!genre || genre.length === 0)
            return res.status(404).send(
            'The genre with the '
            + 'given ID was not found');
    //const index = genres.indexOf(genre);
    //genres.splice(index, 1);
    const result = await Genre
        .findByIdAndRemove(req.params.id);
    res.send(genre);
});
/*function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}*/
module.exports = router;