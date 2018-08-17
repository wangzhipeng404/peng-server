const Comment = require('../model/comment');
const Moment = require('../model/moment');

module.exports = {
  '/comment/add': async (ctx, next) => {
    const user = ctx.session.userInfo
    if (user) {
      const uid = user._id.str
      const comment = await new Comment({
        creator: {
          nickName: user.nickName,
          _id: uid,
          avatarUrl: user.avatarUrl,
        },
        content: JSON.parse(ctx.query.content),
        moment_id: ctx.query.moment_id,
      }).save()
      await Moment.findByIdAndUpdate(
        ctx.query.moment_id,
        { $inc: { comment: 1 } },
      )
      ctx.body = comment
    } else {
      ctx.status = 401
      ctx.body = {
        error: '未登录'
      }
    }
  },
  '/comment/find': async (ctx, next) => {
    let query = {}
    if (ctx.method === 'POST') {
      query = ctx.body
    } else {
      query = ctx.query
    }
    const {
      filters = {},
      sort = { _id: +1 },
      page = 1,
      limit = 10
    } = query;
    const list = await Comment
      .find(JSON.parse(filters))
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10))
      .exec()
    const total = await Comment.where(JSON.parse(filters)).count()
    ctx.body = {
      total,
      list,
    }
  },
  '/comment/get': async (ctx, next) => {
    if (ctx.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      const comment = await Comment.findById(ctx.query.id).exec()
      if (comment) {
        ctx.body = comment
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
