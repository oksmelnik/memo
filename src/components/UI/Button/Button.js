import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    color: #ffd152;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    width: auto;
    font-weight: bold;
    color: ${props => props.color}
    z-index: 400;
`

export const Button = props => (
    <StyledButton
      onClick={props.clicked}
      key={props.key}
      type={props.type}
      color={props.color}>
        {props.children}
      </StyledButton>
)
