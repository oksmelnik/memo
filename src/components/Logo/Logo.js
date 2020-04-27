import React from 'react'
import styled from 'styled-components'
import logo from "../../assets/logo.png"

const StyledImage = styled.div`
    background-color: white;
    height: 80%;
    margin: 5px;
    box-sizing: border-box;
    border-radius: 20%;
    
    png {
    height: 100%
    }
`

export const Logo = () => (
    <StyledImage>
        <img src={logo} alt="logo"/>
    </StyledImage>
)