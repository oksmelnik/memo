import React from 'react'
import { StyledWord} from '../../../styles.js'
import GapContainer from '../Gap/GapContainer'
import { TextareaAutosize } from '@material-ui/core';

const Word = ({pair, order, toggleEdit, selectGap, wordUpdate}) => {
  const {edit, type} = pair

  const wordValue = order === 'right' ? pair.right : pair.left

  const returnGap = (order, value) => {
      return (<GapContainer
          pair={pair}
          order={order}
          value={value}
          selectGap={selectGap}
          editMode={edit}
      />)
  }

  const getTextArea = () => {
    if (showEditFields()) {
      return (
          <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              defaultValue={wordValue}
              onChange={(e) => wordUpdate(e, order)}
          />
        )
    }
  }

  const showEditFields = () => {
      if (!edit) {
          return false
      } else if (type === 'gap' && order === 'right') {
          return false
      } else {
          return true
      }
  }

  return (
    <StyledWord>
      {
        (!edit && type === 'word')  &&
          <p onChange={toggleEdit}>{wordValue}</p>
      }
      <div>
        {getTextArea()}
        {type === 'gap' && (
          <GapContainer
            pair={pair}
            order={order}
            value={wordValue}
            selectGap={selectGap}
            editMode={edit}/>
          ) }
      </div>
    </StyledWord>
  )

}
export default Word;
