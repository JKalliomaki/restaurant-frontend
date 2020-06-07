import React, {useState, useEffect} from 'react'
import {useLazyQuery, useQuery} from '@apollo/client'
import {
  BrowserRouter as Router,
  Switch, Route, 
} from 'react-router-dom'

import Menu from './components/menu'
import Dashboard from './components/Dashboard'
import {Container, GlobalStyles} from './styles'
import {GET_USER, GET_FOODS} from './queries'

const App = () => {
  const [getUser, userResult] = useLazyQuery(GET_USER)
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const foodResult = useQuery(GET_FOODS, {
    onError: (e) => {
      console.log(e.message)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('restaurantUserToken')
    if(token){
      setToken(token)
      getUser()
    }
  }, []) //eslint-disable-line

  useEffect(() => {
    if(userResult.data){
      setUser(userResult.data.me)
    }
  }, [userResult.data])

  return (
    <Container>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path='/dashboard'>
            <Dashboard 
              user={user} 
              token={token} 
              setToken={setToken}
              foodResult={foodResult}
            />
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