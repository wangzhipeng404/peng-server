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
    const list = await Moment.find(ctx.query).sort({ _id: -1 }).exec()
    const total = await Moment.where(ctx.query).countDocuments()
    ctx.body = {
      total,
      list,
    }
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
