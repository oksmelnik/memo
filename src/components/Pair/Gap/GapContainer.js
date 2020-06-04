import React from 'react'
import Gap from './Gap'
import { StyledGapContainer } from './StyledGapContainer.js'

function GapContainer(props) {
    const leftColumn =  props.order === 'left'


    const getGapWords = () => {

      const gapWords = leftColumn && props.pair.gap ?
        props.pair.gap.words.map((item, index) => {
          if (props.pair.gap.selected && props.pair.gap.selected.includes(index)) {
            return '...'
          } else {
            return item
          }
        }) : props.pair.gap.selected && props.pair.gap.selected.map(index => props.pair.gap.words[index])


      return gapWords ? gapWords : []
    }

  return (
      <StyledGapContainer edit={props.editMode} leftColumn={leftColumn}>
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
      </StyledGapContainer>
  )
}
export default GapContainer;
