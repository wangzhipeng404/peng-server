const User = require('../model/user');

const add = (info) => {
  return new Promise((reslove, reject) => {
    const user = new User({nickName: info.nickName, openid: info.openid, friends: [], groups: []})
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
          ...query,
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

const get = (query) => {
  return new Promise((reslove, reject) => {
    User
      .findOne(
        {
          ...query,
        }
      )
      .exec((err, res) => {
        if (err) {
          reslove(err)
        } else {
          reslove(res)
        }
      })
  })
}

const update = (id, query) => {
  return User.update({ _id: id }, { ...query },{
    upsert: true,
    safe: true
  })
}

module.exports = {
  add,
  find,
  get,
  update,
}
