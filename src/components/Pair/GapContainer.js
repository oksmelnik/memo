import React from 'react'
import Gap from './Gap'
import './Pair.css'

function GapContainer(props) {

    const getGapWords = () => {
      const gapWords = props.order === 'left' && props.pair.gap ?
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
      <div className="splited">
        {
          getGapWords().map((word, index) => {
            return (
              <Gap
                key={index}
                value={word}
                selectGap={(e) => props.selectGap(e, props.pair.id, index)}
              />
            )
        })
      }
      </div>
  )
}
export default GapContainer;
