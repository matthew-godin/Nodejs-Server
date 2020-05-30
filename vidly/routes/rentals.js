const {Rental,validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
router.get('/', async (req, res) => {
    const rentals = await Rental
        .find()
        .sort('-dateOut');
    res.send(rentals);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const customer = await Customer
                    .findById(req.body.customerId);
    if (!customer)
        return res.status(400)
            .send('Invalid customer.')
    const movie = await Movie
                    .findById(req.body.movieId);
    if (!movie)
        return res.status(400)
            .send('Invalid movie.');
    if (movie.numberInStock === 0)
        return res.status(400)
            .send('Movie not available.');
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    });
    try {
        const result = await rental.save();
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    movie.numberInStock--;
    movie.save(); // would normally need a transaction
    // which only exists in relational databases, i.e.
    // not MongoDB. There is a technique in MongoDB
    // called 2 phase commit which achieves this
    // but is beyond the scope of this course.
    // There is also an npm package that achieves this
    // which will be presented in the next lecture.
    res.send(rental);
});
module.exports = router;