import axios from 'axios'
import { ADD_COMMENT, GET_COMMENTS } from './types'

export const addCommentAction = (comment, issueId) => dispatch => {
  axios
    .post('/api/comments', { comment: comment, issueId: issueId })
    .then(res => {
      return dispatch({ type: ADD_COMMENT, payload: res.data })
    })
}

export const getCommentsAction = issueId => dispatch => {
  axios.get('/api/comments', { params: { issueId: issueId } }).then(res => {
    return dispatch({ type: GET_COMMENTS, payload: res.data })
  })
}
