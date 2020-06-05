import React, { useState, useRef, useEffect } from 'react';
import Word from '../Pair/Word/Word'

 const QuestionCard = (props) => {
   const { pair } = props
   const [ answered, setAnswered ] = useState(false)
  return (
    <div>
    {!answered ?
      <Word
        pair={pair}
        order='left'
      /> :
      <Word
        pair={pair}
        order='right'
      />
    }
    </div>
  )
}

export { QuestionCard };
