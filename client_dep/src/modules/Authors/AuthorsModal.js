import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { closeModal } from '../../../../client/src/modules/Authors/flux/actions'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none'
  },
  title: {
    fontSize: 14
  },
  description: {
    marginTop: 10,
    marginBottom: 6
  }
})

const AuthorsModal = ({ modal, closeModal }) => {
  const classes = useStyles()
  return (
    <Modal
      open={modal.isOpen}
      onClose={closeModal}
    >
      <Card className={classes.card} variant='outlined'>
        <CardContent>
          <Typography className={classes.title} color='textSecondary' gutterBottom>
            Имя автора
          </Typography>
          <Typography variant='h5' component='h2'>
            {modal.data.name}
          </Typography>
          <Typography className={classes.description} color='textSecondary'>
            Описание
          </Typography>
          <Typography variant='body2' component='p'>
            {modal.data.description}
          </Typography>
          <List>
            <ListItem>
              <ListItemText>lol</ListItemText>
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  modal: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeModal())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorsModal)
