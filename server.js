const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/User')
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

// ----------------------- USERS -----------------------
app.get('/api/users', async (req, res, next) => {
  res.json(await User.find().catch(next))
})

app.get('/api/users/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await User.findOne({ id }).catch(next))
})

app.post('/api/users', async (req, res, next) => {
  res.json(await User.create(req.body).catch(next))
})

app.delete('/api/users/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await User.deleteOne({ id }).catch(next))
})

// ----------------------- CARDS -----------------------
app.get('/api/cards', async (req, res, next) => {
  res.json(await Card.find().populate('author').catch(next))
})

app.get('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.findOne({ id }).populated('author').catch(next))
})

app.post('/api/cards', async (req, res, next) => {
  res.json(await Card.create(req.body).catch(next))
})

app.delete('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.deleteOne({ id }).catch(next))
})

app.patch('/api/cards/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await Card.updateOne({ id }).catch(next))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.json({ error: err })
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
