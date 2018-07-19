const router = require('koa-router')()
const user = require('../api/user')
const qiniu = require('../api/qiniu')
const group = require('../api/group')
const moment = require('../api/moment')

router.prefix('/api')
const apis = {
  ...user,
  ...qiniu,
  ...group,
  ...moment,
}
for(const api in apis) {
  router.get(api, apis[api])
}


module.exports = router
