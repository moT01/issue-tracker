import { CREATE_ISSUE, GET_ISSUES, EDIT_ISSUE } from '../actions/types'

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
    case EDIT_ISSUE:
      const index = state.issues.findIndex(
        issue => issue._id === action.payload._id
      )

      let tempIssues = state.issues.slice()
      tempIssues.splice(index, 1, action.payload)

      return {
        issues: tempIssues
      }
    default:
      return state
  }
}
