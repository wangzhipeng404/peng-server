const Moment = require('../model/moment');

const add = data => {
  return new Promise((reslove, reject) => {
    const moment = new Moment({ ...data })
    moment.save((err, res) => {
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
    Moment
      .find({

        ...query,
      })
      .sort({
        _id: -1,
      })
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
    Moment
      .findOne(
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

module.exports = {
  add,
  find,
  get,
}
