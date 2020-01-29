import axios from 'axios'
import { CREATE_ISSUE, GET_ISSUES, EDIT_ISSUE } from './types'
import { returnErrorsAction } from './errorActions'
import { tokenConfig } from './authActions'

export const createIssueAction = issue => (dispatch, getState) => {
  axios
    .post('/api/issues', issue, tokenConfig(getState))
    .then(res => {
      return dispatch({ type: CREATE_ISSUE, payload: res.data })
    })
    .catch(err =>
      dispatch(returnErrorsAction(err.response.data, err.response.status))
    )
}

export const getIssuesAction = () => dispatch => {
  axios.get('/api/issues').then(res => {
    return dispatch({ type: GET_ISSUES, payload: res.data })
  })
}

export const editIssueAction = ({ title, description, issueId, createdBy }) => (
  dispatch,
  getState
) => {
  axios
    .patch(
      '/api/issues',
      { title, description, issueId, createdBy },
      tokenConfig(getState)
    )
    .then(res => {
      console.log('patch.then res')
      console.log(res)
      return dispatch({ type: EDIT_ISSUE, payload: res.data })
    })
}

export const toggleIssueAction = (issueId, createdBy) => (
  dispatch,
  getState
) => {
  console.log(issueId)
  console.log(createdBy)
  axios
    .patch('/api/issues/toggle', { issueId, createdBy }, tokenConfig(getState))
    .then(res => {
      return dispatch({ type: EDIT_ISSUE, payload: res.data })
    })
}
