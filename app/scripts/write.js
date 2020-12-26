// 将markdown内的文本写到数据库中const path = require('path')

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const md5 = require('md5')
const Blog = require('../model/blog')

require('./db')

// 1、遍历md文件夹
// 2、解析未生成id的md文件
// 3、生成带id的md文件，标识已上传

const mdDir = path.join(__dirname, '../markdown')
const uploadedType = /-\w+\.md$/ // 已上传的格式，建议12[title].md
const editedType = /-update-\w+\.md/
const metas = ['title', 'time', 'category', 'tag']
const metasRegexp = metas.map(item => {
  // /\$time\:\s+([\u4e00-\u9fa5\w+\-,]*)\;/
  // 支持 $[key]: 12中文,-:;的格式
  return new RegExp('\\$' + item + '\\:\\s+([\\:\\s\\u4e00-\\u9fa5\\w+\\-,]*)\\;')
})

let list = []

// 获取需要上传的md列表
fs.readdirSync(mdDir).forEach(fileName => {
  if (uploadedType.test(fileName)) return
  list.push(fileName)
})

if (list.length === 0) {
  console.log('写入完成：没有新增的数据，或检查格式;');
  process.exit(1)
}

// 解析标题、分类等元信息
let models = []
list.forEach(fileName => {
  fs.readFile(path.join(mdDir, '../markdown/', fileName), 'utf-8', (err, result) => {
    if (err) throw err
    writeBackup(fileName, result)
    let item = {}
    let originStr = result
    result = result.replace(/\n/g, '')
    metasRegexp.forEach((rg, index) => {
      let key = metas[index]
      if (result.match(rg)) {
        item[key] = result.match(rg)[1]
      }
      result = result.replace(rg, '')
      originStr = originStr.replace(rg, '')
    })
    if(item.title) {
      item.id = md5(item.title)
    }
    item.fileName = fileName.replace(/\.md/, '')
    item.content = marked(originStr)
    models.push(item)
    if (models.length === list.length) {
      writeToDB(models)
    }
  })
})

async function writeBackup(fileName, content) {
  fs.writeFile(path.join(mdDir, '../markdown-backup/', fileName), content, (err) => {
    if (err) {
      throw err
    }
  })
}

async function writeToDB(models) {
  let map = {}
  console.log(1)
  for (let i = 0; i < models.length; i++) {
    let body = await new Blog(models[i]).save()
    let { fileName } = models[i]
    let newFileName = `${fileName}-${body._id}.md`;
    map[`${fileName}.md`] = newFileName
  }
  goRenameFile(map)
}

async function goRenameFile(map) {
  let count = 0
  list.forEach(fileName => {
    console.log(map[fileName])
    let oldName = path.join(mdDir, './', fileName)
    let newName = path.join(mdDir, './', map[fileName])
    fs.rename(oldName, newName, (err, res) => {
      if (err) throw err
      count++
      if (count === list.length) {
        console.log('写入完成：新增数据：' + count + '条;')
        process.exit(1)
      }
    })
  })
}
