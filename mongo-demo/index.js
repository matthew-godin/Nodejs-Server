const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect'
                                + ' to MongoDB...',
                                err));
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
// Mongoose Schema Types:
// 1. String
// 2. Number
// 3. Date
// 4. Buffer
// 5. Boolean
// 6. ObjectID
// 7. Array
const Course = mongoose.model('Course', courseSchema);
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['node', 'frontend'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    //const courses = await Course.find();
    // above returns all courses
    const pageNumber = 2;
    const pageSize = 10;
    // e.g. how it could be in the real world below
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
        //.find({ price: 10 }) // this is only 10
        //.find({ price: { $gt: 10, $lte: 20 } })
        //.find({ price: { $in: [10, 15, 20] } })
        //.find()
        //.or([ {author: 'Mosh' },
              //{ isPublished: true } ])
        //.and([// same principle as or...])
        // Starts with Mosh
        //.find({ author: /^Mosh/ }) // this is a
                                   // regular
                                   // expression
        //.find({ author: /Hamedani$/i })
        //.find({ author: /.*Mosh.*/i })
        .skip((pageNumber - 1) * pageSize) // to do
                                           // pagination
        .limit(/*10*/pageSize) // with this, we can
                               // get the document
                               // at a given page
        .sort({ name: 1 }) // 1 indicates ascending
                           // order
        //.count();
        .select({ name: 1, tags: 1 });
    // MongoDB and Mongoose have comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    // MongoDB and Mongoose have logical operators
    // or
    // and
    // Regular Expressions
    // are within / and /
    // ^ indicates the string must start with
    // the following string
    // $ indicates the string must end with the
    // string before
    // i after the ending / makes it case insensitive
    // Within .* and .* indicates the string contains
    // the string inside .* and .*
    // You can also use more complex regular
    // expressions. These are basically Javascript
    // regular expressions
    console.log(courses);
}

//createCourse();
getCourses();