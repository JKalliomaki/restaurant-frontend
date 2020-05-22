import {gql} from '@apollo/client'

export const CREATE_FOOD = gql`
mutation createFood($name: String!, $category: String!, $diet: [String], $ingredients: [String]){
  addFood(
    name: $name,
    category: $category,
    diet: $diet,
    ingredients: $ingredients
  ){
    name
    category
    diet
    ingredient
  }
}
`

export const GET_CATEGORIES = gql`
query {
  allCategories
}
`