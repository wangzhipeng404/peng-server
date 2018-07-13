const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const session = require('koa-session');
const logger = require('koa-logger')
const  mongoose = require('./db/mongoose')
const index = require('./routes/index')
const users = require('./routes/users')
const group = require('./routes/group')
const moment = require('./routes/moment')
const qiniu = require('./routes/qiniu')
const sessionStore = require('./model/sessionStore');
const appConfig = require('./appConfig')



// error handler
onerror(app)

const CONFIG = {
  key: 'koa:sess',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  store: sessionStore,
};

// middlewares
app.keys = appConfig.AppKeys;
app.use(session(CONFIG, app));
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
/*
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
*/

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(group.routes(), group.allowedMethods())
app.use(moment.routes(), moment.allowedMethods())
app.use(qiniu.routes(), qiniu.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
