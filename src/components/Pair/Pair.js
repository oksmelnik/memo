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
import { useList } from './../../services/listsContext'


const Pair = ({ pair, listId, getTranslation }) => {
    const [edit, setEdit] = useState(pair.edit || false)
    const [currentPair, setCurrentPair] = useState(pair)
    const [pairType, setPairType] = useState(pair.type)
    const [ , , updatePair, , , deletePair ] = useList(listId)

console.log('currentPair', currentPair)
    const toggleEdit = () => {

      if (edit) {
        updatePair({ ...currentPair, edit: !edit})
      }

      setCurrentPair({ ...currentPair, edit: !edit})
      setEdit(!edit)
    }

    const toggleTranslate =() => {
        setEdit(true)
        getTranslation(currentPair.left).then(fetchedTranslation => {
            setCurrentPair({...currentPair, right: fetchedTranslation})
        })
    }

    const switchGap = (e) => {
      const newType = pairType === "gap" ? "word" : "gap"
      const newPair = newType === "gap" ? getPairWithGaps() : { ...currentPair, type: newType }
      setCurrentPair(newPair)
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

      setCurrentPair(newPair)
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
    setCurrentPair(newPair)
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
          callback={() => deletePair(pair.id)}
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
