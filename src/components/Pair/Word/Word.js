import React from 'react'
import GapContainer from '../Gap/GapContainer'
import { TextareaAutosize } from '@material-ui/core';
import styled from 'styled-components'

const StyledWord = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: ${({ width }) => width};
    margin-left: 0.5em;

    textarea {
      width: 90%;
      border-radius: 4px;
      font-size: 0.6em;
      padding: 1.2em 0.3em;
    }

    span {
        background: white;
        color: black;
        margin: 0.1em;
        padding: 0.1em;
        border-radius: 4px;
        font-size: 0.6em;
    }
`

const Word = ({pair, order, toggleEdit, selectGap, wordUpdate, width = '50%'}) => {
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
    <StyledWord width={width}>
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
