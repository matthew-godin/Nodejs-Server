const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json()); // to enable JSON parsing
                         // in Express
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
app.get('/', (req, res) => {
    res.send('Hello World!!!')
});
app.get('/api/courses', (req, res) => {
    //res.send([1, 2, 3]);
    res.send(courses);
});
app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    const course = courses.find(c => c.id ===
        parseInt(req.params.id));
    /*if (!course)  { // 404
        res.status(404).send('The course with the '
            + 'given ID was not found');
        return;
    }*/
    if (!course) return res.status(404).send('The course with the '
        + 'given ID was not found');
    res.send(course);
});
app.post('/api/courses', (req, res) => {
    /*if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request
        res.status(400).send('Name is required '
            + 'and should be minimum 3 characters');
        return;
    }*/
    // The joi package can make this simpler
    /*const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    //console.log(result);
    if (result.error) {
        res.status(400).send(
            result.error.details[0].message);
        return;
    }*/
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name // must enable JSON parsing
                            // in Express
    };
    courses.push(course);
    res.send(course);
});
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id ===
        parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the '
            + 'given ID was not found');
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(
            error.details[0].message);
    course.name = req.body.name;
    res.send(course);
});
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id ===
        parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the '
            + 'given ID was not found');
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
// You should never trust and always validate
// the input from the client
/*app.get('/api/courses/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
});*/
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}...`));
//app.post()
//app.put()
//app.delete()

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}