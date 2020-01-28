import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import theme from './theme'
import { tab, modal, authors } from '../../client/src/modules/Authors/flux/reducers'

const appReducer = combineReducers({
  tab,
  modal,
  authors
})

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
