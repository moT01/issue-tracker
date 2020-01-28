const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  comments: {
    type: Array
  },
  createdBy: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  title: {
    type: Date,
    default: Date.now
  }
})

module.exports = Project = mongoose.model('project', ProjectSchema)
