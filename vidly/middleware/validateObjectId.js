// With automated tests we can refactor
// our code with confidence
const mongoose = require('mongoose');

module.exports = function (req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send('Invalid ID.');

    next();
}