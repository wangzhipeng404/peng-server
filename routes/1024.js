const router = require('koa-router')()
const dagaer = require('../spider/1024.js')

const host = 'http://t66y.com/'

router.prefix('/1024')

router.get('/',async function (ctx, next) {
  ctx.body = 'hello 1024'
})

router.get('/article', async function (ctx, next) {
  const { page, url } = ctx.query
  const html = await dagaer.getHTML(host + url + page)
  const articles = await dagaer.getUrlList(html)
  ctx.body = articles
})

router.post('/imgs',async function (ctx, next) {
  const { articles } = ctx.request.body
  const len = articles.length
  const data = []
  for(let i = 0; i < len; i++) {
    const article = articles[i]
    console.log(`开始爬取第 ${i + 1} 条`)
    const detailPageHTML = await dagaer.getHTML(host + article.link)
    const imgList = await dagaer.getImgUrl(detailPageHTML)
    const keys = await dagaer.saveToQiniu(imgList)
    article.raw_imgs = imgList
    article.qiniu_keys = keys
    data.push(article)
  }
  ctx.body = data
})

router.post('/img+qiniu',async function (ctx, next) {
  const { article } = ctx.request.body
  const detailPageHTML = await dagaer.getHTML(host + article.link)
  const imgList = await dagaer.getImgUrl(detailPageHTML)
  const keys = await dagaer.saveToQiniu(imgList)
  article.raw_imgs = imgList
  article.qiniu_keys = keys
  ctx.body = article
})

router.post('/img',async function (ctx, next) {
  const { article } = ctx.request.body
  const detailPageHTML = await dagaer.getHTML(host + article.link)
  const imgList = await dagaer.getImgUrl(detailPageHTML)
  article.raw_imgs = imgList
  ctx.body = article
})

router.post('/keep_qiniu',async function (ctx, next) {
  const { article } = ctx.request.body
  const keys = await dagaer.saveToQiniu(article.raw_imgs)
  article.qiniu_keys = keys
  ctx.body = article
})

router.post('/remove_qiniu',async function (ctx, next) {
  const { article } = ctx.request.body
  const result = await dagaer.QiniuDelete(article.qiniu_keys)
  ctx.body = result
})

module.exports = router
