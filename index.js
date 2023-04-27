const express = require('express')
const routerApi = require('./routes')
const cors = require("cors")

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler.js')

const app = express()
const port = process.env.PORT || 3010

app.use(express.json())

const whitelist = ['http://127.0.0.1:5500', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    }
    else {
      callback(new Error('access denied'))
    }
  }

}
app.use(cors(options))

// Console shipping terminal

app.listen(port, () => {
})

// by get

app.get('/', (req, res) => {
  res.send("Hello my new server in express")
})

// new path

app.get('/newPath', (req, res) => {
  res.send("It's new path")
})


routerApi(app)
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)




