import React from 'react'
import styled from 'styled-components'

const StyledBackdrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 100;
    left: 100;
    top: 0%;
    background-color: grey;
    opacity: 50%;
`

export const Backdrop = props => (
    props.show ? <StyledBackdrop onClick={props.clicked}/> : null
)