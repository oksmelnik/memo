import React, { useState, useRef } from 'react';
import Word from './Word'
import PairButton from './PairButton'
import { StyledPair } from './../styles.js'
import { StyledWord} from './../styles.js'
import { TextareaAutosize } from '@material-ui/core';
import GapContainer from './GapContainer'
import Translation from './Translation'

import deleteIcon from '../icons/delete.svg'
import checkmarkIcon from '../icons/checkmark.svg'
import translateIcon from '../icons/subject.svg'
import editIcon from '../icons/edit.svg'
import closeIcon from '../icons/close.svg'

import axios from 'axios'

const Pair = (props) => {

    const [edit, setEdit] = useState(false)

    const [translated, setTranslate] = useState(false)

    const rightEdit = useRef(null);

    const getTranslation = () => {
        axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200315T074819Z.860ff3441e541a2b.755ab0290b73192c988f313ed86169bd154d19d6&lang=en-ru&text=${props.pair.left}`)
            .then((res) => {
                rightEdit.current.value = res.data && res.data.text
                props.saveChanges(res.data.text, props.pair.id, 'right')

            })
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

  const toggleTranslate =() => {
        if (!translated) {
            getTranslation()
        }
      setTranslate(!translated)
  }

  const onDelete = () => {
      props.onDelete(props.pair.id)
  }

  const setGap = (e) => {
      props.setGap(props.pair.id)
      e.preventDefault()
  }

    const showEditFields = (order) => {
        if (!edit) {
            return false
        } else if (props.type === 'gap' && order === 'right') {
            return false
        } else {
            return true
        }
    }

    const showOriginText = () => {
        if (!edit && props.type !== 'gap') {
            return true
        }
    }

    const handleWordChange = (e, order) => {
        props.saveChanges(e.target.value.trim(), props.pair.id, order)
        e.preventDefault()
    }

    const returnTextArea = (order) => {
        if (showEditFields(order)) {
            return (
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    ref={order === 'right' ? rightEdit : null}
                    defaultValue={order === 'left' ? props.pair.left : props.pair.right}
                    onChange={(e) => handleWordChange(e, order)}
                />
            )
        }
    }

    const returnGap = (order, value) => {
        return (<GapContainer
            pair={props.pair}
            order={order}
            value={value}
            selectGap={props.selectGap}
            editMode={edit}
        />)
    }

  return (
    <StyledPair>
      {edit &&
        <button className='type-switcher' onClick={setGap}
        >
          {props.type === 'gap' ? 'Word' : 'Gap'}
        </button>
      }
      <div
        className='pair'
      >

        <div className='words-wrapper'>
          <Word
            wordValue={showOriginText() && props.pair.left}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('left')}
            gap={props.type === 'gap' && returnGap('left', props.left)}
          />

          <Word
            wordValue={showOriginText() && props.pair.right}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('right')}
            gap={props.type === 'gap' && returnGap('right', props.right)}
          />

          <PairButton
            callback={toggleEdit}
            icon={edit ? checkmarkIcon : editIcon}
            alt={edit ? 'checkmark' : 'edit'}
          />

          {(edit && !props.pair.right) &&
            <PairButton
              callback={toggleTranslate}
              icon={translateIcon}
              alt='translate'
            />
          }

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
export default React.memo(Pair);
