const User = require('../model/user');
const wechat = require('./wechat')

module.exports = {
  '/user/regiester': async (ctx, next) => {
    const { nickName, openid } = ctx.query
    const user = new User({ nickName, openid, friends: [], groups: []})
    const res = await user.save()
    ctx.body = res;
  },
  '/user/wxlogin': async (ctx, next) => {
    const data = await wechat.getOpenId(ctx.query.code)
    if (!data.errcode) {
      const { openid } = data
      let user = await User.findOne({ openid })
      if (!user) {
        user = new User({ nickName: '', openid, friends: [], groups: []}).save()
      }
      ctx.session.userInfo = user
      ctx.body = user
    } else {
      ctx.status = 400
      ctx.body = {
        error: data.errmsg
      }
    }
  },
  '/user/update': async (ctx, next) => {
    if (ctx.session.userInfo._id) {
      let user = await User.update(
        {   _id: ctx.session.userInfo._id },
        { ...ctx.query },
        { upsert: true, safe: true }
      ).exec()
      if (user.ok) {
        user = await User.findById(ctx.session.userInfo._id).exec()
        ctx.session.userInfo = user
        ctx.body = user
      } else {
        ctx.status = 400
        ctx.body = user
      }
    } else {
      ctx.status = 401
      ctx.body = {
        error: '未登录'
      }
    }
  },
  '/user/getSelf': async (ctx, next) => {
    const user = ctx.session.userInfo
    if (user) {
      ctx.body = user
    } else {
      ctx.status = 401
      ctx.body = {
        error: '未登录'
      }
    }
  },
  '/user/find': async (ctx, next) => {
    const filters = JSON.parse(ctx.query.filters)
    const list = await User.find(filters).exec()
    const total = await User.where(filters).count()
    ctx.body = {
      total,
      list,
    }
  },
}


