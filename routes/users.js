const router = require('koa-router')()
const user = require('../api/user')
const wechat = require('../api/wechat')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/register', async function (ctx, next) {
  const result = await user.add({
    nickName: ctx.query.nickName,
    openid: ctx.query.openid,
  })
  ctx.body = result;
})

router.get('/find', async function (ctx, next) {
  const result = await user.find(ctx.query)
  ctx.body = result;
})

router.get('/login', async function (ctx, next) {
    const result = await user.get(ctx.query)
    if (result) {
      ctx.session.userInfo = result
      ctx.status = 200
      ctx.body = result;
    } else {
      ctx.status = 404
      ctx.body = result;
    }
})

router.get('/getself', async function (ctx, next) {
  ctx.body = ctx.session.userInfo;
})

router.get('/update', async function (ctx, next) {
  const id = ctx.session.userInfo._id
  if (id) {
    const result = await user.update(id, ctx.query)
    if (result.ok === 1) {
      const u = await user.get({ _id: id })
      ctx.session.userInfo = u
      ctx.body = u
    } else {
      ctx.status = 403
      ctx.body = result
    }
  } else {
    ctx.body = {
      status: 401,
      data: 'unlogin',
    }
  }
})

router.get('/wxlogin', async function (ctx, next) {
  let data = await wechat.getOpenId(ctx.query.code)
  data = JSON.parse(data)
  if (!data.errcode) {
    const u = await user.get({ openid: data.openid });
    if (u) {
      ctx.session.userInfo = u
      ctx.status = 200
      ctx.body = u;
    } else {
      const result = await user.add({
        nickName: '',
        openid: data.openid,
      })
      ctx.session.userInfo = result
      ctx.status = 200
      ctx.body = result;
    }
  } else {
    ctx.body = data
  }
})


router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


module.exports = router
