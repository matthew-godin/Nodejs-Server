//require('express-async-errors');
const winston = require('winston');
//require('winston-mongodb');
//const error = require('./middleware/error');
//const config = require('config');
//const Joi = require('joi');
//Joi.objectId = require('joi-objectid')(Joi);
//const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validation')();
/*process.on('uncaughtException', (ex) => {
    //console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message, ex);
    process.exit(1);
});*/// works only with synchronous code, in async
     // this code will not be executed
/*winston.handleExceptions(new winston.transports.File({
    filename: 'uncaughtExeptions.log'
}));
process.on('unhandledRejection', (ex) => {
    //console.log('WE GOT AN UNHANDLED REJECTION');
    /*winston.error(ex.message, ex);
    process.exit(1);*/
    /*throw ex;
});
winston.add(winston.transports.File,
    { filename: 'logfile.log' } );
winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'info' // means nothing beyond that
                   // will be logged in MongoDB
});*/
//throw new Error('Something failed during startup.');
/*const p = Promise.reject(
    new Error('Something failed miserably.'));*/
//p.then(() => console.log('Done'));
/*if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey'
                  + ' is not defined.');
    process.exit(1); // 1 in case of an error
    // Use export vidly_jwtPrivateKey=<any-key>
    // to set the environment variable
}*/
/*const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');*/
/*mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect'
                                + ' to MongoDB...',
                                err));*/
app.use(express.json()); // to enable JSON parsing
                         // in Express
/*app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(/*function(err, req, res, next) {
    // Log the exception also
    // (will be implemented later)
    res.status(500).send('Something failed.');*/
//}*/error);
const port = process.env.PORT || 3000;
app.listen(port, () =>
    //console.log(`Listening on port ${port}...`));
    console.info(`Listening on port ${port}...`));