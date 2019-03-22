'use strict';

const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const db = require('./db')
const connectDb = require('./middleware/db/mongoDB')
const catchError = require('./middleware/catchError')
const responseData = require('./middleware/responseData')
const koaJwt = require('koa-jwt')
const fs = require('fs')

const index = require('./routes/index')

// error handler
onerror(app)

app.secret = 'jwt_nloves'

// middlewares
app.use(cors({
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowHeaders: ['Content-type', 'Authorization', 'Accept', 'x-access-token', 'anonymous']
}))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))
app.use(require('koa-static')(__dirname + '/app/dist'))
// 返回数据格式
app.use(responseData())
// 错误捕获
app.use(catchError())
// koa-jwt验证
app.use(koaJwt({ secret: app.secret }).unless({
  path: [/^\//, /^\/v1.0\/api\/user\/login/]
}))
// 连接mongoDB数据库
app.use(connectDb(db))

// 页面模板
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))
if (!fs.existsSync(`${__dirname}/app/dist`)) {
  console.log('未发现页面文件!!!!!!!')
}
app.use(views(__dirname + '/app/dist', {
  map : {
    html:'ejs'
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// 注入路由控制器
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', async (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
