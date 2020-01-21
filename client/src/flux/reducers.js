import {
  OPEN_MODAL,
  CLOSE_MODAL
} from './actions'

const initialState = {
  isOpen: false,
  data: {}
}

export const modal = (state = initialState, action) => {
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
