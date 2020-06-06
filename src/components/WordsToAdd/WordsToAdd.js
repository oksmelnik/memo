import React from 'react'
import Aux from './../../hoc/Aux'
import styled from 'styled-components'
import {Button} from "../UI/Button/Button";

const StyledList = styled.div`
color: black;
`

export const WordsToAdd = ({list, onOkClicked, onCancelClick, wordsToAdd}) => {

  const words = Object.values(list).map(word => {
            return word.displayName
          })
  return (
    <Aux>
        <StyledList>
          <h2>{wordsToAdd} words to add</h2>
          {
             words.map(i => <li key={i}>{i}</li>)
          }
          <Button clicked={onOkClicked} color={'green'}>Ok</Button>
          <Button clicked={onCancelClick} color={'orange'}>Cancel</Button>
        </StyledList>
    </Aux>
  )
}
