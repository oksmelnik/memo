import React,  { useContext } from 'react'
import { NavLink} from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from './../../services/AuthContext'

const StyledItem = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    align-items: canter;
    height: 100%;
    display: flex;

    li {
        margin: 0;
        display: flex;
        height: 100%;
        box-sizing: border-box;
    }

    a {
        height: 100%;
        color: black;
        text-decoration: none;
        padding: 16px 10px;
        border-bottom: 4px solid transperent;
        box-sizing: border-box;
        display: block
    }

    a:hover, a:active, a.active {
        background-color: grey;
        border-bottom: 4px solid red;
        color: white;
    }
`

export const NavigationItems = props => {
  const { authState } = useContext(AuthContext);

  return (
  <StyledItem>
    <NavLink key='home' exact to='/'>
      HOME
    </NavLink>
    <NavLink key='list' to='/new-list'>
      New List
    </NavLink>
    <NavLink key='profile' to='/profile'>
      Profile
    </NavLink>
      {
        authState.token ? <NavLink key='auth' to='/logout'>Log Out</NavLink> :
          <NavLink key='auth' to='/auth'>Log In</NavLink>
      }
  </StyledItem>
)
}
