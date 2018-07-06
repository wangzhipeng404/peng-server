const router = require('koa-router')()
const user = require('../api/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/register', async function (ctx, next) {
  const result = await user.add({
    username: ctx.query.username,
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
    if (result.status === 'success' && result.data ) {
      ctx.session.userInfo = result.data
      ctx.cookies.set('user_id', result.data._id, {
        maxage: Date.now() + 180000,
        signed: 'cookie',
        expires: Date.now() + 180000,
        overwrite: true,
      })
    }
    ctx.body = result;
})

router.get('/getself', async function (ctx, next) {
  ctx.body = ctx.session.userInfo;
})


router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
