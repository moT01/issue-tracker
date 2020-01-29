import axios from 'axios'
import { ADD_COMMENT, GET_COMMENTS, EDIT_COMMENT } from './types'
import { tokenConfig } from './authActions'

export const addCommentAction = (content, issueId) => (dispatch, getState) => {
  axios
    .post('/api/comments', { content, issueId }, tokenConfig(getState))
    .then(res => {
      return dispatch({ type: ADD_COMMENT, payload: res.data })
    })
}

export const getCommentsAction = issueId => dispatch => {
  axios.get('/api/comments', { params: { issueId: issueId } }).then(res => {
    return dispatch({ type: GET_COMMENTS, payload: res.data })
  })
}

export const editCommentAction = ({ content, commentId, createdBy }) => (
  dispatch,
  getState
) => {
  axios
    .patch(
      '/api/comments',
      { content, commentId, createdBy },
      tokenConfig(getState)
    )
    .then(res => {
      return dispatch({ type: EDIT_COMMENT, payload: res.data })
    })
}
