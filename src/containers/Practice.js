import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard'
import {Button} from "../components/UI/Button/Button";
import styled from 'styled-components'


const PracticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: canter;
  margin: 20px auto;
`
const Practice = ({ pairs, history, updateListState }) => {
  const [ pairsState, setPairsState ] = useState(pairs)
  const [ pairsArray, setPairsArray] = useState(Object.values(pairs))
  const [ currentPair, setCurrentPair ] = useState(pairsArray[0])
  const [ answerSeen, setAnswerSeen ] = useState(false)


  useEffect(() => {
    setAnswerSeen(false)

    if (pairsArray.length > 0) {
      setCurrentPair(pairsArray[0])
    } else {
      updateListState(pairsState)
      history.push('/')
    }
  }, [pairsArray])

  const answereOk = () => {
    const answeredPair = { answered: true, ...currentPair}
    setPairsState({...pairsState,  [answeredPair.id]: answeredPair})
    setPairsArray(pairsArray.splice(1))
  }

  const answereIncorrect = () => {
    const answeredPair = { answered: false, ...currentPair}
    setPairsState({...pairsState,  [answeredPair.id]: answeredPair})
    const newArray = [...pairsArray.splice(1), answeredPair]
    setPairsArray(newArray)
  }

  return (
    <PracticeWrapper>
        <div>{pairsArray.length} pairs to pracrice</div>

        <div onClick={() => setAnswerSeen(true)}>
          <QuestionCard
            pair={currentPair}
            answerSeen={answerSeen}
          />
        </div>

        { answerSeen &&
            <div>
              <Button clicked={answereOk} color={'green'}>Correct</Button>
              <Button clicked={answereIncorrect} color={'orange'}>Next time</Button>
            </div>
        }
    </PracticeWrapper>
  )
}

export default withRouter(Practice)
