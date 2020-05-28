/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react'
import {useMutation} from '@apollo/client'
import Select from 'react-dropdown-select'
import ClipLoader from 'react-spinners/ClipLoader'


import {useField} from '../utils/hooks'
import {EDIT_FOOD, FOODS_BY_CATEGORY, REMOVE_FOOD, GET_FOODS} from '../queries'

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

const DIET_VALUES = {
  'gl': {
    value: 'gl',
    label: 'gluten-free'
  },
  'l': {
    value: 'l',
    label: 'lactose-free'
  }
}

const EditFoodForm = ({food, setFood}) => {
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [diets, setDiets] = useState([])
  const [ingredientField, resetIngredientField] = useField('ingredient')
  const [ingredients, setIngredients] = useState([])
  
  const [editFood, result] = useMutation(EDIT_FOOD, {
    refetchQueries: [{query: FOODS_BY_CATEGORY, variables: {category: food ? food.category : null}},
      {query: GET_FOODS}],
    onError: (e) => console.log(e.message)
  })

  const [removeFood, removeResult] = useMutation(REMOVE_FOOD,{
    refetchQueries: [
      {query: FOODS_BY_CATEGORY, variables: {category}},
      {query: GET_FOODS}
    ],
    onError: (e) => console.log(e.message)
  })

  const removeButton = async (event) => {
    if(window.confirm(`Confirm removing ${food.name}`)){
      event.preventDefault()
      removeFood({variables: {name: food.name}})
    }
  }

  const closeButton = (event) => {
    event.preventDefault()
    setFood(null)
  }

  const updateFood = async (event) => {
    event.preventDefault()
    const editedFood = {
      name: food.name,
      price: Number(price),
      category,
      diet: diets.map(diet => diet.value),
      ingredients
    }
    await editFood({variables: {...editedFood}})
  }

  const addIngredient = (event) => {
    event.preventDefault()
    setIngredients(ingredients.concat(ingredientField.value))
    resetIngredientField()
  }

  useEffect(() => {
    if(food){
      setPrice(String(food.price.toFixed(2)))
      setCategory(food.category)
      setDiets(food.diet.map(diet => (DIET_VALUES[diet])))
      setIngredients(food.ingredients)
    }
  }, [food])

  if (!food){
    return null
  }
  return (
    <div>
      <button onClick={closeButton}>close</button>
      <form onSubmit={updateFood}>
        <table>
          <tbody>
            <tr>
              <td>
                price:
              </td>
              <td>
                <input
                  type='text'
                  value={price}
                  onChange={({target}) => setPrice(target.value)}
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
                  values={diets}
                  options={DIET_OPTIONS}
                  onChange={(value) => setDiets(value)}
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
        <button type='submit'>update</button>
        <button onClick={removeButton}>X</button>
      </form>
      <ClipLoader
        loading={result.loading || removeResult.loading}
      />
    </div>
  )

}

export default EditFoodForm