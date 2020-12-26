const router = require('koa-router')()
const dagaer = require('../spider/1024.js')
const bcy = require('../spider/bcy.js')

const host = 'https://bcy.net'

router.prefix('/bcy')

router.get('/',async function (ctx, next) {
  ctx.body = 'hello bcy'
})

router.get('/list-hot', async function (ctx, next) {
  const { url } = ctx.query
  const html = await wuXianHome.getHTML(host + url)
  const articles = await wuXianHome.getUrlList(html)
  ctx.body = articles
})

router.get('/list-new', async function (ctx, next) {
  const { since } = ctx.query
  const url = `/circle/timeline/loadtag?since=${since}&grid_type=timeline&tag_id=399&sort=recent`
  const res = await bcy.getHTML(host + url)
  const json = JSON.parse(res)
  ctx.body = json.data
})

router.get('/detail',async function (ctx, next) {
  const { id } = ctx.query;
  const detailPageHTML = await bcy.getHTML(`${host}/item/detail/${id}`)
  const data = await bcy.getImgUrl(detailPageHTML)
  ctx.body = data
})

module.exports = router
