const router = require('koa-router')()
const qiniu = require('../api/qiniu')

router.prefix('/qiniu')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/token', async function (ctx, next) {
  ctx.body = qiniu.getToken()
})

module.exports = router
