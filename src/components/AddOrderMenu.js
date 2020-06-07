import React from 'react'
import { DBRInnerRight, OrderMenu, MenuButton } from '../styles'

const AddOrderMenu = ({foods, adder}) => {

  const oneButtonStyle = {
    width: 150,
    margin: 3
  }

  return (
    <DBRInnerRight >
      <OrderMenu >
        {foods.allFoods.map(food => 
          <MenuButton onClick={adder} key={food.name} style={oneButtonStyle} id={food.name}>{food.name}</MenuButton>)}
      </OrderMenu>
    </DBRInnerRight>
  )
}

export default AddOrderMenu