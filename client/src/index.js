import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import theme from './theme'
import { modal } from './flux/reducers'

const appReducer = combineReducers({
  modal
})

const store = createStore(appReducer, devToolsEnhancer())

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)
