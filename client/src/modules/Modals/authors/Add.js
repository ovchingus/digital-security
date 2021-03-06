import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { createAuthor } from '../../../flux/actions'

const Add = ({ text, createAuthor, closeModal, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState({
    name: '',
    description: ''
  })

  function handleChange (e, { value, name }) {
    setState({
      ...state,
      [name]: value
    })
  }

  function handleSubmit () {
    createAuthor(state)
    setIsOpen(false)
    setState({
      name: '',
      description: ''
    })
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
          Добавить автора
        </Button>
      }
    >
      <Modal.Header>Добавление автора</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              placeholder='Имя'
              label='Имя'
              name='name'
              value={state.name}
              onChange={handleChange}
            />
            <Form.Input
              placeholder='Описание'
              label='Описание'
              name='description'
              value={state.description}
              onChange={handleChange}
            />
            <Form.Button
              content='Добавить'
            />
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const mapStateToProps = state => ({
  modal: state.modal
})

const mapDispatchToProps = dispatch => ({
  createAuthor: author => dispatch(createAuthor(author))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add)
