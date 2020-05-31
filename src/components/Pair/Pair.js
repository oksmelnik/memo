import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import Word from './Word/Word'
import PairButton from './PairButton'
import { StyledPair } from '../../styles.js'
import { TextareaAutosize } from '@material-ui/core';
import GapContainer from './Gap/GapContainer'
import deleteIcon from '../../assets/delete.svg'
import checkmarkIcon from '../../assets/checkmark.svg'
import translateIcon from '../../assets/subject.svg'
import editIcon from '../../assets/edit.svg'

const Pair = ({pair, selectGap, onDelete, updateValues, updatePair, setPair, getTranslation}) => {
    const [edit, setEdit] = useState(pair.edit || false)

    const rightEdit = useRef(null);

    const toggleEdit = () => {
        if (edit) {
          updatePair(pair.id)
        }
        setEdit(!edit)
        pair.edit = !edit
    }

    const toggleTranslate =() => {
        setEdit(true)

        getTranslation(pair.left).then(fetchedTranslation => {
            updateValues(fetchedTranslation, pair.id, 'right')
            rightEdit.current.value = fetchedTranslation
        })
    }

    const handleClick = (e) => {
      setGap(pair.id)
      e.preventDefault()
    }

    const showEditFields = (order) => {
        if (!edit) {
            return false
        } else if (pair.type === 'gap' && order === 'right') {
            return false
        } else {
            return true
        }
    }

    const showOriginText = () => {
        if (!edit && pair.type !== 'gap') {
            return true
        }
    }

    const handleWordChange = (e, order) => {
        e.preventDefault()
        updateValues(e.target.value.trim(), pair.id, order)
    }

    const returnTextArea = (order) => {
        if (showEditFields(order)) {
            return (
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    ref={order === 'right' ? rightEdit : null}
                    defaultValue={order === 'left' ? pair.left : pair.right}
                    onChange={(e) => handleWordChange(e, order)}
                />
            )
        }
    }

    const returnGap = (order, value) => {
        return (<GapContainer
            pair={pair}
            order={order}
            value={value}
            selectGap={selectGap}
            editMode={edit}
        />)
    }

    const setGap = (id) => {
      const newPair = pair
      newPair.type = newPair.type === 'gap'? 'words' : 'gap'
      newPair.gap = newPair.gap || {}
      newPair.gap.words = newPair.left.split(' ').filter(word => word.length > 0)
      setPair(newPair)
  }

  return (
    <StyledPair>
      {edit &&
        <button className='type-switcher' onClick={handleClick}
        >
          {pair.type === 'gap' ? 'Word' : 'Gap'}
        </button>
      }
      <div
        className='pair'
      >

        <div className='words-wrapper'>
          <Word
            wordValue={showOriginText() && pair.left}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('left')}
            gap={pair.type === 'gap' && returnGap('left', pair.left)}
          />

          <Word
            wordValue={showOriginText() && pair.right}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('right')}
            gap={pair.type === 'gap' && returnGap('right', pair.right)}
          />

          <PairButton
            callback={toggleEdit}
            icon={edit ? checkmarkIcon : editIcon}
            alt={edit ? 'checkmark' : 'edit'}
          />

          {!pair.right &&
            <PairButton
              callback={toggleTranslate}
              icon={translateIcon}
              alt='translate'
            />
          }

         </div>

        <PairButton
          callback={() => onDelete(pair.id)}
          icon={deleteIcon}
          alt='delete'
        />

      </div>
    </StyledPair>
  )
}

Pair.propTypes= {
    pair: PropTypes.object
}
export default React.memo(Pair);
