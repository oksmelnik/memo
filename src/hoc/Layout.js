import React from 'react'
import Aux from './Aux'
import {Toolbar} from '../components/Navigation/Toolbar'
import styled from "styled-components";


const Main = styled.main`
    color: white;
    background-color: #282c34;
    width: 1200px;
    margin: 0 auto;

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