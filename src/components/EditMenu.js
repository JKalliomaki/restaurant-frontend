import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {GET_CATEGORIES} from '../queries'
import EditFoodForm from './EditFoodForm'

import {
  MenuButtons,
  MenuButton,
  DashboardRight,
  DBRInnerLeft,
} from '../styles'


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
    <DashboardRight>
      <DBRInnerLeft>
        {data.allCategories.map(category => 
          <MenuButtons key={category}>
            <h3>{category}</h3>
            {foods.allFoods.filter(food => food.category === category).map(
              food => <MenuButton 
                key={food.name} 
                id={food.name}
                onClick={editButton}
              >{food.name}<br/>price: {Number.parseFloat(food.price).toFixed(2)}</MenuButton>
            )}
          </MenuButtons>)}
      </DBRInnerLeft>

      <EditFoodForm food={foods.allFoods.filter(food => food.name === toEdit)[0]} setFood={setToEdit}/>

    </DashboardRight>
  )}

export default EditMenu