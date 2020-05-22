import React, {useState} from 'react'
import AddFoodForm from './AddFoodForm'
import Login from './Login'


const Dashboard = () => {
  const [token, setToken] = useState(null)



  if (!token){
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <AddFoodForm />
    </div>
  )
}

export default Dashboard