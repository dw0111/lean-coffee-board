const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  res.json(await User.find().catch(next))
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await User.findById(id).catch(next))
})

router.post('/', async (req, res, next) => {
  res.json(await User.create(req.body).catch(next))
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(await User.findByIdAndDelete(id).catch(next))
})

router.patch('/:id', async (req, res, next) => {
  const { id } = req.params
  res.json(
    await User.findByIdAndUpdate(id, req.body, { new: true }).catch(next)
  )
})

module.exports = router
