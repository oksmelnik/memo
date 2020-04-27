import React from 'react'
import Gap from './Gap'
import { StyledGapsContainer } from '../../styles.js'

function GapContainer(props) {
    const leftColumn =  props.order === 'left'

    const getGapWords = () => {
      const gapWords = leftColumn && props.pair.gap ?
        props.pair.gap.words.map((item, index) => {
          if (props.pair.gap.selected.includes(index)) {
            return '...'
          } else {
            return item
          }
        }) :
        props.pair.gap.selected.map(index => props.pair.gap.words[index])

      return gapWords ? gapWords : []
    }

  return (
      <StyledGapsContainer>
        {
          getGapWords().map((word, index) => {
            return (
              <Gap
                key={index}
                value={word}
                selectGap={leftColumn && props.selectGap}
                pairId={props.pair.id}
                index={index}
                editMode={props.editMode}
              />
            )
        })
      }
      </StyledGapsContainer>
  )
}
export default GapContainer;
