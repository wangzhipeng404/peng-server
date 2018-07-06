const chat = require('./chat');
const group = require('./group');
const utils = require('../utils/utils')


const bindSocketEvent = function (io) {
  io.use( async (socket, next) => {
    const sessionData = await utils.getSessionData(socket)
    if (sessionData) {
      next()
    } else {
      next(new Error('session not fund'))
    }
  });
  io.of('/chat').on('connection', function(socket){
      chat(socket)
  });
  io.of('/group').on('connection', function(socket){
      group(socket);
  });

}
module.exports = bindSocketEvent;
