const chat = require('./chat');
const group = require('./group');
const utils = require('../utils/utils')


const bindSocketEvent = function (io) {
  io.use( async (socket, next) => {
    const sessionData = await utils.getSessionData(socket)
    if (sessionData) {
      next()
    } else {
      socket.emit('error', new Error('session not fund'))
      socket.disconnect(true)
    }
  });
  io.of('/chat').on('connection', function(socket){
      chat(socket)
  });
  io.of('/group').on('connection', function(socket){
      group(socket, io);
  });

}
module.exports = bindSocketEvent;
