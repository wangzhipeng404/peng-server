const Group = require('../api/group');
const utils = require('../utils/utils')
import request from 'request';

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
      socket.broadcast.to(rid).emit('room notify' + rid, sessionData.userInfo.nickName + '加入了房间')
    }
  })
  socket.on('chat', msg => {
    if (/^@tulin\s{1}/g.test(msg.value)) {
      request({
          url: 'http://openapi.tuling123.com/openapi/api/v2',
          method: "POST",
          json: true,
          headers: {
              "content-type": "application/json",
          },
          body: {
            "reqType":0,
            "perception": {
                "inputText": {
                    "text": msg.value.replace(/^@tulin\s{1}/, ''),
                },
            },
            "userInfo": {
                "apiKey": "f506a899e543447da4c1a765f4adee8e",
                "userId": "777229674890924032",
            }
          }
      }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            body.results.forEach(val => {
              socket.emit('chat' + msg.roomName, {
                type: 'text',
                value: val.values.text
              })
            });
          }
      });
    } else {
      socket.emit(
        'chat' + msg.roomName,
        {
          type: msg.type,
          value: msg.value
        }
      )
      socket.broadcast.to(msg.roomName).emit(
        'chat' + msg.roomName,
        {
          type: msg.type,
          value: msg.value
        }
      )
    }
  })
}


module.exports = group;
