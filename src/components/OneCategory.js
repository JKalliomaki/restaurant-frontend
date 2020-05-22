import React from 'react'
import {useQuery} from '@apollo/client'

import {FOODS_BY_CATEGORY} from '../queries'

const OneCategory = ({category}) => {
  const {loading, data} = useQuery(FOODS_BY_CATEGORY, {variables: {category}})

  if (loading){
    return null
  }
  return (
    <div>
      <h3>{category}</h3>
      <table>
        <tbody>
          {data.foodsByCategory.map(food => 
            <tr key={food.name}>
              <td>{food.name}</td>
              <td>{food.price}</td>
            </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default OneCategory