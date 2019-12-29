import React, { useState } from 'react';
import Word from './Word'
import PairButton from './PairButton'
import './Pair.css'
import deleteIcon from '../../icons/delete.svg'
import checkmarkIcon from '../../icons/checkmark.svg'
import editIcon from '../../icons/edit.svg'

const Pair = (props) => {

  const [edit, setEdit] = useState(false)

  const toggleEdit = () => {
      setEdit(!edit)
  }

  const onDelete = () => {
      props.onDelete(props.pair.id)
  }

  return (
    <div className='pair-outer'>
      {edit &&
        <button className='type-switcher'
          onClick={() => props.setGap(props.pair.id)}
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
            icon={props.edit ? editIcon : checkmarkIcon}
            alt={props.edit ? 'edit' : 'checkmark'}
          />

         </div>

        <PairButton
          callback={onDelete}
          icon={deleteIcon}
          alt='delete'
        />

      </div>
    </div>
  )
}
export default Pair;
