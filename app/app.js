const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const routing = require('./routes')
const views = require('koa-views')
const app = new Koa()

require('./scripts/db')

// 开放静态目录
app.use(serve('./public'))

// 配置模板引擎
app.use(views('public/views', {
  extension: 'ejs'
}))

routing(app)

app.listen(9798, () => {
  console.log('Server runing in http://localhost:9798')
})
