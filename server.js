const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

let users = []

app.use(express.json())

app.get('/api/users', (req, res) => {
  res.json(users)
})

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  res.json(users.find(user => user.id === id))
})

app.post('/api/users', (req, res) => {
  const newUser = { ...req.body, id: uuidv4() }
  users.push(newUser)
  res.json(newUser)
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
