import React, { useState } from 'react'
import { Button, Header, Icon, Modal, Rating } from 'semantic-ui-react'

function Info ({ modal, book }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
  }

  function handleAuthorRedirect () {
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

// const mapStateToProps = (state) => ({
//   modal: state.modal
// })

// const mapDispatchToProps = (dispatch) => ({
//   handleOpen: (variant) => dispatch(openModal(variant)),
//   handleClose: () => dispatch(closeModal())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Info)
export default Info
