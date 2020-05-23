import React, {useState, useEffect} from 'react'
import {useQuery} from '@apollo/client'
import ClipLoader from 'react-spinners/ClipLoader'


import {GET_FOODS} from '../queries'
import Select from 'react-dropdown-select'
import EditFoodForm from './EditFoodForm'

const EditFood = () => {
  const foodResult = useQuery(GET_FOODS)
  const [toChange, setToChange] = useState([])
  let options = []

  useEffect(() => {
    if (foodResult.data){
      foodResult.data.allFoods.forEach(food => options.push({label: food.name, value: food.name, data: food}))
    }
  }, [foodResult.data])

  if (foodResult.loading){
    return <ClipLoader />
  }
  
  return (
    <div>
      <h3>Edit food</h3>
      <Select
        options={options}
        onChange={(value) => setToChange(value)}
      />
      <EditFoodForm food={toChange[0]}/>
    </div>
  )

}

export default EditFood