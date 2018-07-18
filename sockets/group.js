const Group = require('../api/group');
const utils = require('../utils/utils')

const group = async (socket, io) => {
  const sessionData = await utils.getSessionData(socket)
  socket.on('create', data => {
    socket.emit('create success', sessionData)
  })
  socket.on('join', msg => {
    if (!socket.rooms[msg]) {
      socket.join(msg, () => {
        socket.emit('join result', {
          state: 'success',
          roomName: msg,
        })
        var roster = io.nsps['/group'].adapter.rooms[msg]
        socket.emit('room notify', `你已经成功进入聊天室，当前在线人数${roster.length}`)
        socket.broadcast.to(msg).emit('room notify', sessionData.userInfo.nickName + '加入了房间')
      })
    } else {
      socket.emit('room notify', `你已经成功进入聊天室，当前在线人数9999`)
      socket.broadcast.to(msg).emit('room notify', sessionData.userInfo.nickName + '加入了房间')
    }
  })
  socket.on('chat', msg => {
    socket.broadcast.to(msg.roomName).emit('chat', msg.message)
  })
}


module.exports = group;
