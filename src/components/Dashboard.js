import React, {useState, useEffect} from 'react'
import {useQuery, useLazyQuery} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'


import AddFoodForm from './AddFoodForm'
import Login from './Login'
import EditMenu from './EditMenu'
import UserInfo from './UserInfo'
import ShowOrders from './ShowOrders'
import AddOrder from './AddOrder'
import {GET_FOODS, GET_USER} from '../queries'


const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('menu')
  const foodResult = useQuery(GET_FOODS)
  const [getUser, userResult] = useLazyQuery(GET_USER)

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
      <button onClick={logout}>Logout</button>
      <div className='navMenuButtons'>
        <button className='navMenuButton' onClick={() => setPage('menu')}>Menu</button>
        <button className='navMenuButton' onClick={() => setPage('addFood')}>Add food</button>
        <button className='navMenuButton' onClick={() => setPage('addOrder')}>Add order</button>
        <button className='navMenuButton' onClick={() => setPage('orders')}>Orders</button>
        <button className='navMenuButton' onClick={() => setPage('userInfo')}>User info</button>
      </div>
      {page === 'menu' && <EditMenu foods={foodResult.data}/>}
      {page === 'addFood' && <AddFoodForm />}
      {page === 'userInfo' && <UserInfo user={user}/>}
      {page === 'orders' && <ShowOrders />}
      {page === 'addOrder' && <AddOrder user={user} foods={foodResult.data}/>}
    </div>
  )
}

export default Dashboard