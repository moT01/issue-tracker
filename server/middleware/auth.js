require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

function auth(req, res, next) {
  const token = req.header('x-auth-token')

  // check for token
  if (!token) return res.status(401).json({ msg: 'No token found' })

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWTSECRET)

    User.findOne({ _id: decoded.id })
      .select('-password -_id -__v')
      .then(user => {
        if (!user) return res.status(400).json({ msg: 'User ID not found' })

        req.user = { ...decoded, ...user._doc }
        next()
      })
  } catch (e) {
    res.status(400).json({ msg: 'Invalid token' })
  }
}

module.exports = auth
