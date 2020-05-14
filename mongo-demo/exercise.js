const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect'
                                + ' to MongoDB...',
                                err));
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);


// Exercise 1
/*async function getCourses() {
    return await Course
        .find( { isPublished: true, tags: 'backend' } )
        .sort({ name: 1 })// or .sort('name')
                          // .sort('-name') for
                          // descending
        .select({ name: 1, author: 1 }) // or
                                        // .select(
                                        // 'name author'
                                        // )
}
// Simply for better breakdown of responsibilities
async function run() {
    const courses = await getCourses();
    console.log(courses);
}*/
// Exercise 2
/*async function getCourses() {
    return await Course
        .find( { isPublished: true,
                 tags: { $in: ['frontend',
                               'backend'] } } )
        .sort({ price: -1 })
        .select({ name: 1, author: 1 })
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}*/
// Exercise 3
async function getCourses() {
    return await Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 } },
        { name: /.*by.*/i }]) // . represents
                             // a character
                             // * represents 0 or more
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();