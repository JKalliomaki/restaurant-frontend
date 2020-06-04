import React, { useState } from 'react'
import {useMutation} from '@apollo/client'

import {CREATE_ORDER, GET_ORDERS} from '../queries'
import {useField} from '../utils/hooks'
import AddOrderMenu from './AddOrderMenu'


const AddOrder = ({user, foods}) => {
  const [tableNr, resetTableNr] = useField('tableNr')
  const [items, setItems] = useState([])
  const [createOrder] = useMutation(CREATE_ORDER, {
    refetchQueries: [{query: GET_ORDERS}],
    onError: (e) => console.log(e.message)
  })

  const sendOrder = (event) => {
    event.preventDefault()
    const itemsToSend = items.map(food => {
      let foodArray = []
      for (let i = 0 ; i < food.amount; i++){
        foodArray.push(food.name)
      }
      return foodArray
    }).flat()
    const newOrder = {
      waiter: user.id,
      tableNr: Number(tableNr.value),
      items: itemsToSend

    }
    createOrder({variables: {...newOrder}})

    resetTableNr()
    setItems([])
  }
  
  const addToItems = (event) => {
    event.preventDefault()
    const foodName = event.target.id
    if (items.map(food => food.name).includes(foodName)){
      setItems(items.map(item => item.name === foodName ? {name: foodName, amount: item.amount + 1} : item))
    } else {
      setItems(items.concat({name: foodName, amount: 1}))
    }
  }

  const removeOne = (event) => {
    event.preventDefault()
    const foodName = event.target.id
    const amountOfFoods = items.find(item => item.name === foodName).amount
    if (amountOfFoods === 1){
      const newItems = items.map(item => item.name === foodName ? null : item)
      setItems(newItems.filter(item => item != null))
    } else {
      setItems(items.map(item => item.name === foodName ? {...item, amount: item.amount - 1} : item))
    }
  }

  return (
    <div>
      hello {user._id}
      <form onSubmit={sendOrder}>
        <table>
          <tbody>
            <tr>
              <td>
                tableNr: 
              </td>
              <td>
                <input
                  {...tableNr}
                />
              </td>
            </tr>
            <tr>
              <td>
                items: 
              </td>
              <td>
                <ul>
                  {items.map(food => <li key={food.name}>
                    {food.amount}x {food.name}<button onClick={removeOne} id={food.name}>X</button>
                  </li>)}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit' >Add</button>
      </form>
      <AddOrderMenu foods={foods} adder={addToItems} />
    </div>
  )
}


export default AddOrder