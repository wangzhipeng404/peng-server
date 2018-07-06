const Group = require('../model/group');

const add = data => {
  return new Promise((resovel, reject) => {
    const group = new Group({name: data.name, friends: [data.user_id]})
    group.save((err, res) => {
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
    Group
      .find(query)
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
    Group
      .findOne(
        {
          _id: query.id,
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
  find,
  get,
}
