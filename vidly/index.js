const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
app.use(express.json()); // to enable JSON parsing
                         // in Express
app.use('/api/genres', genres);
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);

}