import React from 'react'
import './Pair.css'

function PairButton(props) {

  return (
    <button className="control-button" onClick={e => {
      e.preventDefault()
      props.callback(e)
    }}>
      <img src={props.icon} alt={props.alt}/>
    </button>
  )
}
export default PairButton;
