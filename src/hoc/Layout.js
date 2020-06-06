import React from 'react'
import Aux from './Aux'
import {Toolbar} from '../components/Navigation/Toolbar'
import styled from "styled-components";

const Main = styled.main`
    color: white;
    background-color: #282c34;
    max-width: 1200px;
    min-height: 1500px;
    margin: 0 auto;
    font-size: 16px;
    padding: 0 30px 50px;
    text-align: center;
`

const layout = props => (
    <Aux>
      <Toolbar />
      <Main>
           {props.children}
      </Main>
    </Aux>
)

export default layout;
