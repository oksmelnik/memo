import React from 'react'
import { StyledButtons } from './editStyles.js'
import { Button } from "../UI/Button/Button";

export const EditControls = ({onClick}) => {
  return (
      <StyledButtons>
          <Button key='addOne' type='addOne' clicked={onClick}>Add 1</Button>
          <Button key='addTen' type='addTen' clicked={onClick}>Add 10</Button>
          <Button key='addNew' type='addNew' clicked={onClick}>Add new</Button>
      </StyledButtons>
  )
}
