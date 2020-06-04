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

  const orderStyle = {
    border: '1px solid',
    borderColor: '#ccc',
    borderRadius: 12,
    margin: 5,
    padding: 5,
  }

  const ordersMapFunc = (order) => {
    let orderItems = []
    order.items.forEach(food => {
      if (orderItems.map(order => order.name).includes(food)){
        orderItems = orderItems.map(item => item.name === food ? {name: food, amount: item.amount + 1} : item)
      } else {
        orderItems = orderItems.concat({name: food, amount: 1})
      }
    })
    
    return (
      <div style={orderStyle} key={order.tableNr}>
        table Nr: {order.tableNr}
        <div>waiter: {order.waiter.username}</div>
        <ul>
          {orderItems.map(item => <li key={item.name}>{item.amount}x {item.name}</li>)}
        </ul>
        <button id={order.id} onClick={removeButton}>Remove order</button>
      </div>
    )
  }

  const removeButton = async event => {
    event.preventDefault()
    const orderId = event.target.id
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
      {data.allOrders.map(ordersMapFunc)}
    </div>
  )
}

export default ShowOrders