import React, {useState} from 'react'
import {useMutation} from '@apollo/client'

import {useField} from '../utils/hooks'
import {CREATE_FOOD, FOODS_BY_CATEGORY} from '../queries'
import {logError} from '../utils/logger'

const AddFoodForm = () => {
  // States for form
  const [foodName, resetFoodName] = useField('foodName')
  const [price, resetPrice] = useField('price')
  const [category, resetCategory] = useField('category')
  const [diet, setDiet] = useState([])
  const [dietField, resetDietField] = useField('diet')
  const [ingredients, setIngredients] = useState([])
  const [ingredientField, resetIngredientField] = useField('diet')

  const [sendFood] = useMutation(CREATE_FOOD, {
    refetchQueries: [{
      query: FOODS_BY_CATEGORY,
      variables: {category: category.value}
    }],
    onError: e => logError(e)
  })

  const addDiet = (event) => {
    event.preventDefault()
    setDiet(diet.concat(dietField.value))
    resetDietField()
  }

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
      category: category.value,
      diet,
      ingredients
    }

    sendFood({variables: {...newFood}})
    resetFoodName()
    resetPrice()
    resetCategory()
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
                  id='category'
                  {...category}
                />
              </td>
            </tr>
            <tr>
              <td>
                new diet:
              </td>
              <td>
                <input
                  id='diet'
                  {...dietField}
                />
              </td>
              <td>
                <button onClick={addDiet}>add</button>
              </td>
            </tr>
            <tr>
              <td>
                diets: 
              </td>
              <td>
                {diet.join(', ')}
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