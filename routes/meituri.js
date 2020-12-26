const router = require('koa-router')()
const meituri = require('../spider/meituri.js')
const qiniu = require('../spider/qiniu')

const targetMagazineList = {
  agency: meituri.getAgencyMagazineList,
  model: meituri.getModelMagazineList,
  area: meituri.getMagazineList,
}

const host = 'https://www.meituri.com'

router.prefix('/meituri')

router.get('/',async function (ctx, next) {
  const html = await meituri.getHTML('https://www.meituri.com/');
  const data = await meituri.getNavData(html)
  ctx.body = data
})

router.get('/proxy-img', async function (ctx, next) {
  const { url } = ctx.query
  ctx.type="image/jpg"
  ctx.status = 200;
  ctx.body = await  meituri.proxyRequest(url)
})

router.get('/magazine-list', async function (ctx, next) {
  let { url, target } = ctx.query
  url = decodeURIComponent(url)
  const html = await meituri.getHTML(url)
  const data = await targetMagazineList[target](html, url)
  ctx.body = data
})

router.get('/model-list', async function (ctx, next) {
  const { url } = ctx.query
  const html = await meituri.getHTML(host + url)
  const data = await meituri.getModelList(html)
  ctx.body = data
})

router.get('/agency-list', async function (ctx, next) {
  const { url } = ctx.query
  const html = await meituri.getHTML(host + url)
  const data = await meituri.getAgencyList(html)
  ctx.body = data
})

router.get('/search',async function (ctx, next) {
  const { keyword } = ctx.query;
  const html = await meituri.getHTML(`${host}/search/${encodeURIComponent(keyword)}`)
  const data = await meituri.getSearchList(html)
  ctx.body = data
})

router.get('/magazine-detail', async function (ctx, next) {
  let { url } = ctx.query
  url = decodeURIComponent(url)
  const html = await meituri.getHTML(url)
  const data = await meituri.getMagazineDetail(html)
  ctx.body = data
})

router.get('/model-detail', async function (ctx, next) {
  let { id } = ctx.query
  const data = await meituri.getModelDetail(`${host}/t/${id}`, id)
  ctx.body = data
})

router.get('/qiniu-save', async function (ctx, next) {
  const { id, num } = ctx.query
  const imgs = []
  for(let i = 0; i<= num; i++) {
    imgs.push({
      link: `https://lns.hywly.com/a/1/${id}/${i}.jpg`,
      name: `${id}_${i}.jpg`,
    })
  }
  const data = await qiniu.qiniuSave('peng', imgs)
  ctx.body = data
})

router.get('/qiniu-delete', async function (ctx, next) {
  const { id, num } = ctx.query
  const imgs = []
  for(let i = 0; i<= num; i++) {
    imgs.push(`${id}_${i}.jpg`)
  }
  const data = await qiniu.qiniuDelete('peng', imgs)
  ctx.body = data
})

module.exports = router
