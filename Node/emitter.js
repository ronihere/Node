const logger = require('./modules/logger');
const { EventEmitter } = require('events');

class MyEventEmitter extends EventEmitter {
    emit(event, ...args) {
        console.log('Event : ', event);
        console.log('Args :', args);
        logger(args[0]);
        super.emit(event, args[0]);
    }
}

const listener = new MyEventEmitter();

listener.on('log', (name) => console.log('listening to the event log:::', name));
listener.on('blog', (name) => console.log('listening to the event blog:::', name));


listener.emit('log', 'How are you doing?');
listener.emit('blog', 'How are you doing blog?');


