import React from 'react'
import Aux from './../../hoc/Aux'
import styled from 'styled-components'
import {Button} from "../UI/Button/Button";

const StyledList = styled.div`
color: black;
`


export const WordsToAdd = ({list, onOkClicked, onCancelClicked}) => (
    <Aux>
        <StyledList>
            {
                list.map(i => <li>{i}</li>)
            }

                <Button clicked={onOkClicked} color={'green'}>Ok</Button>
                <Button clicked={onCancelClicked} color={'orange'}>Cancel</Button>

        </StyledList>

    </Aux>
)
