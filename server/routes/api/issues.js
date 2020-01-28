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
      console.log(issues)
      return res.json(issues)
    })
})

// @route   GET api/issues
// @desc    Create a new issue for this project
// @access  Private
router.post('/', auth, (req, res) => {
  const { title, description } = req.body

  console.log(description)
  if (!title) {
    return res.status(400).json({ msg: 'Please enter a title' })
  }

  const { id } = req.user

  const newIssue = new Issue({
    title: title,
    description: description,
    creatorId: id
  })

  newIssue.save().then(issue => res.json(issue))
})

/*router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})*/

module.exports = router
