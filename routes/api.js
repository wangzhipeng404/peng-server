const router = require('koa-router')()
const user = require('../api/user')
const qiniu = require('../api/qiniu')
const group = require('../api/group')
const moment = require('../api/moment')
const tulin = require('../api/tulin')
const comment = require('../api/comment')

router.prefix('/api')
const apis = {
  ...user,
  ...qiniu,
  ...group,
  ...moment,
  ...tulin,
  ...comment,
}
for(const api in apis) {
  router.all(api, apis[api])
}


module.exports = router
