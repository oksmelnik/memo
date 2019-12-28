import React from 'react'
import './Pair.css'

function Gap(props) {

  const selectGap = (e) => {
      if (props.editMode) {
          props.selectGap(e, props.pairId, props.index)
      }
  }

  return (
    <div onClick={selectGap}>
      {props.value}
    </div>
  )
}
export default Gap;
