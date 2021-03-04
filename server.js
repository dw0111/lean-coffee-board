const express = require('express')
const mongoose = require('mongoose')
const Card = require('./models/Card')

mongoose
  .connect('mongodb://localhost/lean-coffee-board', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongoDB')
  })
  .catch(error => {
    console.log('Connection error to mongoDB', error)
  })

const app = express()

app.use(express.json())

app.use('/api/users', require('./routes/users'))

app.use('/api/cards', require('./routes/cards'))

app.use((err, req, res, next) => {
  console.log(err.message)
  res.json({ error: err })
})

app.listen(4000, () => {
  console.log('Server started at http://localhost:4000')
})
