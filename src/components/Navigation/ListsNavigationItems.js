import React from 'react'
import { NavLink, withRouter} from 'react-router-dom'
import styled from 'styled-components'

const StyledItem = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    padding-left: 30px;
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
        color: white;
        text-decoration: none;
        padding: 16px 5px 16px 0;
        border-bottom: 4px solid transperent;
        box-sizing: border-box;
        display: block
    }

    a:hover, a:active, a.active {
        background-color: white;
        color: black;
    }

`

export const ListsNavigationItems = withRouter((props) => {
  const { name, id, action } = props

  return (
    <StyledItem>
    <NavLink key='list' exact to='/lists'>
      ALL LISTS /
    </NavLink>
    <NavLink key={`list-${id}`}  to={`/lists/${id}`}>
      {props.name}
    </NavLink>
    {
      props.action &&
        <NavLink key={`list-${id}`}  to={`/lists/${id}/${action}`}>
          {action}
        </NavLink>
    }
  </StyledItem>
)
})
