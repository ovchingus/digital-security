import {
  CHANGE_TAB,
  CHANGE_SEARCH_QUERY,
  CHANGE_PAGE,
  GET_AUTHOR_BOOKS,
  CLEAR_AUTHOR_BOOKS,
  GET_AUTHORS,
  CREATE_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from './actions'

const initialStateTabs = {
  tab: 0,
  page: 1,
  searchQuery: ''
}

export function tabs (state = initialStateTabs, action) {
  switch (action.type) {
    case CHANGE_TAB:
      return {
        ...state,
        tab: action.tab,
        searchQuery: ''
      }
    case CHANGE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      }
    case CHANGE_PAGE:
      return {
        ...state,
        page: action.page
      }
    default:
      return state
  }
}

const initialStateModal = {
  author: null,
  books: []
}

export function modal (state = initialStateModal, action) {
  switch (action.type) {
    case GET_AUTHOR_BOOKS:
      return {
        author: action.author,
        books: [
          ...action.books
        ]
      }
    case CLEAR_AUTHOR_BOOKS:
      return initialStateModal
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
