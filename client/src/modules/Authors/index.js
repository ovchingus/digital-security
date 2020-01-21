/* global fetch alert */
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import MaterialTable from 'material-table'

import { openModal, closeModal } from '../../flux/actions'
import Modal from './AuthorsModal'

const Authors = ({ modal, openModal }) => {
  const [state, setState] = useState([])

  const getData = async () => {
    const res = await fetch('/api/author')
    const body = await res.json()
    if (body.status !== 'success') {
      alert(body.message)
    }
    setState(body.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    { title: 'Автор', field: 'name' },
    { title: 'Описание', field: 'description' }
  ]

  const onRowAdd = async newData => {
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
    setState(state => [
      ...state,
      newData
    ])
  }

  const onRowUpdate = async (newData, oldData) => {
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
    setState(state => [
      ...state.splice(0, state.indexOf(oldData)),
      newData,
      ...state.splice(state.indexOf(oldData) + 1)
    ])
  }

  const onRowDelete = async (oldData) => {
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
    setState(state => [
      ...state.splice(0, state.indexOf(oldData)),
      ...state.splice(state.indexOf(oldData) + 1)
    ])
  }

  return (
    <>
      <MaterialTable
        title='Авторы'
        columns={columns}
        data={state}
        options={{
          minBodyHeight: '80vh'
        }}
        actions={[
          {
            icon: 'info',
            tooltip: 'Information',
            onClick: (event, rowData) => openModal(rowData)
          }
        ]}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete
        }}
      />
      <Modal />
    </>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  openModal: (data) => dispatch(openModal(data)),
  closeModal: () => dispatch(closeModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Authors)
