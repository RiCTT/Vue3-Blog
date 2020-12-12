const express = require('express')
const app = express()
const path = require('path')

const host = '127.0.0.1'
const port = '9888'

const getMockDataByUrl = (url = '') => {
  url = url.replace(/\/mock\//, '')
  let paths = url.split('/')
  let fileName = paths[0]
  let key = paths[1]
  // 比如url: /mock/blog/list
  // 只支持一级，mock为前缀，blog为对应的文件，list为文件导出的变量
  try {
    let requirePath = path.join(__dirname, './data/', fileName)
    let files = require(requirePath)
    if (files && files[key]) {
      return files[key]
    }/*  */
  } catch (err) {
    console.error(err)
  }
}

app.get('*', (req, res) => {
  let { originalUrl } = req
  const data = getMockDataByUrl(originalUrl)
  const body = {
    code: 200,
    status: true,
    data,
    responseTime: Date.now()
  }
  res.send(body)
})

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
})