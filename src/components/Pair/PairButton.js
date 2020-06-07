import React from 'react'
import { StyledButton } from '../../styles.js'
import { StyledIcon } from '../../styles.js'

function PairButton(props) {

  return (
    <StyledButton onClick={e => {
      e.preventDefault()
      props.callback(e)
    }}>
      <StyledIcon src={props.icon} alt={props.alt}/>
    </StyledButton>
  )
}
export default PairButton;
