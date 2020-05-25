import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {GET_CATEGORIES} from '../queries'
import EditFoodForm from './EditFoodForm'


const menuButtonsStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: '10em',
}
const menuButtonStyle = {
  margin: 3
}

const EditMenu = ({foods}) => {
  const {loading, data} = useQuery(GET_CATEGORIES)
  const [toEdit, setToEdit] = useState(null)

  const editButton = (event) => {
    event.preventDefault()
    const foodName = event.target.id
    setToEdit(foodName)

  }

  if(loading){
    return null
  }
  
  return (
    <div>
      {data.allCategories.map(category => 
        <div key={category} className='menuButtons' style={menuButtonsStyle}>
          <h3>{category}</h3>
          {foods.allFoods.filter(food => food.category === category).map(
            food => <button 
              style={menuButtonStyle} 
              key={food.name} 
              id={food.name}
              onClick={editButton}
            >{food.name} price: {Number.parseFloat(food.price).toFixed(2)}</button>
          )}
        </div>)}
      <div>
        <EditFoodForm food={foods.allFoods.filter(food => food.name === toEdit)[0]} setFood={setToEdit}/>
      </div>
    </div>
  )}

export default EditMenu