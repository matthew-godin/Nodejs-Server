const auth = require('../middleware/auth');
const {Rental,validate} = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
Fawn.init(mongoose);
router.get('/', async (req, res) => {
    const rentals = await Rental
        .find()
        .sort('-dateOut');
    res.send(rentals);
});
router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    // To verify the ID passed
    // This logic belongs in the
    // validate function though
    /*if (!mongoose.Types.ObjectId
        .isValid(req.body.customerId))
        return res.status(400)
            .send('Invalid customer.');*/
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
    /*try {
        const result = await rental.save();
    } catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);
        }
    }
    movie.numberInStock--;
    movie.save();*/ // would normally need a transaction
    // which only exists in relational databases, i.e.
    // not MongoDB. There is a technique in MongoDB
    // called 2 phase commit which achieves this
    // but is beyond the scope of this course.
    // There is also an npm package that achieves this
    // which will be presented in the next lecture.
    // We use the npm package called fawn. This
    // package actually usses the 2 phase commit
    // technique internally.
    try {
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: movie._id}, {
            $inc: { numberInStock: -1 }
        })
        .run();
        res.send(rental);
    } catch (ex) {
        res.status(500).send('Something failed.');
        // 500 means internal server error
        // normally we would log this
        // this will be seen in a later section
        // of this course.
    }
});
module.exports = router;