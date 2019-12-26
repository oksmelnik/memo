import React from 'react'
import { TextareaAutosize } from '@material-ui/core';
import GapContainer from './GapContainer'

import './Pair.css'

function Word(props) {

  const value = props.pair[props.order]

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


  return (
    <div
      className="word"
    >
      {showOriginText() &&
        <p onClick={props.setEdit}>{props.value}</p>
      }

      <div className='className="word-edit"'>
        {showEditFiels() &&
          <div>
          <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Empty"
          defaultValue={value}
          onChange={props.onChange}/>
          </div>
        }

        {props.type === 'gap' &&
          <GapContainer
            pair={props.pair}
            order={props.order}
            value={value}
            selectGap={props.selectGap}
          />
        }

      </div>
    </div>
  )

}
export default Word;
