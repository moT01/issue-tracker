import axios from 'axios'
import { CREATE_ISSUE, GET_ISSUES } from './types'
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
