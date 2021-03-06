import React from 'react'
import {useQuery, useMutation} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'


import {GET_ORDERS, REMOVE_ORDER} from '../queries'
import { 
  DashboardRight,
  OrderList,
  Order,
} from '../styles'

const ShowOrders = () => {
  const {loading, data} = useQuery(GET_ORDERS)
  const [removeOrder] = useMutation(REMOVE_ORDER, {
    refetchQueries: [{query: GET_ORDERS}],
    onError: (e) => console.log(e.message)
  })


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
      <Order key={order.tableNr}>
        table Nr: {order.tableNr}
        <div>waiter: {order.waiter.username}</div>
        <ul>
          {orderItems.map(item => <li key={item.name}>{item.amount}x {item.name}</li>)}
        </ul>
        <button id={order.id} onClick={removeButton}>Remove order</button>
      </Order>
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
    <DashboardRight>
      <OrderList >
        <h3 style={{width: '100%'}}>Orders</h3>
        {data.allOrders.map(ordersMapFunc)}
      </OrderList>
    </DashboardRight>
  )
}

export default ShowOrders