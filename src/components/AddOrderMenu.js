import React from 'react'

const AddOrderMenu = ({foods, adder}) => {
  console.log(foods)
  const buttonsStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 100
  }
  const oneButtonStyle = {
    width: 150,
    margin: 3
  }

  return (
    <div style={buttonsStyle}>
      {foods.allFoods.map(food => 
        <button onClick={adder} key={food.name} style={oneButtonStyle} id={food.name}>{food.name}</button>)}
    </div>
  )
}

export default AddOrderMenu