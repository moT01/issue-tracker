const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  },
  creatorId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  }
})

module.exports = Issue = mongoose.model('issue', IssueSchema)
