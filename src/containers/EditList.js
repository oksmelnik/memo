import React, { Component } from 'react';
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

const newPairToAdd = {
  left: "",
  right: "",
  type: "word",
  edit: true,
  gap: {
    words: [],
    selected: []
  }
}

class EditList extends Component {
  state = {
    wordsFetching: false,
    fetchedWords: {},
    wordsToAdd: 0,
    params: this.props.params
  }

  handleWordsAdding(e) {
    e.preventDefault()
    if (e.target.getAttribute('type') === 'addNew') {
        this.addPair()
    } else {
      this.setState({
        wordsFetching: true
      })
      this.fetchWords(e.target.getAttribute('type') === 'addOne' ? 1 : 10)
    }
  }

  getTranslation(word) {
    return new Promise((resolve, reject) => {
      axios.post(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200315T074819Z.860ff3441e541a2b.755ab0290b73192c988f313ed86169bd154d19d6&lang=en-ru&text=${word}`)
        .then((res) =>  {
          if (res.data.text) {
            resolve(res.data.text[0])
          } else {
            reject(false)
          }
        })
    })
  }

  fetchWords = (number) => {
    axios.get(`https://random-word-api.herokuapp.com/word?number=${number}`)
        .then((res) => {
          res.data.forEach(word => {
              this.getTranslation(word).then(translated => {
                if (translated !== word) {
                    axiosWords.post(`lists/${this.props.id}/pairs.json${this.state.params}`, newPairToAdd).then(res => {
                        const newPair = {
                          ...newPairToAdd,
                          ...{
                            id: res.data.name,
                            left: word,
                            right: translated,
                            displayName: `${word} - ${translated}`,
                            edit: false
                          },
                        }
                        const { fetchedWords } = {...this.state}
                        const newState = fetchedWords
                        newState[newPair.id] = newPair
                        this.setState({fetchedWords: newState, wordsToAdd: (this.state.wordsToAdd + 1)})
                    })
                }
              })
          })
        })
  }

  addPair = () => {

    axiosWords.post(`lists/${this.props.id}/pairs.json${this.state.params}`, newPairToAdd).then(res => {
        const newPair  = { id: res.data.name, ...newPairToAdd }
        const newState = {[newPair.id]: newPair, ...this.props.pairs};
        this.props.updateListState(newState);
    })
  }

  closeModal = () => {
    this.setState({wordsFetching: false})
  }

  addWordsToList = () => {

    const newState = {...this.state.fetchedWords, ...this.props.pairs}

    this.setState({
      wordsFetching: false,
      fetchedWords: {},
      wordsToAdd: 0
    })

    this.props.updateListState(newState)
    axiosWords.patch(`/lists/${this.props.id}.json${this.state.params}`, {pairs: newState})
  }

  render() {
    const { history, pairs, loading, ...rest } = this.props
    console.log(pairs)

    return (
        <Aux>
          <Modal show={this.state.wordsFetching}  isSameModal={this.state.wordsToAdd} modalClosed={this.closeModal}>
            <WordsToAdd
                wordsToAdd={this.state.wordsToAdd}
                list={this.state.fetchedWords}
                onOkClicked={this.addWordsToList}
                onCancelClick={this.closeModal}
            />
          </Modal>
            <ListEdit>
              <EditControls onClick={(e) => this.handleWordsAdding(e)}/>
              { loading ? <Spinner /> :
                 pairs ? Object.values(pairs).map(pair => {
                  return <Pair
                    pair={pair}
                    key={pair.id}
                    setPair={this.setPair}
                    getTranslation={this.getTranslation}
                    {...rest}
                  />}) : 'Empty list'
              }
            </ListEdit>
        </Aux>
    );
  }
}


export default withErrorHandler(EditList, axiosWords);
