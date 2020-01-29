import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { updateAuthor } from '../../../flux/actions'

const Edit = ({ text, updateAuthor, oldData }) => {
  const [isOpen, setIsOpen] = useState(false)

  const [state, setState] = useState({
    ...oldData,
    name: oldData ? oldData.name : '',
    description: oldData ? oldData.description : ''
  })

  function handleChange (e, { value, name }) {
    setState({
      ...state,
      [name]: value
    })
  }

  function handleSubmit () {
    updateAuthor(state, oldData)
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
        <Button icon='edit' alt='Редактировать' onClick={handleOpen}>
          {text}
        </Button>
      }
      name='editAuthor'
    >
      <Modal.Header>Изменение автора</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <label>Имя</label>
              <Form.Input
                placeholder='Имя'
                name='name'
                value={state.name}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Описание</label>
              <Form.Input
                placeholder='Описание'
                name='description'
                value={state.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Button
              type='submit'
              onClick={handleSubmit}
            >Изменить
            </Button>
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
  updateAuthor: (newData, oldData) => dispatch(updateAuthor(newData, oldData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Edit)
