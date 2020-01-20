import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles(theme => ({
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

const AuthorModal = ({ children, ...props }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <ButtonBase onClick={handleOpen} {...props}>
        {children}
      </ButtonBase>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>djaiw</div>
      </Modal>
    </>
  )
}

export default AuthorModal
