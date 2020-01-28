import { CREATE_ISSUE, GET_ISSUES } from '../actions/types'

const initialState = {
  issues: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_ISSUE:
      return {
        ...state,
        issues: [action.payload, ...state.issues]
      }
    case GET_ISSUES:
      return {
        ...state,
        issues: action.payload
      }
    default:
      return state
  }
}
