const {Movie} = require('./movie');
const {Customer} = require('./customer');
const mongoose = require('mongoose');
const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
// We actually prefer to have the above in index.js
// to not have to repeat ourselves in different files
const Rental = mongoose.model('Rental',
                             new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
}));
function validateRental(rental) {
    // To validate IDs, we use the joi-objectid
    // npm package
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
        //customerId: Joi.string().required(),
        //movieId: Joi.string().required()
    }
    return Joi.validate(rental, schema);
}
exports.Rental = Rental;
exports.validate = validateRental;