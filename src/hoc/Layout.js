import React from 'react'
import Aux from './Aux'
import {Toolbar} from '../components/Navigation/Toolbar'


const layout = props => (
    <Aux>
        <Toolbar />
        <main>
             {props.children}
        </main>
    </Aux>
)

export default layout;