const http = require('http')

const host = '127.0.0.1'
const port = '9888'

const app = http.createServer((req, res) => {
  console.log(req)
  res.statusCode = 200
  res.end()
})

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
})