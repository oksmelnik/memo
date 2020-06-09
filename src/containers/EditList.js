
import React, { useState, useEffect, useContext } from 'react';
import Pair from '../components/Pair/Pair'
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import { EditControls } from './../components/EditControls/EditControls.js'
import axios from "axios";
import { Modal } from './../components/UI/Modal/Modal'
import { Spinner } from './../components/UI/Spinner/Spinner'
import { WordsToAdd } from './../components/WordsToAdd/WordsToAdd'
import axiosWords from '../axios-words'
import { ListEdit} from './elements/ListEdit'
import { useList } from './../services/listsContext'



const EditList = (props) => {
  const [ wordsFetching, setWordsFetching ] = useState(false)
  const [ fetchedWords, setFetchedWords ] = useState({})
  const [ wordsToAdd, setWordsToAdd] = useState(0)
  const { history, pairs, loading, id, params, ...rest } = props
  const [ , , updatePair, addPair, addPairs, deletePair ] = useList(id)

  const handleWordsAdding = (e) => {
    e.preventDefault()
    if (e.target.getAttribute('type') === 'addNew') {
        addPair()
    } else {
      setWordsFetching(true)
      fetchWords(e.target.getAttribute('type') === 'addOne' ? 1 : 10)
    }
  }
  //
   const getTranslation = (word) => {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200315T074819Z.860ff3441e541a2b.755ab0290b73192c988f313ed86169bd154d19d6&lang=en-ru&text=${word}`)
  //       .then((res) =>  {
  //         if (res.data.text) {
  //           resolve(res.data.text[0])
  //         } else {
  //           reject(false)
  //         }
  //       })
  //   })
   }
  //
   const fetchWords = (number) => {
    // axios.get(`https://random-word-api.herokuapp.com/word?number=${number}`)
    //     .then((res) => {
    //       res.data.forEach(word => {
    //           getTranslation(word).then(translated => {
    //             if (translated !== word) {
    //                 axiosWords.post(`lists/${props.id}/pairs.json${params}`, newPairToAdd).then(res => {
    //                     const newPair = {
    //                       ...newPairToAdd,
    //                       ...{
    //                         id: res.data.name,
    //                         left: word,
    //                         right: translated,
    //                         displayName: `${word} - ${translated}`,
    //                         edit: false
    //                       },
    //                     }
    //                     const { fetchedWords } = {...state}
    //                     const newState = fetchedWords
    //                     newState[newPair.id] = newPair
    //                     setState({fetchedWords: newState, wordsToAdd: (wordsToAdd + 1)})
    //                 })
    //             }
    //           })
    //       })
    //     })
   }

const closeModal = () => {
    setWordsFetching(false)
}

const addWordsToList = () => {
    addPairs(fetchedWords)
    setWordsFetching(false)
    setFetchedWords({})
    setWordsToAdd(0)
  }


    return (
        <Aux>
          <Modal show={wordsFetching}  isSameModal={wordsToAdd} modalClosed={closeModal}>
            <WordsToAdd
                wordsToAdd={wordsToAdd}
                list={fetchedWords}
                onOkClicked={addWordsToList}
                onCancelClick={closeModal}
            />
          </Modal>
            <ListEdit>
              <EditControls onClick={(e) => handleWordsAdding(e)}/>
              { loading ? <Spinner /> :
                 pairs ? pairs.map(pair => {
                  return <Pair
                    pair={pair}
                    listId={id}
                    key={pair.id}
                    getTranslation={getTranslation}
                    {...rest}
                  />}) : 'Empty list'
              }
            </ListEdit>
        </Aux>
    );

}


export default withErrorHandler(EditList, axiosWords);
