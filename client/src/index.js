import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css'
import App from './App'
import { tab, authors, modal } from './flux/reducers'

const appReducer = combineReducers({
  tab,
  authors,
  modal
})

const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

// TODO: Switch to https://github.com/palmerhq/the-platform#stylesheet when it will be stable
const styleLink = document.createElement('link')
styleLink.rel = 'stylesheet'
styleLink.href = 'https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css'
document.head.appendChild(styleLink)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
