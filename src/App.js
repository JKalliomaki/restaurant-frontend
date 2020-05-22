import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, 
} from 'react-router-dom'

import Menu from './components/menu'
import Dashboard from './components/Dashboard'

const App = () => {

  return (
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
  )
}

export default App