import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Tab } from 'semantic-ui-react'
import { changeTab, getAuthors, getBooks } from './flux/actions'
import Authors from './modules/Authors'
import Books from './modules/Books'

const panes = [
  {
    menuItem: 'Книги',
    render: () => (
      <Tab.Pane attached={false}>
        <Books />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Авторы',
    render: () => (
      <Tab.Pane attached={false}>
        <Authors />
      </Tab.Pane>
    )
  }
]

function App ({ currentTab, changeTab, getAuthors, getBooks }) {
  useEffect(() => {
    getAuthors()
    getBooks()
  }, [])

  function handleTabChange (e, { activeIndex }) {
    changeTab(activeIndex)
  }

  return (
    <Container style={{ margin: 20 }}>
      <Tab
        panes={panes}
        menu={{
          attached: false,
          tabular: false
        }}
        activeIndex={currentTab}
        onTabChange={handleTabChange}
      />
    </Container>
  )
}

const mapStateToProps = state => ({
  currentTab: state.tab
})

const mapDispatchToProps = dispatch => ({
  changeTab: tab => dispatch(changeTab(tab)),
  getAuthors: () => dispatch(getAuthors()),
  getBooks: () => dispatch(getBooks())
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
