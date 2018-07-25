const Group = require('../model/group');

module.exports = {
  '/group/add': async (ctx, next) => {
    const user = ctx.session.userInfo
    if (user) {
      const uid = user._id.toString()
      const group = await new Group({
        nickName: ctx.query.nickName,
        intro: ctx.query.intro,
        avatarUrl: ctx.query.avatarUrl,
        creator: uid,
        members: [uid],
      }).save()
      ctx.body = group
    } else {
      ctx.status = 401
      ctx.body = {
        error: '未登录'
      }
    }
  },
  '/group/find': async (ctx, next) => {
    let query = { ...ctx.query };
    if (query.__code__) {
      delete query.__code__
    }
    const user = ctx.session.userInfo
    query.members = user._id.toString()
    const list = await Group.find(query).sort({ _id: -1 }).exec()
    const total = await Group.count(query).count()
    ctx.body = {
      total,
      list,
    }
  },
  '/group/get': async (ctx, next) => {
    if (ctx.query.id.match(/^[0-9a-fA-F]{24}$/)) {
      const group = await Group.findOne({ _id: ctx.query.id }).exec()
      if (group) {
        ctx.body = group
      } else {
        ctx.status = 404
        ctx.body = {
          error: '圈子不存在'
        }
      }
    } else {
      ctx.status = 404
      ctx.body = {
        error: 'id 不符合规则'
      }
    }
  },
  '/group/join': async (ctx, next) => {
    const { id } = ctx.query
    const user = ctx.session.userInfo
    console.log(user._id.toString())
    if (!user) {
      ctx.status = 401
      ctx.body = '未登录'
    } else {
      const uid = user._id.toString()
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        let group = Group.findById(id)
        if (group.members.indexOf(uid) == -1) {
          group = await Group.findByIdAndUpdate(
            id,
            { '$addToSet': { members: uid } },
          )
          if (group.ok) {
            group = Group.findById(id)
          }
        }
        ctx.body = group
      }
    }
  }
}

