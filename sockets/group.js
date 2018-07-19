const Group = require('../api/group');
const utils = require('../utils/utils')

const group = async (socket, io) => {
  const sessionData = await utils.getSessionData(socket)
  socket.on('create', data => {
    socket.emit('create success', sessionData)
  })
  socket.on('join', rid => {
    if (!socket.rooms[rid]) {
      socket.join(rid, () => {
        socket.emit('join result', {
          state: 'success',
          roomName: rid,
        })
        var roster = io.nsps['/group'].adapter.rooms[rid]
        socket.emit('room notify' + rid, `你已经成功进入聊天室，当前在线人数${roster.length}`)
        socket.broadcast.to(rid).emit('room notify' + rid, sessionData.userInfo.nickName + '加入了房间')
      })
    } else {
      var roster = io.nsps['/group'].adapter.rooms[rid]
      socket.emit('room notify' + rid, `你已经成功进入聊天室，当前在线人数${roster.length}`)
      socket.broadcast.to(msg).emit('room notify' + rid, sessionData.userInfo.nickName + '加入了房间')
    }
  })
  socket.on('chat', msg => {
    socket.broadcast.to(msg.roomName).emit('chat' + msg.roomName, msg.message)
  })
}


module.exports = group;
