// We put it in the middleware folder rather than the
// root one for better structuring
function log(req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = log;