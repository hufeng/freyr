var EventEmitter = require('events').EventEmitter;

//react
var emitter = module.exports = new EventEmitter();
//infinit max listeners
emitter.setMaxListeners(0);
