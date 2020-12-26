const router = require('koa-router')()
const rp = require('request-promise');
router.prefix('/proxy')

router.post('/', async function (ctx, next) {
  const body = JSON.parse(ctx.request.body.message)
  ctx.body = await rp({
    ...body,
    json: true,
    headers: {
      'Content-Type': 'text/html, utf-8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)' +
          ' Chrome/70.0.3538.77 Safari/537.36'
    },
  })
})



module.exports = router