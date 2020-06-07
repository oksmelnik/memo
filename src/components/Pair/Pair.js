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
import questionIcon from '../../assets/question.svg'
import { StyledIcon } from '../../styles.js'


const Pair = ({pair, onDelete, updatePair, getTranslation}) => {
    const [edit, setEdit] = useState(pair.edit || false)
    const [currentPair, setPair] = useState(pair)
    const [pairType, setPairType] = useState(pair.type)

    const toggleEdit = () => {

      if (edit) {
        updatePair({ ...currentPair, edit: !edit})
      }
      setPair({ ...currentPair, edit: !edit})
      setEdit(!edit)
    }

    const toggleTranslate =() => {
        setEdit(true)
        getTranslation(currentPair.left).then(fetchedTranslation => {
            setPair({...currentPair, right: fetchedTranslation})
        })
    }

    const switchGap = (e) => {
      const newType = pairType === "gap" ? "word" : "gap"
      const newPair = newType === "gap" ? getPairWithGaps() : { ...currentPair, type: newType }
      setPair(newPair)
      setPairType(newType)
      e.preventDefault()
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
            key={currentPair.id + 'left'}
            pair={currentPair}
            order='left'
            toggleEdit={toggleEdit}
            selectGap={selectGap}
            wordUpdate={wordUpdate}
          />

          <Word
            key={currentPair.id + 'right'}
            pair={currentPair}
            order='right'
            toggleEdit={toggleEdit}
            selectGap={selectGap}
            wordUpdate={wordUpdate}
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

        {
          !currentPair.answered && <StyledIcon src={questionIcon} width="1.3em"/>
        }

      </div>
    </StyledPair>
  )
}

Pair.propTypes= {
    pair: PropTypes.object
}
export default React.memo(Pair);
