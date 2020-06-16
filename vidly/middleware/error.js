const winston = require('winston');
module.exports = function(err, req, res, next) {
    //winston.log('error', err.message);
    // same as above
    winston.error(err.message, err);
    // error, warn, info, verbose, debug, silly
    // Log the exception also
    // (will be implemented later)
    res.status(500).send('Something failed.');
    // This function will ignore anything that
    // goes wrong outside the context of Express
}