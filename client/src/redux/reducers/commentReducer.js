import { ADD_COMMENT, GET_COMMENTS, EDIT_COMMENT } from '../actions/types'

const initialState = {
  comments: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload]
      }
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      }
    case EDIT_COMMENT:
      const index = state.comments.findIndex(
        comment => comment._id === action.payload._id
      )

      let tempComments = state.comments.slice()
      tempComments.splice(index, 1, action.payload)

      return {
        comments: tempComments
      }
    default:
      return state
  }
}
