const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  createdBy: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
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
