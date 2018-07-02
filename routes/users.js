const router = require('koa-router')()
const user = require('../api/user')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/add', async function (ctx, next) {
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

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
