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
  const { comment, issueId } = req.body
  const { name } = req.user

  if (!comment) {
    return res.status(400).json({ msg: 'Please enter a comment' })
  }

  if (!issueId) {
    return res.status(400).json({ msg: 'This issue does not exist' })
  }

  const newComment = new Comment({
    comment: comment,
    issueId: issueId,
    createdBy: name
  })

  newComment.save().then(comment => res.json(comment))
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
