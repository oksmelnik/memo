import React from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import { StyledListNavigation } from './elements/StyledListNavigation'

export const ListsNavigationItems = withRouter((props) => {
  const { name, id, action } = props

  return (
    <StyledListNavigation>
    <NavLink key='list' exact to='/lists'>
      ALL LISTS /
    </NavLink>
    <NavLink key={`list-${id}`}  to={`/lists/${id}`}>
      {name}
    </NavLink>
    {
      props.action &&
        <NavLink key={`list-${id}`}  to={`/lists/${id}/${action}`}>
          / {action}
        </NavLink>
    }
  </StyledListNavigation>
)
})
