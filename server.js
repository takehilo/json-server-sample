const os = require('os')
const path = require('path')
const fs = require('fs')
const https = require('https')
const jsonServer = require('json-server')
const app = jsonServer.create()
const middlewares = jsonServer.defaults()

const products = require('./data/products.json')
const users = require('./data/users.json')
const routes = {
  products,
  users
}
const router = jsonServer.router(routes)

app.use(middlewares)
app.use(router)

const certFile = fileName => {
  const file = path.join(__dirname, 'certs', fileName)
  return fs.readFileSync(file)
}

const startServer = () => {
  const options = {
    key: certFile('server.key'),
    cert: certFile('server.crt')
  }
  const server = https.createServer(options, app);

  const port = process.env.PORT || 3000
  server.listen(port, () => {
    console.log(`JSON Server is running on https://localhost:${port}`)
  })
}

startServer()
