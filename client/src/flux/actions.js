/* global fetch alert */
/**
 * Actions
 */
export const CHANGE_TAB = 'CHANGE_TAB'

export const changeTab = (tab) => ({
  type: CHANGE_TAB,
  tab
})

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = (variant) => ({
  type: OPEN_MODAL,
  variant
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

const _createAuthor = data => ({
  type: CREATE_AUTHOR,
  data
})

const _deleteAuthor = data => ({
  type: DELETE_AUTHOR,
  data
})

const _updateAuthor = (newData, oldData) => ({
  type: UPDATE_AUTHOR,
  newData,
  oldData
})

export const getAuthors = () => async (dispatch) => {
  const res = await fetch('/api/author')
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  dispatch(_getAuthors(body.data || []))
}

export const createAuthor = (newData) => async dispatch => {
  const res = await fetch('/api/author', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newData)
  })
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  dispatch(_createAuthor(body.data))
}

export const deleteAuthor = (oldData) => async dispatch => {
  const res = await fetch(
    `/api/author/${oldData.author_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  dispatch(_deleteAuthor(oldData))
}

export const updateAuthor = (newData, oldData) => async dispatch => {
  const res = await fetch(
    `/api/author/${newData.author_id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  dispatch(_updateAuthor(newData, oldData))
}
