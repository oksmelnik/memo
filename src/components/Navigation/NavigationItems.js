import React,  { useContext } from 'react'
import { NavLink} from 'react-router-dom'
import { AuthContext } from './../../services/authContext/AuthContext'
import { StyledNavItems } from './elements/StyledNavItems'

export const NavigationItems = props => {
  const { authState } = useContext(AuthContext);

  return (
  <StyledNavItems>
    <NavLink key='home' exact to='/'>
      Home
    </NavLink>
    <NavLink key='list' to='/lists'>
      Lists
    </NavLink>
    <NavLink key='profile' to='/profile'>
      Profile
    </NavLink>
      {
        authState.token ? <NavLink key='auth' to='/logout'>Log Out</NavLink> :
          <NavLink key='auth' to='/auth'>Log In</NavLink>
      }
  </StyledNavItems>
)
}
