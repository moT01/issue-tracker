const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Permissions Levels...
 *
 * 3: Owner  - Can promote/demote users
 *
 * 2: Admin  - Can create/archive/edit projects
 *           - Can edit/delete any comment
 *           - Can edit/close any issue
 *
 * 1: Member - Default on account creation
 *           - Can create issues/comments
 *           - Can edit/delete their own comments
 *           - Can edit/close their own issues
 *
 * 0: Guest  - Can only view projects/issues/comments
 */

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  registeredOn: {
    type: Date,
    default: Date.now
  },
  permissionsLevel: {
    type: Number,
    required: true,
    default: 1
  }
})

module.exports = User = mongoose.model('user', UserSchema)
