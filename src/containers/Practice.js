import React from 'react';
import { withRouter } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard'

const Practice = (props) => {
  const { pairs } = props || []
  return (
    <div>
      <div>{pairs.length} pairs to pracrice</div>
      {
        pairs.map(pair => <QuestionCard pair={pair}/>)
      }
    </div>
  )
}

export default withRouter(Practice)
