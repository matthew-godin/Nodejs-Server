const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit('messageLogged', { id: 1, url: 'http://' });
    }
}

/*function log(message) {
    console.log(message);
    emitter.emit('messageLogged', { id: 1, url: 'http://' });
}*/

//module.exports.log = log;
//module.exports = log;
module.exports = Logger;
//console.log(__filename);
//console.log(__dirname);