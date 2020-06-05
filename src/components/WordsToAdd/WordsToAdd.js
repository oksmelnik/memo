import React from 'react'
import Aux from './../../hoc/Aux'
import styled from 'styled-components'
import {Button} from "../UI/Button/Button";

const StyledList = styled.div`
color: black;
`

export const WordsToAdd = ({list, onOkClicked, onCancelClicked}) => {
  const words = Object.values(list).map(word => {
            console.log('WordsToAdd', word.displayName)
            return word.displayName
          })
  return (
    <Aux>
        <StyledList>
            {
               words.map(i => <li key={i}>{i}</li>)
            }
                <Button clicked={onOkClicked} color={'green'}>Ok</Button>
                <Button clicked={onCancelClicked} color={'orange'}>Cancel</Button>

        </StyledList>

    </Aux>
)
}
