import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal, Rating } from 'semantic-ui-react'
import { changeTab, changeSearchQuery } from '../../../flux/actions'

function Info ({ modal, book, moveToAuthorsTab, setAuthorsSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
  }

  function handleAuthorRedirect () {
    setIsOpen(false)
    moveToAuthorsTab()
    setAuthorsSearchQuery(book.author.name)
  }

  return (
    <Modal
      trigger={<Button icon='info' onClick={handleOpen} />}
      open={isOpen}
      onClose={handleClose}
      size='small'
    >
      <Modal.Header>Информация о книге</Modal.Header>
      <Modal.Content scrolling>
        <Header>Название</Header>
        <p>{book.title}</p>
        <Header>Автор</Header>
        <p>{book.author.name}</p>
        <Button onClick={handleAuthorRedirect}>Подробнее</Button>
        <Header>Описание</Header>
        <p>{book.description}</p>
        <Header>Жанр</Header>
        <p>{book.genre}</p>
        <Header>Рейтинг</Header>
        <Rating
          disabled
          icon='star'
          rating={book.rating}
          maxRating={5}
        />
        <Header>ID книги</Header>
        <p>{book.book_id}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={handleClose} inverted>
          <Icon name='close' />
          Закрыть
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  tab: state.tabs.tab
})

const mapDispatchToProps = (dispatch) => ({
  moveToAuthorsTab: () => dispatch(changeTab(1)),
  setAuthorsSearchQuery: (query) => dispatch(changeSearchQuery(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)
