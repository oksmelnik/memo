import React, { Component } from 'react';
import Pair from '../components/Pair/Pair'
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import {EditControls} from './../components/EditControls/EditControls.js'
import axios from "axios";
import { Modal } from './../components/UI/Modal/Modal'
import { Spinner } from './../components/UI/Spinner/Spinner'
import { WordsToAdd } from './../components/WordsToAdd/WordsToAdd'
import axiosWords from '../axios-words'

class EditList extends Component {
  state = {
    wordsFetching: false,
    fetchedWords: [],
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
                  this.setState({fetchedWords: [`${word} - ${translated}`, ...this.state.fetchedWords]})
                }
              })
          })
        })
  }

  addPair = () => {

    const newPair = {left: "", right: "", type: "words", edit: true}
      axiosWords.post(`lists/${this.props.id}/pairs.json${this.state.params}`, newPair).then(res => {
          newPair.id = res.data.name
          const newState = [newPair, ...this.props.pairs];
          this.props.updateList(newState);
      })
  }

  closeModal = () => {
    this.setState({wordsFetching: false})
  }

  addWordsToList = () => {
    const newWords = this.state.fetchedWords.map(word => {
      const pair = word.split('-')
      return {
        id: pair[0],
        left: pair[0],
        right: pair[1],
        type: 'words',
        gap: {
          words: [],
          selected: []
        }
      }
    })
    const newState = [...newWords, ...this.props.pairs]
    this.setState({
      wordsFetching: false,
      fetchedWords: []
    })

    this.props.updateList(newState)
    axiosWords.patch(`/lists/${this.props.id}.json${this.state.params}`, {pairs: newState})
  }

  setPair = (pair) => {
      this.props.updateList(this.props.pairs.map(item => item.id === pair.id ? pair : item))
  }


  render() {

    const { history, pairs, loading, ...rest } = this.props

    return (
        <Aux>
          <Modal show={this.state.wordsFetching} modalClosed={this.closeModal} isSameModal={this.state.fetchedWords.length}>
            <WordsToAdd
                list={this.state.fetchedWords}
                onOkClicked={this.addWordsToList}
                onCancelClick={this.closeModal}
            />
          </Modal>
          <EditControls onClick={(e) => this.handleWordsAdding(e)}/>

          { loading ? <Spinner /> :
             pairs.length > 0 ? pairs.map(pair => {
              return <Pair
                pair={pair}
                key={pair.id}
                setPair={this.setPair}
                getTranslation={this.getTranslation}
                {...rest}
              />}) : 'Empty list'

          }

        </Aux>
    );
  }
}


export default withErrorHandler(EditList, axiosWords);
