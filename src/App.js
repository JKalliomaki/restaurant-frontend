import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, 
} from 'react-router-dom'

import Menu from './components/menu'
import Dashboard from './components/Dashboard'
import {Container, GlobalStyles} from './styles'

const App = () => {

  return (
    <Container>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/'>
            <div>
              <Menu />
            </div>
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}

export default App