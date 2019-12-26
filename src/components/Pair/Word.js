import React from 'react'
import { TextareaAutosize } from '@material-ui/core';
import Gap from './Gap'
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

  const getGaps = () => {
    if (!props.type === 'gap') {
      return
    }

    const gapWords = props.order === 'left' && props.pair.gap ?
      props.pair.gap.words.map((item, index) => {
        if (props.pair.gap.selected.includes(index)) {
          return '...'
        } else {
          return item
        }
      }) :
      props.pair.gap.selected.map(index => props.pair.gap.words[index])

    if (gapWords) {
      return gapWords.map((word, index) => {
        return (
          <Gap
            key={index}
            value={word}
            selectGap={(e) => props.selectGap(e, props.pair.id, index, value)}
          />
        )
      })
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

        <div className="splited">{getGaps()}</div>

      </div>
    </div>
  )

}
export default Word;
