const path = require('path')

function resolve(name) {
  return path.resolve(__dirname, name)
}

module.exports = {
  // 别名要以斜杆开头跟结尾
  alias: {
    '/@/': resolve('./src'),
    '/layout/': resolve('./src/layout'),
    '/components/': resolve('./src/components'),
    '/assets/': resolve('./src/assets')
  }  
}