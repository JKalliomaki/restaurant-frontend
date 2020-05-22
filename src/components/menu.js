import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_CATEGORIES} from '../queries'

import OneCategory from './OneCategory'

const Menu = () => {
  const {loading, data} = useQuery(GET_CATEGORIES)

  if(loading){
    return null
  }
  
  return (
    <div>
      {data.allCategories.map(category => 
      <OneCategory key={category} category={category} />)}
    </div>
    )}

export default Menu