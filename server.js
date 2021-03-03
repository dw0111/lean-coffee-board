const express = require('express')

const app = express()

app.use((req, res) => {
  console.log(req.method, req.url)
  res.end('Hello World')
})

app.listen(3000, () => {
  console.log('Server started at http://localhost:3000')
})