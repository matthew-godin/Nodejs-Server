/*const logger = require('./logger');
console.log(logger);
//logger.log('message');
logger('message');
const path = require('path');
var pathObj = path.parse(__filename);
console.log(pathObj);
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();*/
//console.log('Total Memory: ' + totalMemory);
/*console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
const fs = require('fs');
const files = fs.readdirSync('./');
console.log(files);
fs.readdir('./', function(err, files) {
  if (err) console.log('Error', err);
  else console.log('Results', files);
});
fs.readdir('$', function(err, files) {
  if (err) console.log('Error', err);
  else console.log('Results', files);
});*/
//const EventEmitter = require('events');
//const emitter = new EventEmitter();
/*emitter.on('messageLogged', function(arg) {
  console.log('Listener called', arg);
});*/
/*emitter.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});*/
//emitter.emit('messageLogged', 1, 'url');
//emitter.emit('messageLogged', { id: 1, url: 'http://' });
//const log = require('./logger');
//log('message');
/*const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});
logger.log('message');*/
const http = require('http');
//const server = http.createServer();
/*server.on('connection', (socket) => {
  console.log('New connection...');
});*/
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello World');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1,2,3]));
    res.end();
  }
});
server.listen(3000);
console.log('Listening on port 3000...');
// REST Operations
// GET, PUT, DELETE, POST