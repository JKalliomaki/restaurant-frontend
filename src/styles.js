import styled, {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    font-family: Quicksand;
    font-size: 16px;
  }
  h3 {
    margin: 10px 0 10px 0;
  }

  input {
    border-radius: 5px;
  }

  @media only screen and (max-width: 600px){
    * {
      font-size: 12px !important;
    }

    input[type=text] {
      width: 8rem !important;
    }

  }

  img {
    width: 10em;
  }

`

export const Container = styled.div`
  margin: 0;

`

export const StartPage = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: linear-gradient(#BBDEFB, #E3F2FD);

  * {
    font-size: 18px;
  }

`

export const Box = styled.div`
  padding: 1em;
  margin: 1em;
  background-color: #ECF0F1;
  border: 1px solid #ccc;
  border-radius: 20px;

  p {
    text-align: center;
  }
`



export const DashboardPage = styled.div`
  display: flex;

  @media only screen and (max-width: 600px){
    flex-direction: column;
  }

`

export const DashboardRight = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0 0 2em 2em;

  //background-color: #ffffe5;

  @media only screen and (max-width: 600px){
    width: 90vw;
    margin: 0;
  }


`
// DBR short for DashBoardRight
// DBRInnerLeft -> DashBoardRightInnerLeft

export const DBRInnerLeft = styled.div`
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1em;

  //background-color: #ffe5ff;

`

export const DBRInnerRight = styled.div`
  justify-self: center;
  margin-top: 5px;
  margin-left: 5vw;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 1em;
  height: auto;

  //background-color: #f0fff7;

  @media only screen and (max-width: 600px){
    margin-left: 2px;
    width: auto;
    align-self: flex-start;
  }
`

export const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  height: 100%;
  margin: 5px 2em 2em 0;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px; 

  @media only screen and (max-width: 600px){
    margin-right: 1px;
    width: 90vw;
    flex-direction: row;
    justify-content: space-evenly;
  }

`

export const NavButton = styled.button`
  margin: 1px;
  width: 18vw;
  height: 8vh;
  font-size: 20px;
  background-color: #f2f2f2;
  border: 2px solid #e6e6e6;
  
  @media only screen and (max-width: 600px){
    width: 16vw;
  }

`


export const MenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  width: 15em;
  margin-top: 5px;
  text-align: center;

  h3 {
    margin: 0 0 10px 0;
  }

  @media only screen and (max-width: 600px){
    width: 10em;
  }

`
export const MenuButton = styled.button`
  margin: 3px;
  font-size: 14px

  
`

export const AddFood = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px; 
  padding: 1em;

`

export const OrderForm = styled.form`
  width: 
`

export const OrderMenu = styled.div`
  display: flex;
  flex-direction: column;
`

export const OrderList = styled.div`
  display: flex;
  flex-wrap: wrap;


`

export const Order = styled.div`
  width: 10rem;
  height: 15rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin: 5px;
  padding: 5px;

`

export const TopBar = styled.div`
  display: block;
  width: 100%;
  height: 4em;
`

export const LogoutButton = styled.button`
  margin: 0.5em 0 0 0.5em;

`

export const CloseButton = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid;
  border-radius: 30px;
`