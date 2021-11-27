<<<<<<< HEAD
const express = require('express')
const config = require('config')
const cors = require('cors')

const app = express()

const PORT = config.get('PORT') || 5000

app.use(express.json())
app.use(cors())
app.use(express.static(__dirname + '/uploads'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/post', require('./routes/post.routes'))

app.listen(PORT, () => {
    console.log(`Server has been started at port ${PORT}...`)
})
=======
const Express = require('express')
const config = require('config')
const cors = require("cors");

const app = Express()

app.use(Express.json())

app.use(cors())

const urlencodedParser = Express.urlencoded({extended: false});
app.use(Express.static(__dirname + '/uploads'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/ads.routes'))

PORT = config.get('port') || 5000

app.listen(PORT, () => {
    console.log(`Server has been started at port ${PORT}...`)
})

>>>>>>> b76f082edcea5c1c020461deb0b649f2a049e70d
