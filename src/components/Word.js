import React from 'react'
import { StyledWord} from './../styles.js'

function Word(props) {
  return (
    <StyledWord>
      {
          props.wordValue &&
            <p onClick={props.toggleEdit}>{props.wordValue}</p>
      }
      <div>
        {props.textArea}
        {props.gap}
      </div>
      {props.translation}
    </StyledWord>
  )

}
export default Word;
