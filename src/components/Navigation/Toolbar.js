import React from 'react'
import styled from 'styled-components'
import { Logo } from '../Logo/Logo'
import { NavigationItems } from './NavigationItems'


const StyledToolbar = styled.header`
    width: 100%;
    height: 60px;
    position: fix;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 90;
    box-sizing: border-box;
    
    img {
    height: 100%;
    }
    
`

export const Toolbar = props => (
    <StyledToolbar>
        <div>MENU</div>
        <Logo/>

            <NavigationItems items={[
            {
                text: 'LINK1',
                link: '/'
            },
                {
                    text: 'LINK2',
                    link: '/'
                }
        ]}/>
    </StyledToolbar>
)
