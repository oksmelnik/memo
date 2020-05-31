import React from 'react'
import { Logo } from '../Logo/Logo'
import { NavigationItems } from './NavigationItems'
import { StyledToolbar } from './elements/StyledToolbar'

export const Toolbar = props => (
    <StyledToolbar>
      <NavigationItems />
      <Logo />
    </StyledToolbar>
)
