require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const MySQLEvents = require('@rodrigogs/mysql-events');
const connection = require('./src/configs/db')

// import router
const usersRoute = require('./src/routers/usersRoute')
const responseHelpers = require('./src/helpers/responseHelpers')
const transfersRoute = require('./src/routers/transfersRoute')
const topUpRoute = require('./src/routers/topUpRoute')
const emailRoute = require('./src/routers/emailRoute')
const { rejects } = require('assert')
const PORT = process.env.PORT

// CORS
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(morgan('dev'))

// grouping end-point
app.use('/v1/users', usersRoute)
app.use('/v1/transfers', transfersRoute)
app.use('/v1/topup', topUpRoute)
app.use('/v1/email', emailRoute)

app.use('/photo', express.static('./uploads'))

app.use('*', (req, res) => {
  responseHelpers.response(res, null, { status: 'failed', statusCode: 404 }, { message: 'Sorry API endpoint Not Found' })
})

// Error handling
app.use((err, req, res, next) => {
  responseHelpers.response(res, null, { status: err.status || 'Failed', statusCode: err.statusCode || 400 }, { message: err.message })
})

app.all('/', function (q, p, next) {
  p.header("Access-Control-Allow-Origin", "*");
  p.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// server
const server = http.createServer(app)
// socket
const io = require('socket.io')(server, {
  cors: {
    origin: `${process.env.BASE_URL_FRONT_END}`,
    methods: ["GET"]
  }
})
// add listener
io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  socket.on('getUserData', (data) => {
      connection.query('SELECT id, email, firstName, lastName, phoneNumber,phoneNumberSecond,pin, password, balance, photo FROM users where id = ?', data, (error, results) =>{
        if(!error){
          io.emit('getUserData', results)
        }else{
          io.emit('getUserData', error)
        }
      })
  })
})
// seerver running
server.listen(PORT, () => console.log('Express server running on port : ' + PORT))
// app.listen(PORT, () => console.log('Express server running on port : ' + PORT))
