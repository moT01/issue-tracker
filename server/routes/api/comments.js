const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Comment = require('../../models/Comment')

// @route   GET api/comments
// @desc    Get comments for this issue
// @access  Public
router.get('/', (req, res) => {
  const { issueId } = req.query

  Comment.find({ issueId: { $eq: issueId } }).then(comments => {
    return res.json(comments)
  })
})

// @route   POST api/comments
// @desc    Add a new comment on this issue
// @access  Private to anyone authenticated
router.post('/', auth, (req, res) => {
  const { content, issueId } = req.body
  const { name } = req.user

  if (!content) {
    return res.status(400).json({ msg: 'Please enter a comment' })
  }

  if (!issueId) {
    return res.status(400).json({ msg: 'This issue does not exist' })
  }

  const newComment = new Comment({
    content: content,
    issueId: issueId,
    createdBy: name
  })

  newComment.save().then(comment => res.json(comment))
})

// @route   PATCH api/comments
// @desc    Edit this comment
// @access  Private to Admin and OP
router.patch('/', auth, (req, res) => {
  const { permissionsLevel, name } = req.user
  const { content, commentId, createdBy } = req.body

  if (permissionsLevel >= 2 || createdBy === name) {
    Comment.findOneAndUpdate(
      { _id: commentId },
      { $set: { content: content } },
      { returnOriginal: false }
    )
      .then(comment => {
        return res.json(comment)
      })
      .catch(err => res.status(404).json({ success: false }))
  } else {
    return res.status(401).json({ msg: 'Permission Denied' })
  }
})

// @route   DELETE api/comments
// @desc    Delete a comment on this issue
// @access  Private to OP or Admin
/*router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})*/

module.exports = router
