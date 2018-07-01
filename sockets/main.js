const chat = require('./chat');
const roomChat = require('./rooms');

const bindSocketEvent = function (io) {
    io.of('/chat').on('connection', function(socket){
        chat(socket)
    });
    io.of('/room').on('connection', function(socket){
        roomChat(socket);
    });
    
}
module.exports = bindSocketEvent;