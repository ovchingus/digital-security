import {
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_AUTHORS,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR
} from './actions'

const initialStateModal = {
  isOpen: false,
  data: {}
}

export const modal = (state = initialStateModal, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return ({
        ...state,
        isOpen: true,
        data: {
          ...state.data,
          ...action.data
        }
      })
    case CLOSE_MODAL:
      return ({
        ...state,
        isOpen: false
      })
    default:
      return state
  }
}

export const authors = (state = [], action) => {
  switch (action.type) {
    case GET_AUTHORS:
      return [
        ...action.data
      ]
    default:
      return state
  }
}
