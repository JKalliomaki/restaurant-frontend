import React from 'react'

import CreateUserForm from './CreateUserForm'


/* Role meanings:
* 5: owner
* 4: co-owner
* 3: chef
* 2: waiter
* 1: customer
*/
const USER_ROLES = {
  5: 'owner',
  4: 'co-owner',
  3: 'chef',
  2: 'waiter',
  1: 'customer',
}

const UserInfo = ({user}) => {
  const role = USER_ROLES[user.role]
  return (
    <div>
      <div>
        <h3>Hello {user.username}</h3>
        <p>role: {role}</p>
      </div>
      {role === 'owner' && <CreateUserForm /> }
    </div>
  )
}

export default UserInfo