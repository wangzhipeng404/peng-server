const Moment = require('../model/moment');

module.exports = {
  '/moment/add': async (ctx, next) => {
    const user = ctx.session.userInfo
    if (user) {
      const uid = user._id.str
      const moment = await new Moment({
        creator: {
          nickName: user.nickName,
          _id: uid,
          avatarUrl: user.avatarUrl,
        },
        content: ctx.query.content,
        images: ctx.query.images && ctx.query.images.split(','),
        group: ctx.query.group && JSON.parse(ctx.query.group)
      }).save()
      ctx.body = moment
    } else {
      ctx.status = 401
      ctx.body = {
        error: '未登录'
      }
    }
  },
  '/moment/find': async (ctx, next) => {
    let query = {}
    if (ctx.method === 'POST') {
      query = ctx.body
    } else {
      query = ctx.query
    }
    const {
      filters = {},
      sort = { _id: -1 },
      page = 1,
      limit = 10
    } = query;
    const list = await Moment
      .find(JSON.parse(filters))
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .exec()
    const total = await Moment.where(JSON.parse(filters)).count()
    ctx.body = {
      total,
      list,
    }
  },
  '/moment/all': async (ctx, next) => {
    const data = await Moment.where({ create_time: new Date() }).updateMany({
      create_time: new Date(2018, 6, 20),
      "group": {
        "_id": "5b4db61d987b7511965a8c42",
        "nickName": "世界频道"
      },
    })
    ctx.body = data
  },
  '/moment/get': async (ctx, next) => {
    if (ctx.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      const moment = await Moment.findById(ctx.query.id).exec()
      if (moment) {
        ctx.body = moment
      } else {
        ctx.status = 404
        ctx.body = {
          error: '动态不存在'
        }
      }
    } else {
      ctx.status = 404
      ctx.body = {
        error: 'id 不符合规则'
      }
    }
  },
}
