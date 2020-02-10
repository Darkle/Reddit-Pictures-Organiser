const path = require('path')

const express = require('express')
const { Liquid } = require('liquidjs')
const engine = new Liquid()


const app = express()

app.engine('liquid', engine.express())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')
app.use(express.static(path.resolve(__dirname, '..', 'frontend')))

const port = 8887
var http = require('http')
app.get('/', (req, res) => res.render('index'))
var internalIp = require('internal-ip')
// app.listen(port, '192.168.1.2', () => console.log(`Example app listening on port ${port}!`))



var server = http.createServer(app)

var ipadd = internalIp.v4.sync()
server.listen(port, ipadd)
  .on('listening', () => console.log(`listening on ${ipadd}:${port}`))
  .on('error', err => console.error(err))