import {
  CHANGE_TAB,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_AUTHORS,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR
} from './actions'

export function tab (state = 0, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return action.tab
    default:
      return state
  }
}

const initialStateModal = {
  isOpen: false,
  variant: null
}

export function modal (state = initialStateModal, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return ({
        ...state,
        isOpen: true,
        variant: action.variant
      })
    case CLOSE_MODAL:
      return ({
        ...state,
        isOpen: false,
        variant: null
      })
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
