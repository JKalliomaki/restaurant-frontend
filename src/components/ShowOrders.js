import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'


import {GET_ORDERS, REMOVE_ORDER} from '../queries'

const ShowOrders = () => {
  const {loading, data} = useQuery(GET_ORDERS)
  const [removeOrder] = useMutation(REMOVE_ORDER, {
    refetchQueries: [{query: GET_ORDERS}],
    onError: (e) => console.log(e.message)
  })

  const removeButton = async event => {
    event.preventDefault()
    const orderId = event.target.id
    console.log(orderId)
    if (window.confirm('Are you sure?')){
      removeOrder({variables: {id: orderId}})
    }
  }

  if (loading){
    return <ClipLoader />
  }
  return (
    <div>

      <h3>Orders</h3>
      {data.allOrders.map(order => (
        <div key={order.tableNr}>table Nr: {order.tableNr}
          <div>waiter: {order.waiter.username}</div>
          <ul>
            {order.items.map(item => <li key={item}>{item}</li>)}
          </ul>
          <button id={order.id} onClick={removeButton}>Remove order</button>
        </div>
      ))}
    </div>
  )
}

export default ShowOrders