import React from 'react'
import { connect } from 'react-redux'
import { Container, Tab } from 'semantic-ui-react'
import { changeTab } from './flux/actions'
import Authors from './modules/Authors/index'

const panes = [
  {
    menuItem: 'Книги',
    render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>
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

function App ({ currentTab, changeTab }) {
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
  changeTab: tab => dispatch(changeTab(tab))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
