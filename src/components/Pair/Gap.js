import React from 'react'
import './Pair.css'

function Gap(props) {
  return (
    <div onClick={props.selectGap}>
      {props.value}
    </div>
  )
}
export default Gap;
