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

export const EDIT_FOOD = gql`
mutation editFood($name: String!, $price: Float!, $category: String!, $diet: [String], $ingredients: [String]){
  editFood(
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

export const REMOVE_FOOD = gql`
mutation removeFood($name: String!){
  removeFood(
    name: $name,

  ){
    name
  }
}
`

export const GET_FOODS = gql`
query {
  allFoods{
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

export const GET_ORDERS = gql`
query {
  allOrders{
    orderer
    phoneNr
    items
    id
  }
}
`

export const REMOVE_ORDER = gql`
mutation remove($id: ID!){
  removeOrder(
    id: $id
  ){
    orderer
    items
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

export const GET_USER = gql`
query {
  me{
    username
    role
  }
}
`