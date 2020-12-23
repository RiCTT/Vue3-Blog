const path = require('path')
const fs = require('fs')
const marked = require('marked')

// fs.readFile(path.join(__dirname, './README.md'), 'utf-8', (err, res) => {
//   if (err) {
//     throw err
//   }
//   let d = marked(res)
//   console.log(d)
//   fs.writeFile('./result.txt', d, 'utf8', () => {
//     console.log('done')
//   })
// })

fs.readFile(path.join(__dirname, './app/markdown/Vue3.md'), 'utf-8', (err, res) => {
  if (err) {
    throw err
  }
  // let d = marked(res)
  // console.log(d)
  fs.writeFile('./result.md', res, 'utf8', () => {
    console.log('done')
  })
})