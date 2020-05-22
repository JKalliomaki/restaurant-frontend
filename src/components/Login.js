import React, {useEffect} from 'react'
import {useMutation} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'

import {useField} from '../utils/hooks'
import {LOGIN} from '../queries'

// eslint-disable-next-line react/prop-types
const Login = ({setToken}) => {
  const [username, resetUsername] = useField('username')
  const [password, resetPassword] = useField('password')
  const [login, result] = useMutation(LOGIN, {
    onError: (e) => {
      console.log(e)
    }
  })

  useEffect(() => {
    if(result.data){
      const token = result.data.login.value
      localStorage.setItem('restaurantUserToken', token)
      setToken(`bearer ${token}`)
    }
  }, [result.loading]) // eslint-disable-line
  
  const loginFunc = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    resetUsername()
    resetPassword()

    await login({variables: {...credentials}})
  }


  return (
    <div>
      <p>Login to access site</p>

      <form onSubmit={loginFunc}>
        <table>
          <tbody>
            <tr>
              <td>
                Username:
              </td>
              <td>
                <input
                  {...username}
                />
              </td>
            </tr>
            <tr>
              <td>
                Password:
              </td>
              <td>
                <input
                  {...password}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Login</button>
        <ClipLoader 
          size={15}
          loading={result.loading}
        />
      </form>
    </div>
  )
}

export default Login