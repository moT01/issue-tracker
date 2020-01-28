import axios from 'axios'
import { ADD_COMMENT, GET_COMMENTS } from './types'
import { tokenConfig } from './authActions'

export const addCommentAction = (comment, issueId) => (dispatch, getState) => {
  // Request body
  //const body = JSON.stringify({ email, password })
  axios
    .post(
      '/api/comments',
      { comment: comment, issueId: issueId },
      tokenConfig(getState)
    )
    .then(res => {
      return dispatch({ type: ADD_COMMENT, payload: res.data })
    })
}

export const getCommentsAction = issueId => dispatch => {
  // Request body
  const body = JSON.stringify({ issueId })

  axios.get('/api/comments', body).then(res => {
    return dispatch({ type: GET_COMMENTS, payload: res.data })
  })
}
