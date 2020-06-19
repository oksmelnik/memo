import React from 'react'
import styled from 'styled-components'
import logo from "../../assets/logo.png"

const StyledImage = styled.div`
  height: 90%;

  png {
    height: 100%
  }
`

export const Logo = () => (
    <StyledImage>
        <img src={logo} alt="logo"/>
    </StyledImage>
)
