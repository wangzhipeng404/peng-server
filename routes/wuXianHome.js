const router = require('koa-router')()
const dagaer = require('../spider/1024.js')
const wuXianHome = require('../spider/wuXianHome.js')

const host = 'http://wuxianhome.com/'
const host2 = 'http://wuxianxian.com/'

router.prefix('/wuxianhome')

router.get('/',async function (ctx, next) {
  ctx.body = 'hello wuxianhome'
})

router.get('/list', async function (ctx, next) {
  const { url } = ctx.query
  const html = await wuXianHome.getHTML(host + url)
  const articles = await wuXianHome.getUrlList(html)
  ctx.body = articles
})

router.get('/img',async function (ctx, next) {
  /* const { article } = ctx.request.body */
  const detailPageHTML = await wuXianHome.getHTML(host + ctx.query.url)
  const imgList = await wuXianHome.getImgUrl(detailPageHTML)
  ctx.body = imgList.map(img => host + img)
})

router.get('/magazine-list', async function (ctx, next) {
  const { url } = ctx.query
  const html = await wuXianHome.getMagazineHTML(host2 + url)
  const data = await wuXianHome.getMagazineList(html)
  ctx.body = data
})

router.post('/magazine-detail', async function (ctx, next) {
  const { magazine } = ctx.request.body
  const indexDetail  = await wuXianHome.getMagazineContent(magazine.link)
  let paginationDetail = []
  if (indexDetail.pagination.length > 0) {
    paginationDetail = await Promise.all(indexDetail.pagination.map(val => wuXianHome.getMagazineContent(val)))
  }
  let content = paginationDetail.reduce((acc, cur) => {
    return acc.concat(cur.content)
  }, indexDetail.content)
  // const images = await wuXianHome.getMagazineDetailImages(content)
  const newMagazine = {
    ...magazine,
    pagination: indexDetail.pagination,
    detail: content,
    // images: images,
  }
  ctx.body = newMagazine
})

module.exports = router
