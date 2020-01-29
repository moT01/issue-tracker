require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')

// @route   GET api/users
// @desc    Register a new user
// @access  Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'Email already exists' })

    User.findOne({ name }).then(user => {
      if (user) return res.status(400).json({ msg: 'Name already exists' })

      const newUser = new User({
        name,
        email,
        password
      })

      // create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err

          newUser.password = hash
          newUser.save().then(user => {
            jwt.sign({ id: user.id }, process.env.JWTSECRET, (err, token) => {
              if (err) throw err

              return res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            })
          })
        })
      })
    })
  })
})

module.exports = router
