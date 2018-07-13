var room = io('/group');
room.on('connect', function () {
  room.send('12123')
  room.emit('join', '123456')
})
room.on('create success', msg => {
  console.log(msg)
})
room.on('join result', msg => {
  console.log(msg)
  room.emit('chat', {
    roomName: msg.roomName,
    message: room.id,
  })
})
room.on('chat', msg => {
  console.log(msg)
  room.emit('chat', {
    roomName: '123456',
    message: msg,
  })
})
