const User = require('../model/user');

const add = (info) => {
  return new Promise((reslove, reject) => {
    const user = new User({username: info.username, openid: info.openid, friends: [], groups: []})
    user.save((err, res) => {
      if (err) {
        reslove({status: 'fail', data: err})
      } else {
        reslove({status: 'success', data: res})
      }
    })
  })
}

const find = (query) => {
  return new Promise((reslove, reject) => {
    User
      .find(
        {
          username: query.username,
        }
      )
      .exec((err, res) => {
        if (err) {
          reslove({status: 'fail', data: err})
        } else {
          reslove({status: 'success', data: res})
        }
      })
  })
}

module.exports = {
  add,
  find
}
