const fs = require('fs')
const path = require('path')
const marked = require('marked')
const Blog = require('../model/blog')
const { promisify } = require('../utils')

require('./db')

// 1、遍历md文件夹
// 2、解析未生成id的md文件
// 3、生成带id的md文件，标识已上传

const insertDir = path.join(__dirname, '../markdown/insert')
const metas = ['title', 'time', 'category', 'tag']
const metasRegexp = metas.map(item => {
  // /\$time\:\s+([\u4e00-\u9fa5\w+\-,]*)\;/
  // 支持 $[key]: 12中文,-:;的格式
  return new RegExp('\\$' + item + '\\:\\s+([\\:\\s\\u4e00-\\u9fa5\\w+\\-,]*)\\;')
})

// 获取目录下新增的列表文件名
async function getInsertList(dir) {
  let list = []
  fs.readdirSync(dir).forEach(fileName => {
    list.push(fileName)
  })
  return list
}
// 读取文件并提取title、time等信息，返回一个相关信息的数组
async function readAndextractListInfo(fileList) {
  try {
    const readFile = promisify(fs.readFile)
    let models = []
    for (let i = 0; i < fileList.length; i++) {
      const item = {}
      let fileName = fileList[i]
      const filePath = path.join(insertDir, '/', fileName)
      let data = await readFile(filePath, 'utf-8')
      let orginData = data
      metasRegexp.forEach((rg, index) => {
        let key = metas[index]
        if (data.match(rg)) {
          item[key] = data.match(rg)[1]
        }
        data = data.replace(rg, '')
      })
      item.fileName = fileName
      item.content = data // 取出信息后，存格式化的内容
      item.originContent = orginData
      models.push(item)
    }
    return models
  } catch (e) {
    console.error(e)
  }
}
// 删除源文件
async function goRemoveOriginFile(fileItem, id) {
  try {
    let unlink = promisify(fs.unlink)
    let writeFile = promisify(fs.writeFile)
    let { fileName, originContent } = fileItem
    let newFileName = fileName.replace(/.md/, `-${id}.md`)
    await writeFile(path.join(insertDir, '../source/', newFileName), originContent)
    await unlink(path.join(insertDir, '/', fileName))
  } catch (e) {
    console.error(fileName + '删除失败!!!')
    console.log(e)
  }
}
// 保存到数据库
async function goSaveList2DB(list) {
  try {
    for (let i = 0; i < list.length; i++) {
      let body = await new Blog(list[i]).save()
      if (body) {
        goRemoveOriginFile(list[i], body._id)
      }
    }
  } catch (e) {
    console.error('保存数据库发生错误')
    console.error(e)
    throw e
  }
}

async function main() {
  let list = await getInsertList(insertDir)
  if (list.length === 0) {
    console.log('写入完成：没有新增的数据，或检查格式;');
    process.exit(0)
  }
  let infoList = await readAndextractListInfo(list)
  goSaveList2DB(infoList)
}

main()
