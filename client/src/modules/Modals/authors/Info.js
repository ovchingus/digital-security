import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, List, Modal } from 'semantic-ui-react'
import { getAuthorBooks } from '../../../flux/actions'

function Info ({ modal, author, getAuthorBooks }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
    getAuthorBooks(author)
  }

  return (
    <Modal
      trigger={<Button icon='info' onClick={handleOpen} />}
      open={isOpen}
      onClose={handleClose}
      size='small'
    >
      <Modal.Header>Информация о авторе</Modal.Header>
      <Modal.Content scrolling>
        <Header>Имя автора</Header>
        <p>{author.name}</p>
        <Header>Описание</Header>
        <p>{author.description}</p>
        <Header>ID автора</Header>
        <p>{author.author_id}</p>
        <Header>Список написанных книг</Header>
        <List divided verticalAlign='middle'>
          {modal.books.map(book => (
            <List.Item key={book.book_id}>
              <List.Content floated='right'>
                <Button>Просмотр</Button>
              </List.Content>
              <List.Content>{book.title}</List.Content>
            </List.Item>
          ))}
        </List>
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
  modal: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  getAuthorBooks: (author) => dispatch(getAuthorBooks(author))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info)
