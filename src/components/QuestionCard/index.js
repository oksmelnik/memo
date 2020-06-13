import React from 'react';
import styled from 'styled-components'
import Word from './../Pair/Word/Word'

const WordWrapper = styled.div`
  border: 1px solid white;
  border-radius: 4px;
  margin-top: 50px;
  width: 200px;
  text-alight: center;
  padding: 30px;
`

 const QuestionCard = ({ pair, answerSeen, onClick }) => {
   return (
     <WordWrapper onClick={onClick}>
     { answerSeen ?
       <Word
         key={pair.id + 'right'}
         pair={pair}
         order='right'
         width='100%'
       /> :

       <Word
         key={pair.id + 'left'}
         pair={pair}
         order='left'
         width='100%'
       />
   }
   </WordWrapper>
  )
}

export { QuestionCard };
