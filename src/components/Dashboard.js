import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'


import AddFoodForm from './AddFoodForm'
import Login from './Login'
import EditMenu from './EditMenu'
import {GET_FOODS} from '../queries'


const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('menu')
  const foodResult = useQuery(GET_FOODS)

  useEffect(() => {
    const token = localStorage.getItem('restaurantUserToken')
    if(token){
      setToken(token)
    }
  }, [])

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
      <div className='menuButtons'>
        <button className='menuButton' onClick={() => setPage('menu')}>Menu</button>
        <button className='menuButton' onClick={() => setPage('addFood')}>Add food</button>
      </div>
      {page === 'menu' && <EditMenu foods={foodResult.data}/>}
      {page === 'addFood' && <AddFoodForm />}
    </div>
  )
}

export default Dashboard