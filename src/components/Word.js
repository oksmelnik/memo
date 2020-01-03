import React from 'react'
import { TextareaAutosize } from '@material-ui/core';
import GapContainer from './GapContainer'
import { StyledWord } from './../styles.js'

function Word(props) {

  const showEditFiels = () => {
    if (!props.editMode) {
      return false
    } else if (props.type === 'gap' && props.order === 'right') {
      return false
    } else {
      return true
    }
  }

  const showOriginText = () => {
    if (!props.editMode && props.type !== 'gap') {
      return true
    }
  }

  const handleChange = (e) => {
    props.saveChanges(e, props.pair.id, props.order)
    e.preventDefault()
  }

  return (
    <StyledWord>

      {showOriginText() &&
        <p onClick={props.toggleEdit}>{props.wordValue}</p>
      }

      <div>
        {showEditFiels() &&
          <div>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              defaultValue={props.wordValue}
              onChange={handleChange}
            />
          </div>
        }

        {props.type === 'gap' &&
          <GapContainer
            pair={props.pair}
            order={props.order}
            value={props.wordValue}
            selectGap={props.selectGap}
            editMode={props.editMode}
          />
        }

      </div>
    </StyledWord>
  )

}
export default Word;
