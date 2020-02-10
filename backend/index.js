const http = require('http')
const path = require('path')

const express = require('express')
const { Liquid } = require('liquidjs')
const internalIp = require('internal-ip')
const instant = require('instant')

const port = 8887
const engine = new Liquid()
const app = express()
const server = http.createServer(app)

const frontendDir = path.resolve(__dirname, '..', 'frontend')
// const web_modulesDir = path.resolve(__dirname, '..', 'web_modules')

app.engine('liquid', engine.express())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')

app.use(instant(frontendDir))
// app.use('/web_modules', express.static(web_modulesDir))

app.get('/', (req, res) => res.render('index'))
// app.listen(port, '192.168.1.2', () => console.log(`Example app listening on port ${port}!`))




const ipadd = internalIp.v4.sync()
server.listen(port, ipadd)
  .on('listening', () => console.log(`listening on http://${ipadd}:${port}`))
  .on('error', err => console.error(err))