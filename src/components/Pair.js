import React, { useState } from 'react';
import Word from './Word'
import PairButton from './PairButton'
import { StyledPair } from './../styles.js'

import deleteIcon from '../icons/delete.svg'
import checkmarkIcon from '../icons/checkmark.svg'
import translateIcon from '../icons/subject.svg'
import editIcon from '../icons/edit.svg'
import closeIcon from '../icons/close.svg'

import axios from 'axios'

const Pair = (props) => {

    const [edit, setEdit] = useState(false)

    const [editTranslate, setTranslate] = useState(false)

    const [translation, showTranslation] = useState('')

    const getTranslation = () => {
        axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200315T074819Z.860ff3441e541a2b.755ab0290b73192c988f313ed86169bd154d19d6&lang=en-ru&text=${props.pair.left}`)
            .then((res) => {
                showTranslation(res.data.text || 'error')
            })
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

  const handleEdit = () => {

        if (editTranslate) {
            props.saveChanges(translation, props.pair.id, 'right')
            setTranslate(false)
      }

      toggleEdit()
  }

  const toggleTranslate =() => {
        if (!editTranslate) {
            getTranslation()
        }
      setTranslate(!editTranslate)
      setEdit(!edit)

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
            translateMode={editTranslate}
            translation={editTranslate && translation}
            toggleEdit={toggleEdit}
            saveChanges={props.saveChanges}
          />

          <PairButton
            callback={handleEdit}
            icon={edit ? checkmarkIcon : editIcon}
            alt={edit ? 'checkmark' : 'edit'}
          />

          <PairButton
              callback={toggleTranslate}
              icon={editTranslate ? closeIcon :translateIcon}
              alt='translate'
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
