import React from 'react'

import {useField} from '../utils/hooks'

const AddFoodForm = () => {
  const [name, resetName] = useField('name')
  const [price, resetPrice] = useField('price')
  const [category, resetCategory] = useField('category')
  
  return (
    <div>
      <form>

      </form>
    </div>
  )
}

export default AddFoodForm