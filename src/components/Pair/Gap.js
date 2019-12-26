import React from 'react'
import './Pair.css'

function Gap(props) {
  return (
    <div onClick={
        (e) => props.selectGap(e, props.pairId, props.index)
    }>
      {props.value}
    </div>
  )
}
export default Gap;
