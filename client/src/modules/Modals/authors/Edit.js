import React, { useState, memo } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { updateAuthor } from '../../../flux/actions'

export function isEqualsProps (prevProps, nextProps) {
  return true
}

const Edit = ({ text, updateAuthor, oldData }) => {
  const initialState = {
    ...oldData
  }

  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(initialState)

  function handleChange (e, { value, name }) {
    setState({
      ...state,
      [name]: value
    })
  }

  function handleSubmit () {
    updateAuthor(oldData, state)
    setIsOpen(false)
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
        <Button icon='edit' alt='Редактировать' onClick={handleOpen} />
      }
      name='editAuthor'
    >
      <Modal.Header>Изменение автора</Modal.Header>
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
              content='Изменить'
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
  updateAuthor: (oldData, newData) => dispatch(updateAuthor(oldData, newData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(Edit, isEqualsProps))
