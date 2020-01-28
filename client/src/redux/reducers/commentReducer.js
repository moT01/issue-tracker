import { ADD_COMMENT, GET_COMMENTS } from '../actions/types'

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
    default:
      return state
  }
}
