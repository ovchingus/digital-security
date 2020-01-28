import React, { useState } from 'react'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Authors from './modules/Authors'
import Books from './modules/Books'
import { changeTab } from '../../client/src/modules/Authors/flux/actions.js.js.js'

const TabPanel = ({ children, value, index }) =>
  value === index && <div>{children}</div>

const App = ({ currentTab, changeTab }) => {
  const handleChange = (event, newValue) => {
    changeTab(newValue)
  }

  return (
    <>
      <AppBar position='static'>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          centered
        >
          <Tab label='Книги' />
          <Tab label='Авторы' />
        </Tabs>
      </AppBar>
      <TabPanel value={currentTab} index={0}>
        <Books />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Authors />
      </TabPanel>
    </>
  )
}

const mapStateToProps = (state) => ({
  currentTab: state.tab
})

const mapDispatchToProps = (dispatch) => ({
  changeTab: (newTab) => dispatch(changeTab(newTab))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
