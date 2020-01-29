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
  const { name } = req.user
  const { title, description } = req.body
  if (!title) return res.status(400).json({ msg: 'Please enter a title' })

  const newIssue = new Issue({
    title: title,
    description: description,
    createdBy: name
  })

  newIssue.save().then(issue => res.json(issue))
})

// @route   PATCH api/issues
// @desc    Edit this issue
// @access  Private to Admin and OP
router.patch('/', auth, (req, res) => {
  const { permissionsLevel, name } = req.user
  const { title, description, issueId, createdBy } = req.body

  if (permissionsLevel >= 2 || createdBy === name) {
    Issue.findOneAndUpdate(
      { _id: issueId },
      { $set: { title: title, description: description } },
      { returnOriginal: false }
    )
      .then(issue => {
        return res.json(issue)
      })
      .catch(err => res.status(404).json({ success: false }))
  } else {
    return res.status(401).json({ msg: 'Permission Denied' })
  }
})

// @route   PATCH api/issues/toggle
// @desc    Open/Close this issue
// @access  Private to Admin and OP
router.patch('/toggle', auth, (req, res) => {
  const { issueId, createdBy } = req.body
  const { permissionsLevel, name } = req.user

  if (permissionsLevel >= 2 || createdBy === name) {
    Issue.findById(issueId).then(issue => {
      if (!issue) return res.status(400).json({ msg: 'Issue not found' })

      Issue.findOneAndUpdate(
        { _id: issueId },
        { $set: { active: !issue.active } },
        { returnOriginal: false }
      )
        .then(issue => {
          return res.json(issue)
        })
        .catch(err => res.status(404).json({ success: false }))
    })
  } else {
    return res.status(401).json({ msg: 'Permission Denied' })
  }
})

module.exports = router
