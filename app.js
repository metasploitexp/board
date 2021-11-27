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