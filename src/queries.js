import {gql} from '@apollo/client'

export const CREATE_FOOD = gql`
mutation createFood($name: String!, $price: Float!, $category: String!, $diet: [String], $ingredients: [String]){
  addFood(
    name: $name,
    price: $price,
    category: $category,
    diet: $diet,
    ingredients: $ingredients
  ){
    name
    price
    category
    diet
    ingredients
  }
}
`

export const GET_CATEGORIES = gql`
query {
  allCategories
}
`

export const FOODS_BY_CATEGORY = gql`
query getFoods($category: String!){
  foodsByCategory(category: $category){
    name
    price
    diet
    ingredients
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(
    username: $username
    password: $password
  ){
    value
  }
}
`