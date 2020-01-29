require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

app.use(express.json())

const db = process.env.MONGOURI

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log(`mongodb connected via ${db}`))
  .catch(err => console.log(`cannot connect to mongodb via ${db}... ${err}`))

app.use('/api/issues', require('./server/routes/api/issues'))
app.use('/api/comments', require('./server/routes/api/comments'))
app.use('/api/users', require('./server/routes/api/users'))
app.use('/api/auth', require('./server/routes/api/auth'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`listening on port ${port}`))
