import React from 'react'
import { StyledButton } from '../../styles.js'

function PairButton(props) {

  return (
    <StyledButton onClick={e => {
      e.preventDefault()
      props.callback(e)
    }}>
      <img src={props.icon} alt={props.alt}/>
    </StyledButton>
  )
}
export default PairButton;
