const {genreSchema} = require('./genre');
const mongoose = require('mongoose');
const Joi = require('joi');
const Movie = mongoose.model('Movie',
                             new mongoose.Schema({
    title: { type: String, required: true,
            minlength: 5, maxlength: 50 },
    genre: { type: genreSchema, required: true},
    numberInStock: { type: Number, min: 0, max: 255,
                     required: true },
    dailyRentalRate: { type: Number, min: 0, max: 255,
                        required: true }
}));
function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(3).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number()
                        .min(0).required(),
        dailyRentalRate: Joi.number().min(0)
                            .required()
    }
    return Joi.validate(movie, schema);
}
exports.Movie = Movie;
exports.validate = validateMovie;