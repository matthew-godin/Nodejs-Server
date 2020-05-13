const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const express = require('express');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const app = express();
app.set('view engine', 'pug');
app.set('views', './views'); // default
//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);
app.use(express.json()); // to enable JSON parsing
                         // in Express
//app.use(express.urlencoded()); // key=value&key=value
// To not have depracated warning
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // all css, images
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
// Configuration
console.log('Application Name: '
                + config.get('name'));
console.log('Mail Server Name: '
                + config.get('mail.host'));
console.log('Mail Password: '
                + config.get('mail.password'));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgan enabled...');
    startupDebugger('Morgan enabled...');
}
// DB work...
dbDebugger('Connected to the database...');
// and so on goes in the public folder
/*app.use(function (req, res, next){
    console.log('Logging...');
    next();
});
app.use(function (req, res, next){
    console.log('Authenticating...');
    next();
});*/
// You should put each middleware function in a separate file
app.use(logger);
/*
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];*/
/*app.get('/', (req, res) => {
    //res.send('Hello World!!!')
    res.render('index', { title: 'My Express App',
                            message: 'Hello'});
});*/
// We put it in the home module
/*app.get('/api/courses', (req, res) => {
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
    /*if (!course) return res.status(404).send('The course with the '
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
    /*const { error } = validateCourse(req.body);
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
});*/
// You should never trust and always validate
// the input from the client
/*app.get('/api/courses/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
});*/
// You should put the courses API in a separate file
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Listening on port ${port}...`));
//app.post()
//app.put()
//app.delete()

/*function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}*/