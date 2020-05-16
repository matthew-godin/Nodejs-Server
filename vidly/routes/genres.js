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
router.get('/', async (req, res) => {
    //res.send(genres);
    const genres = await Genre
        .find()
        .sort('name');
    res.send(genres);
});
router.get('/:id', async (req, res) => {
    //const genre = genres.find(c => c.id ===
    //    parseInt(req.params.id));
    const genre = await Genre
        .findById(req.params.id)
    if (!genre)
        return res.status(404).send(
        'The genre with the '
        + 'given ID was not found');
    res.send(genre);
});
router.post('/', async (req, res) => {
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
});
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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