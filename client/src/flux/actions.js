/* global fetch alert */
/**
 * Actions
 */
export const CHANGE_TAB = 'CHANGE_TAB'

export const changeTab = tab => ({
  type: CHANGE_TAB,
  tab
})

export const GET_AUTHOR_BOOKS = 'GET_AUTHOR_BOOKS'

const _getAuthorBooks = (author, books) => ({
  type: GET_AUTHOR_BOOKS,
  author,
  books
})

// TODO: нужен метод api для получения книг по автору
export const getAuthorBooks = (author) => async (dispatch) => {
  const res = await fetch('/api/book')
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  if (body.message === 'No Book found') {
    dispatch(_getAuthorBooks(author, []))
  } else {
    const books = body.data.filter(
      book => book.author_id === author.author_id
    )
    dispatch(_getAuthorBooks(author, books))
  }
}

/**
 * Author actions && thunks
 */

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

const _updateAuthor = (oldData, newData) => ({
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
  if (body.message === 'No Author found') {
    dispatch(_getAuthors([]))
  } else {
    dispatch(_getAuthors(body.data))
  }
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

export const updateAuthor = (oldData, newData) => async dispatch => {
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
  dispatch(_updateAuthor(oldData, newData))
}

/**
 * Book actions && thunks
 */

export const GET_BOOKS = 'GET_BOOKS'
export const UPDATE_BOOK = 'UPDATE_BOOK'
export const DELETE_BOOK = 'DELETE_BOOK'
export const CREATE_BOOK = 'CREATE_BOOK'

const _getBooks = (data) => ({
  type: GET_BOOKS,
  data
})

const _createBook = data => ({
  type: CREATE_BOOK,
  data
})

const _deleteBook = data => ({
  type: DELETE_BOOK,
  data
})

const _updateBook = (oldData, newData) => ({
  type: UPDATE_BOOK,
  newData,
  oldData
})

export const getBooks = () => async (dispatch) => {
  const res = await fetch('/api/book')
  const body = await res.json()
  if (body.status !== 'success') {
    alert(body.message)
  }
  if (body.message === 'No Book found') {
    dispatch(_getBooks([]))
  } else {
    dispatch(_getBooks(body.data))
  }
}

export const createBook = (newData) => async dispatch => {
  const res = await fetch('/api/book', {
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
  // Нужно получить книгу вместе с информацией об авторах
  const newReq = await fetch(`/api/book/${body.data.book_id}`)
  const newBody = await newReq.json()
  if (newBody.status !== 'success') {
    alert(newBody.message)
  }
  dispatch(_createBook(newBody.data))
}

export const deleteBook = (oldData) => async dispatch => {
  const res = await fetch(
    `/api/book/${oldData.book_id}`,
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
  dispatch(_deleteBook(oldData))
}

export const updateBook = (oldData, newData) => async dispatch => {
  const res = await fetch(
    `/api/book/${newData.book_id}`,
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
  dispatch(_updateBook(oldData, newData))
}
