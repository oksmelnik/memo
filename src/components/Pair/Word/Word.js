import React from 'react'
import { StyledWord} from '../../../styles.js'

function Word(props) {
  console.log('word props gap', props)
  return (
    <StyledWord>
      {
          props.wordValue &&
            <p onChange={props.toggleEdit}>{props.wordValue}</p>
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
