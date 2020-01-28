import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, List, Modal } from 'semantic-ui-react'
import { closeModal, openModal } from '../../../flux/actions'

function Info ({ modal, data }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClose () {
    setIsOpen(false)
  }

  function handleOpen () {
    setIsOpen(true)
  }

  return (
    <Modal
      trigger={<a onClick={handleOpen}>{data.name}</a>}
      open={isOpen}
      onClose={handleClose}
      size='small'
    >
      <Modal.Header>Информация о авторе</Modal.Header>
      <Modal.Content scrolling>
        <Header>Имя автора</Header>
        <p>{data.name}</p>
        <Header>Описание</Header>
        <p>{data.description}</p>
        <Header>ID автора</Header>
        <p>{data.author_id}</p>
        <Header>Список написанных книг</Header>
        <List divided verticalAlign='middle'>
          <List.Item>
            <List.Content floated='right'>
              <Button>Просмотр</Button>
            </List.Content>
            <List.Content>Книга</List.Content>
          </List.Item>
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
  handleOpen: (variant) => dispatch(openModal(variant)),
  handleClose: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Info)
