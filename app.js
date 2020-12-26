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
const api = require('./routes/api')
const sessionStore = require('./model/sessionStore');
const appConfig = require('./appConfig')
const r1024 = require('./routes/1024')
const wuXianHome = require('./routes/wuXianHome')
const bcy = require('./routes/bcy')
const meituri = require('./routes/meituri')
const routerProxy = require('./routes/proxy')




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

app.use((ctx, next) => {
  return next().catch(err => {
    let code = 500
    ctx.body = {
      code,
      err
    }
  })
})
// routes
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())
app.use(r1024.routes(), r1024.allowedMethods())
app.use(wuXianHome.routes(), wuXianHome.allowedMethods())
app.use(bcy.routes(), bcy.allowedMethods())
app.use(routerProxy.routes(), routerProxy.allowedMethods())
app.use(meituri.routes(), meituri.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
