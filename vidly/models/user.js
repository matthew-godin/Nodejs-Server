const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true,
        minlength: 5, maxlength: 50 },
    email: { type: String, required: true,
        minlength: 5, maxlength: 255,
        unique: true },
    password: { type: String, required: true,
        minlength: 5, maxlength: 1024 },
    isAdmin: Boolean
    // For more roles:
    // roles: []
    // or
    // operations: [] (allowed operations)
    // The latter approach is the best for
    // a more complex application
});
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id,
        isAdmin: this.isAdmin },
        config.get('jwtPrivateKey'));
}
const User = mongoose.model('User', userSchema);
function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required()
            .email(),
        password: Joi.string().min(5).max(255)
            .required()
    };
    return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;