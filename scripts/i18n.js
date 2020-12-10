const puppeteer = require('puppeteer');
const fs = require('fs')
const path = require('path')
const ProgressBar = require("progress")

const _key = process.env.key
const _fileName = process.env.fileName

var bar = new ProgressBar("[:bar] :rate/bps :percent :etas :step", { total: 8 })

const targetPath = path.resolve(__dirname, './src')
const i18nEnPath = path.resolve(__dirname, `./src/language/en/${_fileName}.js`)
const i18nZhPath = path.resolve(__dirname, `./src/language/zh/${_fileName}.js`)
const i18nEnInjectPath = path.resolve(__dirname, `./src/language/en/i18n-script.js`)
const i18nZhInjectPath = path.resolve(__dirname, `./src/language/zh/i18n-script.js`)

const Texts = []

// 遍历文件内容
const getFilePath = function (targetPath, callback) {
  const fileList = fs.readdirSync(targetPath)
  for (let i = 0; i < fileList.length; i++) {
    const filePath = path.resolve(targetPath, fileList[i])
    const stat = fs.lstatSync(filePath)
    if (stat.isDirectory()) {
      getFilePath(filePath, callback)
    } else {
      fs.readFile(filePath, 'utf-8', function (err, data) {
        if (err) throw err
        // 匹配文件夹后缀名
        if (/(.vue$|.js$)/.test(filePath)) {
          const texts = data.match(/\$t\([\u4e00-\u9fa5\'\"]+\)/g)
          if (texts) {
            texts.forEach(text => {
              const txt = /[\u4e00-\u9fa5]+/g.exec(text)[0]
              Texts.push({
                text: text,
                filePath: filePath,
                from: txt
              })
              callback && callback()
            })
          }
        }
      })
    }
  }
}

// 翻译
const fanyi = async function (txt, cb) {
  var d = `[${txt.map(item => `"${item}"`).join(',')}]`
  var url = 'https://translate.google.cn/?sl=zh-CN&tl=en&text=' + encodeURIComponent(d) + '&op=translate'
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const dimensions = await page.evaluate(() => {
    return document.querySelector('.J0lOec').innerText
  });
  cb(dimensions)
  await browser.close();
}

let getZhToEnTimer = null
bar.tick(0, { step: '开始遍历匹配文件' })
getFilePath(targetPath, function () {
  getZhToEnTimer && clearTimeout(getZhToEnTimer)
  getZhToEnTimer = setTimeout(() => {
    const txts = Texts.map(item => item.from)
    bar.tick(1, { step: '开始翻译' })
    fanyi(txts, res => {
      bar.tick(2, { step: '翻译成功' })
      try {
        const fys = eval(res)
        const files = []
        Texts.forEach((item, index) => {
          const tos = getKeyAndEn(fys[index])
          const fileReplace = {
            text: item.text,
            filePath: item.filePath,
            key: tos.key,
            zh: item.from,
            en: tos.en
          }
          getZhToEn(fileReplace)
          files.push(fileReplace)
        })
        bar.tick(3, { step: '中英对比' })
        callbackToi18n(files)
      } catch (error) {
        console.log('调用翻译接口异常咯', error)
      }
    })
  }, 1000)
})


const writeFile = function (path, data) {
  try {
    fs.writeFileSync(path, data, 'utf-8')
  } catch (error) {
    console.log('writeFile：异常了')
  }
}

// 读写文件的国际化，中文转为i18n的变量key
const getZhToEn = function (item) {
  try {
    let data = fs.readFileSync(item.filePath, 'utf-8')
    data = data.replace(item.text, item.text.replace(item.zh, _key + '.' + item.key))
    writeFile(item.filePath, data)
  } catch (error) {
    console.log('getZhToEn: 异常了' + error)
  }
}

// 读写文件的国际化，中文转为i18n的变量key
const i18nToProject = function (filePath, i18nObject) {
  let fileObject = {}
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, 'utf-8')
    const jsText = fileData.replace('export default ', '')
    fileObject = JSON.parse(jsText)
  }
  if (fileObject[_key]) {
    fileObject[_key] = { ...fileObject[_key], ...i18nObject }
  } else {
    fileObject[_key] = i18nObject
  }
  writeFile(filePath, `export default ${JSON.stringify(fileObject, undefined, 2)}`)
}

// 写入导入到导出
const i18nInjectProject = function (filePath) {
  try {
    let data = fs.readFileSync(filePath, 'utf-8')
    const injectPath = `export { default as ${_fileName} } from './${_fileName}'`
    if (data.indexOf(injectPath) === -1) {
      data = data + '\n' + injectPath
      writeFile(filePath, data)
    }
  } catch (error) {
    console.log('i18nInjectProject: 异常了' + error)
  }
}

// 获取翻译，key改为驼峰命名，英语为大写+空格
const getKeyAndEn = function (e) {
  const en = e.split(' ').map(k => {
    return k.substring(0, 1).toLocaleUpperCase() + k.substring(1)
  }).join(' ')
  const key = en.split(' ').map((item, index) => {
    if (index === 0) return item.toLocaleLowerCase()
    return item
  }).join('')
  return { en, key }
}

// 收集的变量，回写到项目国际化配置
const callbackToi18n = function (files) {
  let zhs = {}
  let ens = {}
  files.forEach(item => {
    zhs[item.key] = item.zh
    ens[item.key] = item.en
  })
  bar.tick(4, { step: '开始替换项目的国际化变量' })
  i18nToProject(i18nZhPath, zhs)
  bar.tick(5, { step: '开始新建项目的国际化变量文件-en' })
  i18nInjectProject(i18nEnInjectPath)
  bar.tick(6, { step: '国际化en转义成功' })
  i18nToProject(i18nEnPath, ens)
  bar.tick(7, { step: '开始新建项目的国际化变量文件-zh' })
  i18nInjectProject(i18nZhInjectPath)
  bar.tick(8, { step: '国际化zh转义成功' })
}
