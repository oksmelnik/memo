import React from 'react'
import Aux from './Aux'
import {Toolbar} from '../components/Navigation/Toolbar'
import styled from "styled-components";

const Main = styled.main`
    color: #f0e1c9;
    background-color: #282c34;
    max-width: 1200px;
    min-height: 1500px;
    margin: 0 auto;
    font-size: 16px;
    padding: 0 0 50px;
    text-align: center;

    svg, img {
      fill: #f0e1c9;
      stroke: #f0e1c9;
      color: #f0e1c9;
    }

    input {
      background: #f2e9da;
      outline: none;
    }

    a {
      color: #78b0a0;
    }
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
