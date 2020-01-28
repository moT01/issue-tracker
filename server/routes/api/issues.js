const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Issue = require('../../models/Issue')

// @route   GET api/issues
// @desc    Get all issues for this project
// @access  Public
router.get('/', (req, res) => {
  Issue.find()
    .sort({ createdOn: -1 })
    .then(issues => {
      return res.json(issues)
    })
})

// @route   GET api/issues
// @desc    Create a new issue for this project
// @access  Private to anyone authenticated
router.post('/', auth, (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ msg: 'Please enter a title' })
  }

  const { name } = req.user

  if (!name) {
    return res.status(400).json({ msg: 'User name not found' })
  }

  const newIssue = new Issue({
    title: title,
    description: description,
    createdBy: name
  })

  newIssue.save().then(issue => res.json(issue))
})

// @route   PATCH api/issues
// @desc    Edit or Close this issue
// @access  Private to Admin and OP
/*router.patch('/:id', auth, (req, res) => {
  //ability to edit an issue (title or description)
  //ability to open or close an issue

  // so we will need the new title/desc
  // and/or "closed" / "open" which sets "active" to true or false

  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})*/

module.exports = router
