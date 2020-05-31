import React from 'react'
import { StyledButtons } from './editStyles.js'

export const EditControls = ({onClick}) => {
  return (
      <StyledButtons>
          <button key='addOne' type='addOne' onClick={onClick}>Add 1</button>
          <button key='addTen' type='addTen' onClick={onClick}>Add 10</button>
          <button key='addNew' type='addNew' onClick={onClick}>Add new</button>
      </StyledButtons>
  )
}
