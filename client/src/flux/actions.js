/* global fetch alert */
/**
 * Actions
 */
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = (data) => ({
  type: OPEN_MODAL,
  data
})

export const closeModal = () => ({
  type: CLOSE_MODAL
})

export const GET_AUTHORS = 'GET_AUTHORS'
export const UPDATE_AUTHOR = 'UPDATE_AUTHOR'
export const DELETE_AUTHOR = 'DELETE_AUTHOR'
export const CREATE_AUTHOR = 'CREATE_AUTHOR'

const _getAuthors = (data) => ({
  type: GET_AUTHORS,
  data
})

export const getAuthors = (data) => async (dispatch) => {
  const res = await fetch('/api/author')
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  dispatch(_getAuthors(body.data))
}
