import { GET_ERRORS, CLEAR_ERRORS } from './types'

export const returnErrorsAction = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

export const clearErrorsAction = () => {
  return {
    type: CLEAR_ERRORS
  }
}
