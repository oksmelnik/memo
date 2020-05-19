import React, { Component } from 'react';
import Pair from '../components/Pair/Pair'
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import {EditControls} from './../components/EditControls/EditControls.js'
import axios from "axios";
import { Modal } from './../components/UI/Modal/Modal'
import { Spinner } from './../components/UI/Spinner/Spinner'
import { WordsToAdd } from './../components/WordsToAdd/WordsToAdd'
import { ListsNavigationItems } from './../components/Navigation/ListsNavigationItems'
import { Button } from "../components/UI/Button/Button";
import axiosWords from '../axios-words'

class EditList extends Component {

  state = {
    wordsFetching: false,
    fetchedWords: []
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
      axiosWords.post(`lists/${this.props.id}/pairs.json`, newPair).then(res => {
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
    axiosWords.patch(`/lists/${this.props.id}.json`, {pairs: newState})
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
                {...rest}
              />}) : 'Empty list'

          }

        </Aux>
    );
  }
}


export default withErrorHandler(EditList, axiosWords);
