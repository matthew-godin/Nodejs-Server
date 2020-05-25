// Approaches to Model Relationships
// Trade off between query performance vs consistency
// 1. Using References (Normalization)
// -> CONSISTENCY
/*
let author = {
  name: 'Mosh'
}
let course = {
  author: 'id'
}
*/
// 2. Using Embedded Documents (Denormalization)
// -> PERFORMANCE
/*
let course = {
  author: {
    name: 'Mosh'
  }
}
*/
// 3. Hybrid
/*
let author = {
  name: 'Mosh'
  // 50 other properties
}
let course = {
  author: {
    id: 'ref',
    name: 'Mosh'
  }
}
*/
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) { 
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    //.select('name');
    //.populate('author')
    //.populate('author', 'name')
    .populate('author', 'name -_id')
    .populate('category', 'name')
    .select('name author'); // not what we want
                            // without populate
  console.log(courses);
}

//createAuthor('Mosh', 'My bio', 'My Website');

//createCourse('Node Course', '5ec80866d712d926f486c67e')

listCourses();