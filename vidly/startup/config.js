const config = require('config');
module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey'
                      + ' is not defined.')
        // Throw an Error object to get the stack
        // trace. You can simply throw a string
        // but it will not give you the stack trace
        // which is considered less good practice
        // Use export vidly_jwtPrivateKey=<any-key>
        // to set the environment variable
    }
}