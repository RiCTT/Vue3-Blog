/**
 * 应该有个model来
 */

const marked = require('marked')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

class Md {
  async getList(ctx) {
    // ctx.body = [
    //   1, 2, 3, 4, 5
    // ]
    let d = fs.readFileSync(path.join(__dirname, '../markdown/test.md'), 'utf-8')
    // 使用模板引擎
    let content = marked(d);
    await ctx.render('template', { // 渲染 模板
      content,
    })
  }
}

module.exports = new Md()