const router = require('koa-router')()
const group = require('../api/group')

router.prefix('/group')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/add', async function (ctx, next) {
  const user = ctx.session.userInfo
  const uid = user._id.toString()
  const result = await group.add({
    nickName: ctx.query.nickName,
    intro: ctx.query.intro,
    avatarUrl: ctx.query.avatarUrl,
    creator: uid,
    members: [uid],
  })
  ctx.status = 200
  ctx.body = result;
})

router.get('/find', async function (ctx, next) {
  const user = ctx.session.userInfo
  const uid = user._id.toString()
  const result = await group.find({ members: uid })
  // const result = await group.find({ })
  ctx.body = result;
})

router.get('/get', async function (ctx, next) {
  const result = await group.get(ctx.query)
  ctx.body = result;
})

module.exports = router
