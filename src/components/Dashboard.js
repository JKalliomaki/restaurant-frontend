import React, {useState, useEffect} from 'react'
import AddFoodForm from './AddFoodForm'
import Login from './Login'
import Menu from './menu'


const Dashboard = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('menu')

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

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div className='menuButtons'>
        <button className='menuButton' onClick={() => setPage('addFood')}>Add food</button>
        <button className='menuButton' onClick={() => setPage('menu')}>Menu</button>
      </div>
      {page === 'menu' && <Menu />}
      {page === 'addFood' && <AddFoodForm />}
    </div>
  )
}

export default Dashboard