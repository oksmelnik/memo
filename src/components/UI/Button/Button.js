import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    width: 100px;
    font-weight: bold;
    color: ${props => props.color}
    z-index: 400;
`

export const Button = props => (
    <StyledButton onClick={props.clicked} color={props.color}>{props.children}</StyledButton>
)
