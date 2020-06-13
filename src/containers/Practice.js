import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { QuestionCard } from '../components/QuestionCard'
import {Button} from "../components/UI/Button/Button";
import styled from 'styled-components'
import { useList } from './../services/listsContext'


const PracticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
`
const Practice = (props) => {
  const { history, token, match } = props
  const { params: { id, action }, path } = match
  const [ , pairs, updatePair ] = useList(id)
  const [ pairsArray, setPairsArray] = useState(pairs)
  const [ currentPair, setCurrentPair ] = useState(pairsArray && pairsArray[0])
  const [ answerSeen, setAnswerSeen] = useState(null)
  const [ answerCorrect, setAnswerCorrect ] = useState(null)


  const pairsToAnswer = pairs ? pairs.filter(pair => !pair.answered)
  .sort(pair => pair.answered).sort(pair => pair.attemp) : []

  useEffect(() => {
      if (pairs) {
        if (pairsToAnswer.length > 0) {
          setPairsArray(pairsToAnswer)
          setCurrentPair(pairsToAnswer[0])
        } else {
          history.replace(`/lists/${id}`)
        }
      }

  }, [pairsToAnswer.length])


  useEffect(() => {

      if ( answerCorrect !== null) {
        const attemp = (answerCorrect || !currentPair.attemp) ? 0 : currentPair.attemp + 1
        const answeredPair = { ...currentPair, answered: answerCorrect, attemp: attemp }

        updatePair(answeredPair)
        setAnswerSeen(false)
        setAnswerCorrect(null)
      }

  }, [answerCorrect])



  return (
   <PracticeWrapper>
     {
       pairsArray &&
         <>
           <div>{pairsArray && pairsArray.length} pairs to pracrice</div>
           <Button clicked={() => history.replace(`/lists`)} color={'green'}>Back to list</Button>

           <QuestionCard
              pair={currentPair}
              answerSeen={answerSeen}
              onClick={() => setAnswerSeen(true)}
            />

            {
              answerSeen &&
                <div>
                  <Button clicked={() => setAnswerCorrect(true)} color={'green'}>Correct</Button>
                  <Button clicked={() => setAnswerCorrect(false)} color={'orange'}>Next time</Button>
                </div>
            }
        </>
    }
  </PracticeWrapper>
  )
}

export default withRouter(Practice)
