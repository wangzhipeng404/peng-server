const Group = require('../api/group');
const utils = require('../utils/utils')
import request from 'request';

const group = async (socket, io) => {
  const sessionData = await utils.getSessionData(socket)
  const from = {
    nickName: sessionData.userInfo.nickName,
    _id: sessionData.userInfo._id,
    avatarUrl: sessionData.userInfo.avatarUrl
  }
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
        socket.emit('chat' + rid, {
          type: 'text',
          value: '欢迎进入聊天室 @groop 可以与AI机器人对话哦',
          from: {
            nickName: 'groop',
            _id: 'groop',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEK1HibIVVSzUxz83PiauZKcRVv0mJMmBcnQxbbjaXp76d0KNuPMrhwFUhsIf2A0FYcacj14dd9840Tg/132'
          }
        })
        socket.broadcast.to(rid).emit('room notify' + rid, sessionData.userInfo.nickName + '加入了房间')
      })
    } else {
      var roster = io.nsps['/group'].adapter.rooms[rid]
      socket.emit('room notify' + rid, `你已经成功进入聊天室，当前在线人数${roster.length}`)
      socket.broadcast.to(rid).emit(
        'room notify' + rid,
        `${sessionData.userInfo.nickName}加入了房间，当前在线人数${roster.length}`
      )
    }
  })
  socket.on('leave', rid => {
    socket.leave(rid, () => {
      socket.broadcast.to(rid).emit(
        'room notify' + rid,
        `${sessionData.userInfo.nickName}离开了房间`
      )
    })
  })
  socket.on('chat', msg => {
    if (/^@groop\s{1}/g.test(msg.value)) {
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
                    "text": msg.value.replace(/^@groop\s{1}/, ''),
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
                value: val.values.text,
                from: {
                  nickName: 'groop',
                  _id: 'groop',
                  avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEK1HibIVVSzUxz83PiauZKcRVv0mJMmBcnQxbbjaXp76d0KNuPMrhwFUhsIf2A0FYcacj14dd9840Tg/132'
                }
              })
            });
          }
      });
    } else {
      socket.broadcast.to(msg.roomName).emit(
        'chat' + msg.roomName,
        {
          type: msg.type,
          value: msg.value,
          from,
        }
      )
    }
  })
}


module.exports = group;
