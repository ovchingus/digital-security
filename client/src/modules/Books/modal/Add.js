import React, { useState, useMemo } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import { createBook } from '../../../flux/actions'

const ratingOptions = [
  { key: 0, value: 1, text: '1' },
  { key: 1, value: 2, text: '2' },
  { key: 2, value: 3, text: '3' },
  { key: 3, value: 4, text: '4' },
  { key: 4, value: 5, text: '5' }
]

const genreOptions = [
  { key: 0, value: 'thriller', text: 'Триллер' },
  { key: 1, value: 'novell', text: 'Новелла' },
  { key: 2, value: 'romance', text: 'Роман' },
  { key: 3, value: 'history', text: 'История' },
  { key: 4, value: 'biography', text: 'Биография' },
  { key: 5, value: 'another', text: 'Другой' }
]

const Add = ({ text, trigger, createBook, closeModal, authors, ...props }) => {
  const initialState = {
    title: '',
    description: '',
    genre: null,
    rating: null,
    author_id: null
  }

  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(initialState)

  const authorOptions = useMemo(
    () =>
      authors.map((author, ind) => ({
        key: ind,
        value: author.author_id,
        text: author.name
      })),
    [authors]
  )

  function handleChange (e, { value, name }) {
    setState({
      ...state,
      [name]: value
    })
  }

  function handleSubmit () {
    createBook(state)
    setIsOpen(false)
    setState(initialState)
  }

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      trigger={
        <Button floated='right' primary size='small' onClick={handleOpen}>
          Добавить книгу
        </Button>
      }
    >
      <Modal.Header>Добавление автора</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
              <Form.Input
                label='Название книги'
                placeholder='Название'
                name='title'
                value={state.name}
                onChange={handleChange}
              />
              <Form.Select
                name='author_id'
                options={authorOptions}
                label='Автор'
                placeholder='Выберите автора'
                value={state.author_id}
                onChange={handleChange}
                selection
              />
            </Form.Group>
            <Form.Field
              control={TextArea}
              placeholder='Описание'
              label='Описание'
              name='description'
              value={state.description}
              onChange={handleChange}
            />
            <Form.Group widths='equal'>
              <Form.Select
                name='rating'
                options={ratingOptions}
                label='Рейтинг'
                placeholder='Выберите рейтинг'
                value={state.rating}
                onChange={handleChange}
                selection
              />
              <Form.Select
                name='genre'
                options={genreOptions}
                label='Жанр'
                placeholder='Выберите жанр'
                value={state.genre}
                onChange={handleChange}
                selection
              />
            </Form.Group>
            <Form.Button content='Добавить' />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = state => ({
  modal: state.modal,
  authors: state.authors
})

const mapDispatchToProps = dispatch => ({
  createBook: book => dispatch(createBook(book))
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
