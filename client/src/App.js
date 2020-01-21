import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Authors from './modules/Authors'
import Books from './modules/Books'

const TabPanel = ({ children, value, index }) =>
  value === index && <div>{children}</div>

const App = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue)
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

export default App
