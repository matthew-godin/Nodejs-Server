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

async function updateCourse(id) {
    // First Approach: Query first
    // findById()
    // Modify its properties
    // save()
    //const course = await Course.findById(id);
    //if (!course) return;
    //course.isPublished = true;
    //course.author = 'Another Author';
    /*course.set({
        isPublished: true,
        author: 'Another Author'
    });*/ // Another approach to modify the properties
    //const result = await course.save();
    //console.log(result);
    // Second Approach: Update first
    // Update directly
    // Optionally: get the updated document
    // First approach is needed if you need to
    // check something before proceeding
    const result = await Course.update( { _id: id }, 
        { $set: { author: 'Mosh',
            isPublished: false}}); // in the second update parameter,
           // we need to use one or more of the
           // mongodb update operators
           // There's also findByIdAndUpdate
           // to do both. We get the original document
           // with that (before the update operation)
           // pass the following third argument to get
           // the updated document: { new: true }
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
                                   // does on the
                                   // first one
    // deleteMany to delete all satisfying documents
    // findByIdAndRemove to return the document
}

//createCourse();
//getCourses();
/*updateCourse*/
removeCourse('5ebd6d17ec54ed1811051d8e');