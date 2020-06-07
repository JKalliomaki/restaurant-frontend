import React from 'react'
import {useQuery} from '@apollo/client'
import {GET_CATEGORIES} from '../queries'

import OneCategory from './OneCategory'
import { Box, StartPage } from '../styles'
import blankLogo from '../imgs/blankLogo.png'

const Menu = () => {
  const {loading, data} = useQuery(GET_CATEGORIES)

  if(loading){
    return null
  }
  
  return (
    <StartPage>
      <img src={blankLogo} alt='Site logo' />
      <Box>
        <p>Home of a good food</p>
        <p>Foodstreet 123</p>
        <p>Food-city</p>
        <p>0400-123123</p>

      </Box>
      <Box>
        {data.allCategories.map(category => 
          <OneCategory key={category} category={category} />)}
      </Box>

    </StartPage>
  )}

export default Menu