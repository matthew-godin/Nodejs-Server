const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json()); // to enable JSON parsing
                         // in Express
const genres = [];
app.get('/api/genres', (req, res) => {
    res.send(genres);
});
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id ===
        parseInt(req.params.id));
    if (!genre) 
        return res.status(404).send(
        'The genre with the '
        + 'given ID was not found');
    res.send(genre);
});
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const genre = {
        id: genres.length + 1,
        name: req.body.name // must enable JSON parsing
                            // in Express
    };
    genres.push(genre);
    res.send(genre);
});
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id ===
        parseInt(req.params.id));
    if (!genre) return res.status(404).send(
            'The genre with the '
            + 'given ID was not found');
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    genre.name = req.body.name;
    res.send(genre);
});
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id ===
        parseInt(req.params.id));
    if (!genre) return res.status(404).send(
            'The genre with the '
            + 'given ID was not found');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}...`));

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);

}