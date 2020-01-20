/* global fetch alert */
import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

const useModalStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
    outline: 'none'
  }
}))

const Authors = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const classes = useModalStyles()

  const handleOpen = (data) => {
    setIsModalOpen(true)
    setModalData(data)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setModalData({})
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
            tooltip: 'Save User',
            onClick: (event, rowData) => handleOpen(rowData)
          }
        ]}
        editable={{
          onRowAdd,
          onRowUpdate,
          onRowDelete
        }}
      />
      <Modal
        open={isModalOpen}
        onClose={handleClose}
      >
        <div className={classes.paper}>{modalData.name}</div>
      </Modal>
    </>
  )
}

export default Authors
