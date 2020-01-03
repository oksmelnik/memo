import React, { useState } from 'react';
import Word from './Word'
import PairButton from './PairButton'
import { StyledPair } from './../styles.js'

import deleteIcon from '../icons/delete.svg'
import checkmarkIcon from '../icons/checkmark.svg'
import editIcon from '../icons/edit.svg'


const Pair = (props) => {

  const [edit, setEdit] = useState(false)

  const toggleEdit = () => {
      setEdit(!edit)
      console.log(edit)
  }

  const onDelete = () => {
      props.onDelete(props.pair.id)
  }

  const setGap = (e) => {
      props.setGap(props.pair.id)
      e.preventDefault()
  }

  return (
    <StyledPair>
      {edit &&
        <button className='type-switcher' onClick={setGap}
        >
          {props.pair.type === 'gap' ? 'Word' : 'Gap'}
        </button>
      }
      <div
        className='pair'
      >

        <div className='words-wrapper'>
          <Word
            order='left'
            pair={props.pair}
            wordValue={props.pair.left}
            type={props.pair.type}
            editMode={edit}
            toggleEdit={toggleEdit}
            saveChanges={props.saveChanges}
            selectGap={props.selectGap}
          />

          <Word
            order='right'
            pair={props.pair}
            wordValue={props.pair.right}
            type={props.pair.type}
            editMode={edit}
            toggleEdit={toggleEdit}
            saveChanges={props.saveChanges}
          />

          <PairButton
            callback={toggleEdit}
            icon={edit ? checkmarkIcon : editIcon}
            alt={edit ? 'checkmark' : 'edit'}
          />

         </div>

        <PairButton
          callback={onDelete}
          icon={deleteIcon}
          alt='delete'
        />

      </div>
    </StyledPair>
  )
}
export default Pair;
