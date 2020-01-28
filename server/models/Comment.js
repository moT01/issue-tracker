const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  issueId: {
    type: String,
    required: true
  }
})

module.exports = Comment = mongoose.model('comment', CommentSchema)
