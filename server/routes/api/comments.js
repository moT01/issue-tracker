const express = require('express')
const router = express.Router()

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
// @access  Private
router.post('/', (req, res) => {
  const { comment, issueId } = req.body

  const newComment = new Comment({
    comment: comment,
    issueId: issueId
  })

  newComment.save().then(comment => res.json(comment))
})

/*router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})*/

module.exports = router
