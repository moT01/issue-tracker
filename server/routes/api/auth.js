require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// @route   POST api/auth
// @desc    Login user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: 'User not found' })
    console.log(user)
    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' })

      jwt.sign({ id: user.id }, process.env.JWTSECRET, (err, token) => {
        if (err) throw err

        return res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            permissionsLevel: user.permissionsLevel
          }
        })
      })
    })
  })
})

// @route   Get api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router
