import React, { Component } from 'react';
import Pair from '../components/Pair/Pair'
import list from './../list.js'
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
    pairs: [],
    name: this.props.match.params.id,
    wordsFetching: false,
    fetchedWords: [],
    loading: false
  }

  componentDidMount () {

    axiosWords.get(`lists/${this.state.name}.json`).then(res => {
      const data = res.data.pairs && JSON.parse(res.data.pairs)
      const list = data ? Object.values(data).flat() : []
      this.setState({pairs: list })
    })
  }

  saveChanges = (newValue, id, key) => {

    this.setState(state => {
        const pairs = state.pairs.map(item => {

          if (item.id === id) {
            item[key] = newValue

            if (item.type === 'gap') {
                item.gap.words = item.left.split(' ').filter(word => word.length > 0)
            }
          }
          return item
        })
        return pairs
    })
  }

  deleteHandler = (pairId) => {
    const pairIndex = this.getPairIndex(pairId)
    const pairs = [...this.state.pairs]

    pairs.splice(pairIndex, 1)
    this.setState({pairs: pairs})
  }

  setGap = (id) => {

    this.setState(state => {
        const pairs = state.pairs.map(item => {
          if (item.id === id) {
            item.type = item.type === 'gap'? 'words' : 'gap'
            item.gap.words = item.left.split(' ').filter(word => word.length > 0)
          }

          return item
        })

        return pairs
    })

  }

  selectGap = (e, pairId, index) => {
    e.preventDefault()

    const pairIndex = this.getPairIndex(pairId)

    const pair = {
      ...this.state.pairs[pairIndex]
    }

    if (pair.gap.selected.includes(index)) {
      const selectedIndex = pair.gap.selected.indexOf(index)
        pair.gap.selected.splice(selectedIndex, 1)
    } else {
      pair.gap.selected = [...pair.gap.selected,  index]
    }

    const pairs = [...this.state.pairs]
    pairs[pairIndex] = pair

    this.setState({pairs: pairs})
  }

  getPairIndex(id) {
    return this.state.pairs.findIndex(p => {
      return p.id === id
    })
  }

  handleWordsAdding(e) {
    e.preventDefault()
    this.setState({
      wordsFetching: true
    })
    this.fetchWords(e.target.getAttribute('type') === 'addOne' ? 1 : 10)
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
    const newState = [...newWords, ...this.state.pairs]
    this.setState({
      pairs: newState,
      wordsFetching: false,
      fetchedWords: []
    })

   axiosWords.patch(`/lists/${this.state.name}.json`, { pairs: JSON.stringify(newState) })

  }

  getTranslation = (word) => {
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

  render() {

    return (
        <Aux>
          <Modal show={this.state.wordsFetching} modalClosed={this.closeModal} isSameModal={this.state.fetchedWords.length}>
            <WordsToAdd
                list={this.state.fetchedWords}
                onOkClicked={this.addWordsToList}
                onCancelClick={this.closeModal}
            />
          </Modal>

          <div className="App">
            <div className="App-header">
              <EditControls onClick={(e) => this.handleWordsAdding(e)}/>
              {this.state.pairs.length > 0 ?
                this.state.pairs.map(pair => {
                  return <Pair
                    pair={pair}
                    key={pair.id}
                    setGap={this.setGap}
                    selectGap={this.selectGap}
                    onDelete={this.deleteHandler}
                    saveChanges={this.saveChanges}
                    getTranslation={() => this.getTranslation(pair.left)}
                />}) : <Spinner />
              }

            </div>
           </div>
        </Aux>
    );
  }
}

export default withErrorHandler(EditList, axiosWords);
