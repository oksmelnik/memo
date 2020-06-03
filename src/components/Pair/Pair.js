import React, { useState, useRef, useEffect } from 'react';
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

const Pair = ({pair, onDelete, updateValues, updatePair, getTranslation}) => {
    const [edit, setEdit] = useState(pair.edit || false)
    const [currentPair, setPair] = useState(pair)
    const [pairType, setPairType] = useState(pair.type)

    const rightEdit = useRef(null);

    const toggleEdit = () => {
        if (edit) {
          updatePair(currentPair.id, { ...currentPair, edit: false})
        }
        setEdit(!edit)
    }

    const toggleTranslate =() => {
        setEdit(true)

        getTranslation(currentPair.left).then(fetchedTranslation => {
            updateValues(fetchedTranslation, currentPair.id, 'right')
            rightEdit.current.value = fetchedTranslation
        })
    }

    const switchGap = (e) => {
      const newType = pairType === "gap" ? "word" : "gap"
      const newPair = newType === "gap" ? getPairWithGaps() : { ...currentPair, type: newType }
      setPair(newPair)
      setPairType(newType)
      e.preventDefault()
    }

    const showEditFields = (order) => {
        if (!edit) {
            return false
        } else if (pairType === 'gap' && order === 'right') {
            return false
        } else {
            return true
        }
    }

    const showOriginText = () => {
        if (!edit && currentPair.type !== 'gap') {
            return true
        }
    }
    const returnTextArea = (order) => {
        if (showEditFields(order)) {
            return (
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    ref={order === 'right' ? rightEdit : null}
                    defaultValue={order === 'left' ? pair.left : pair.right}
                    onChange={(e) => wordUpdate(e, order)}
                />
            )
        }
    }

    const returnGap = (order, value) => {
        return (<GapContainer
            pair={currentPair}
            order={order}
            value={value}
            selectGap={selectGap}
            editMode={edit}
        />)
    }

    const wordUpdate = (e, order) => {
      e.preventDefault()
      const newPair = {...currentPair}
      newPair[order] = e.target.value

      if (newPair.type === 'gap') {
          newPair.gap.words = newPair.left.split(' ').filter(word => word.length > 0)
      }

      setPair(newPair)
    }

    const getPairWithGaps = () => {
      const pairWithGaps = currentPair
      pairWithGaps.type = 'gap'
      pairWithGaps.gap = pairWithGaps.gap || {}
      pairWithGaps.gap.words = pairWithGaps.left.split(' ').filter(word => word.length > 0)
      pairWithGaps.gap.selected = []
      return pairWithGaps
  }

  const selectGap = (e, pairId, index) => {
    e.preventDefault()
    const newPair = {...currentPair}
    if (newPair.gap.selected.includes(index)) {
      const selectedIndex = newPair.gap.selected.indexOf(index)
        newPair.gap.selected.splice(selectedIndex, 1)
    } else {
      newPair.gap.selected = [...newPair.gap.selected,  index]
    }
    setPair(newPair)
  }

  return (
    <StyledPair>
      {edit &&
        <button className='type-switcher' onClick={switchGap}
        >
          {currentPair.type === 'gap' ? 'Word' : 'Gap'}
        </button>
      }
      <div
        className='pair'
      >

        <div className='words-wrapper'>
          <Word
            wordValue={showOriginText() && currentPair.left}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('left')}
            gap={pairType === 'gap' && returnGap('left', currentPair.left)}
          />

          <Word
            wordValue={showOriginText() && currentPair.right}
            toggleEdit={toggleEdit}
            textArea={returnTextArea('right')}
            gap={pairType === 'gap' && returnGap('right', currentPair.right)}
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
