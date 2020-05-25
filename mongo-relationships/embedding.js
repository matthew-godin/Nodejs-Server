const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  //author: authorSchema
  // for author to be required below
  /*author: {
    type: authorSchema,
    required: true
  }*/
  authors: [authorSchema]
}));

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function createCourse(name, /*author*/authors) {
  const course = new Course({
    name, 
    /*author*/authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  //const course = await Course.findById(courseId);
  const course = await Course.update({_id: courseId},
    {/*$set: {'author.name': 'John Smith'}*/
      /*$unset: {'author.name': ''}*/
      $unset: {'author': ''}});
  //course.author.name = 'Mosh Hamedani';
  //course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

//createCourse('Node Course', new Author({ name: 'Mosh' }));
//updateAuthor('5ec951d2f33ef913f2394e6a');
/*createCourse('Node Course', [
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' })
]);*/
/*addAuthor('5ec96a68c6765c18e233179e',
  new Author({ name: 'Amy'}));*/
removeAuthor('5ec96a68c6765c18e233179e',
  '5ec9b1a34ac1510ce29a00b1');