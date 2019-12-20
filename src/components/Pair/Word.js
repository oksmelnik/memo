import React from 'react'
import { TextareaAutosize } from '@material-ui/core';
import './Pair.css'

function Word(props) {

  return (
    <div
      className="word"
    >
      {!props.editMode &&
        <p onClick={props.toggleEdit}>{props.value}</p>
      }
      {props.editMode &&
        <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        defaultValue={props.value}
        onChange={props.onChange}/>
      }
    </div>
  )
}
export default Word;
