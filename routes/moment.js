const router = require('koa-router')()
const moment = require('../api/moment')

router.prefix('/moment')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/add', async function (ctx, next) {
  const user = ctx.session.userInfo
  const uid = user._id.toString()
  const result = await moment.add({
    creator: {
      nickName: user.nickName,
      _id: uid,
      avatarUrl: user.avatarUrl,
    },
    content: ctx.query.content,
    images: ctx.query.images && ctx.query.images.split(','),
  })
  ctx.status = 200
  ctx.body = result;
})

router.get('/find', async function (ctx, next) {
  const user = ctx.session.userInfo
  const uid = user._id.toString()
  // const result = await moment.find({ creator: { _id: uid } })
  const result = await moment.find({ })
  ctx.body = result;
})

router.get('/get', async function (ctx, next) {
  const result = await moment.get(ctx.query)
  ctx.body = result;
})

module.exports = router
