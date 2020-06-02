import React, {useState} from 'react'
import {useMutation} from '@apollo/client'
import Select from 'react-dropdown-select'

import {useField} from '../utils/hooks'
import {CREATE_FOOD, FOODS_BY_CATEGORY} from '../queries'

const AddFoodForm = () => {
  // States for form
  const [foodName, resetFoodName] = useField('foodName')
  const [price, resetPrice] = useField('price')
  const [category, setCategory] = useState('starter')
  const [dietValues, setDietValues] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [ingredientField, resetIngredientField] = useField('diet')
  
  const [sendFood] = useMutation(CREATE_FOOD, {
    refetchQueries: [{
      query: FOODS_BY_CATEGORY,
      variables: {category}
    }],
    onError: e => console.log(e)
  })
  
  const DIET_OPTIONS = [
    {
      label: 'gluten-free',
      value: 'gl'
    },
    {
      label: 'lactose-free',
      value: 'l'
    },
  ]

  const addIngredient = (event) => {
    event.preventDefault()
    setIngredients(ingredients.concat(ingredientField.value))
    resetIngredientField()
  } 
  const addFood = (event) => {
    event.preventDefault()

    const newFood = {
      name: foodName.value,
      price: Number(price.value),
      category,
      diet: dietValues.map(val => val.value),
      ingredients
    }
    sendFood({variables: {...newFood}})
    setDietValues([])
    resetFoodName()
    resetPrice()
    setCategory('starter')
  }
  
  return (
    <div>
      <form onSubmit={addFood}>
        <table>
          <tbody>
            <tr>
              <td>
                name:
              </td>
              <td>
                <input
                  id='foodName'
                  {...foodName}
                />
              </td>
            </tr>
            <tr>
              <td>
                price:
              </td>
              <td>
                <input
                  id='price'
                  {...price}
                />
              </td>
            </tr>
            <tr>
              <td>
              category: 
              </td>
              <td>
                <input 
                  type='radio' 
                  checked={category === 'starter'}
                  onChange={() => setCategory('starter')}
                />
                Starter<br/>
                <input 
                  type='radio' 
                  checked={category === 'main course'}
                  onChange={() => setCategory('main course')}
                />
                Main course<br/>
                <input 
                  type='radio' 
                  checked={category === 'dessert'}
                  onChange={() => setCategory('dessert')}
                />
                Dessert<br/>
              </td>
            </tr>
            <tr>
              <td>
                diets: 
              </td>
              <td>
                <Select
                  multi
                  values={dietValues}
                  options={DIET_OPTIONS}
                  onChange={(value) => setDietValues(value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                new ingredient:
              </td>
              <td>
                <input
                  id='ingredient'
                  {...ingredientField}
                />
              </td>
              <td>
                <button onClick={addIngredient}>add</button>
              </td>
            </tr>
            <tr>
              <td>
                ingredients: 
              </td>
              <td>
                {ingredients.join(', ')}
              </td>
            </tr>
          </tbody>
        </table>
        <button type='submit'>Add food</button>
      </form>
    </div>
  )
}

export default AddFoodForm