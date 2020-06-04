import React, { useState } from 'react'
import {useMutation} from '@apollo/client'
import Select from 'react-dropdown-select'


import {CREATE_USER} from '../queries'
import {useField} from '../utils/hooks'

const ROLE_OPTIONS = [
  {
    value: 5,
    label: 'owner'
  },
  {
    value: 4,
    label: 'co-owner'
  },
  {
    value: 3,
    label: 'chef'
  },
  {
    value: 2,
    label: 'waiter'
  }
]

const CreateUserForm = () => {
  const [username, resetUsername] = useField('username')
  const [password, resetPassword] = useField('password')
  const [role, setRole] = useState([])
  const [addUser] = useMutation(CREATE_USER, {
    onError: e => console.log(e.message)
  })

  const newUser = (event) => {
    event.preventDefault()
    const userToAdd = {
      username: username.value,
      password: password.value,
      role: role.value
    }
    resetUsername()
    resetPassword()
    setRole([])
    addUser({variables: {...userToAdd}})
    window.alert(`Added account for ${role.label} ${username.value}`)
  }

  return (
    <div>
      <h3>Create user</h3>
      <form onSubmit={newUser}>
        <table>
          <tbody>
            <tr>
              <td>
                username: 
              </td>
              <td>
                <input
                  {...username}
                />
              </td>
            </tr>
            <tr>
              <td>
                password: 
              </td>
              <td>
                <input
                  {...password}
                />
              </td>
            </tr>
            <tr>
              <td>
                role: 
              </td>
              <td>
                <Select
                  values={[]}
                  options={ROLE_OPTIONS}
                  onChange={(value) => setRole(value[0])}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Add account</button>
      </form>
    </div>
  )
}

export default CreateUserForm