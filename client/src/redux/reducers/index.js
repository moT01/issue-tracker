import { combineReducers } from 'redux'
import issueReducer from './issueReducer'
import commentReducer from './commentReducer.js'
import authReducer from './authReducer.js'
import errorReducer from './errorReducer.js'

export default combineReducers({
  issues: issueReducer,
  comments: commentReducer,
  auth: authReducer,
  error: errorReducer
})
