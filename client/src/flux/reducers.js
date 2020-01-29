import {
  CHANGE_TAB,
  GET_AUTHORS,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from './actions'

export function tab (state = 0, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return action.tab
    default:
      return state
  }
}

export function authors (state = [], action) {
  switch (action.type) {
    case GET_AUTHORS:
      return [
        ...action.data
      ]
    case CREATE_AUTHOR:
      return [
        ...state,
        action.data
      ]
    case DELETE_AUTHOR:
      return [
        ...state.splice(0, state.indexOf(action.data)),
        ...state.splice(state.indexOf(action.data) + 1)
      ]
    case UPDATE_AUTHOR:
      return [
        ...state.splice(0, state.indexOf(action.oldData)),
        action.newData,
        ...state.splice(state.indexOf(action.oldData) + 1)
      ]
    default:
      return state
  }
}

export function books (state = [], action) {
  switch (action.type) {
    case GET_BOOKS:
      return [
        ...action.data
      ]
    case CREATE_BOOK:
      return [
        ...state,
        action.data
      ]
    case DELETE_BOOK:
      return [
        ...state.splice(0, state.indexOf(action.data)),
        ...state.splice(state.indexOf(action.data) + 1)
      ]
    case UPDATE_BOOK:
      return [
        ...state.splice(0, state.indexOf(action.oldData)),
        action.newData,
        ...state.splice(state.indexOf(action.oldData) + 1)
      ]
    default:
      return state
  }
}
