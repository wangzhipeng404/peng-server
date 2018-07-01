const roomChat = socket => {
  socket.on('message', msg => {
    console.log(msg)
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
    socket.broadcast.to(msg.roomName).emit('chat', msg.message)
  })
}


module.exports = roomChat;