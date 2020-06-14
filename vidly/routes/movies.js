const auth = require('../middleware/auth');
const {Genre} = require('../models/genre');
const {Movie, validate} = require('../models/movie');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    const movies = await Movie
        .find()
        .sort('title');
    res.send(movies);
});
router.get('/:id', async (req, res) => {
    const movie = await Movie
        .findById(req.params.id)
    if (!movie)
        return res.status(404).send(
        'The movie with the '
        + 'given ID was not found');
    res.send(movie);
});
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const genre = await Genre
                            .findById(req.body.genreId);
    if (!genre) return res.status(400)
                            .send('Invalid genre.');
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    try {
        const result = await movie.save();
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    res.send(movie);
});
router.put('/:id', auth, async (req, res) => {
    var movie = await Movie
        .findById(req.params.id);
    if (!movie || movie.length === 0)
            return res.status(404).send(
            'The movie with the '
            + 'given ID was not found');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
            const genre = await Genre
            .findById(req.body.genreId);
    if (!genre) return res.status(400)
            .send('Invalid genre.');
    movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: { title: req.body.title,
                  genre: {
                    _id: genre._id,
                    name: genre.name
                  },
                  numberInStock:
                    req.body.numberInStock,
                  dailyRentalRate: 
                    req.body.dailyRentalRate,
                } },
        {new: true});
    res.send(movie);
});
router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie
        .findById(req.params.id);
    if (!movie || movie.length === 0)
            return res.status(404).send(
            'The movie with the '
            + 'given ID was not found');
    const result = await Movie
        .findByIdAndRemove(req.params.id);
    res.send(movie);
});
module.exports = router;