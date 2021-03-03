const express = require('express')
const { v4: uuidv4 } = require('uuid')
const mongoose = require('mongoose')
const User = require('./models/User')

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

let users = []

app.use(express.json())

app.get('/api/users', async (req, res) => {
  res.json(await User.find())
})

app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params
  res.json(await User.findOne({ id }))
})

app.post('/api/users', async (req, res) => {
  res.json(await User.create(req.body))
})

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  const indexToDelete = users.findIndex(user => user.id === id)
  users = [...users.slice(0, indexToDelete), ...users.slice(indexToDelete + 1)]
  res.json(users)
})

app.get('/api/cards', (req, res) => {
  res.json([{ title: 'First Card' }])
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})
