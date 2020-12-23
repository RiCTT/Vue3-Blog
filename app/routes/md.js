// md文件的相关路由

const Router = require('koa-router')
const router = new Router({ prefix: '/md' })
const { getList } = require('../controllers/md')
router.get('/', getList)

module.exports = router

