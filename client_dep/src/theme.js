import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    secondary: {
      main: '#f5e022'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#fff'
    }
  }
})

export default theme
