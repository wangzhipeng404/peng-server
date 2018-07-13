const Group = require('../api/group');
const utils = require('../utils/utils')

const group = async socket => {
  const sessionData = await utils.getSessionData(socket)
  socket.on('create', data => {
    socket.emit('create success', sessionData)
  })
  socket.on('join', msg => {
    socket.join(msg, () => {
      socket.emit('join result', {
        state: 'success',
        roomName: msg,
      })
    })
  })
  socket.on('chat', msg => {
    console.log(msg)
    socket.broadcast.to(msg.roomName).emit('chat', msg.message)
  })
}


module.exports = group;
