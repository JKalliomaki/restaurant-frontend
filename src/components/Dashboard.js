import React, {useState} from 'react'
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


const Dashboard = ({user, token, setToken, foodResult}) => {
  const [page, setPage] = useState('menu')
  

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