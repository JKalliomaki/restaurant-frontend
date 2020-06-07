import React, {useState, useEffect} from 'react'
import {useQuery, useLazyQuery} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'

import {
  TopBar,
  DashboardPage,
  NavButtons,
  NavButton,
  LogoutButton,
} from '../styles'


import AddFoodForm from './AddFoodForm'
import Login from './Login'
import EditMenu from './EditMenu'
import UserInfo from './UserInfo'
import ShowOrders from './ShowOrders'
import AddOrder from './AddOrder'
import {GET_FOODS, GET_USER} from '../queries'


const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('menu')
  const foodResult = useQuery(GET_FOODS)
  const [getUser, userResult] = useLazyQuery(GET_USER)
  const [user, setUser] = useState(null)

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

  const logout = (event) => {
    event.preventDefault()
    localStorage.clear()
    setToken(null)
  }


  if (!token){
    return <Login setToken={setToken} />
  }

  if (foodResult.loading){
    return <ClipLoader />
  }
  return (
    <div>
      <TopBar>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </TopBar>
      <DashboardPage>

        <NavButtons >
          <NavButton onClick={() => setPage('menu')}>Menu</NavButton>
          <NavButton onClick={() => setPage('addFood')}>Add food</NavButton>
          <NavButton onClick={() => setPage('addOrder')}>Add order</NavButton>
          <NavButton onClick={() => setPage('orders')}>Orders</NavButton>
          <NavButton onClick={() => setPage('userInfo')}>User info</NavButton>
        </NavButtons>

        {page === 'menu' && <EditMenu foods={foodResult.data}/>}
        {page === 'addFood' && <AddFoodForm />}
        {page === 'userInfo' && <UserInfo user={user}/>}
        {page === 'orders' && <ShowOrders />}
        {page === 'addOrder' && <AddOrder user={user} foods={foodResult.data}/>}

      </DashboardPage>
    </div>
  )
}

export default Dashboard