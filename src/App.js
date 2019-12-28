import React, { Component } from 'react';
import './App.css';
import Pair from './components/Pair/Pair'

class App extends Component {

  state = {

    pairs: [
      {
        id: 1,
        left: 'links',
        right: 'left',
        type: 'words',
        gap: {
          words: [],
          selected: []
        }
      },
      {
        id: 2,
        left: 'apple',
        right:'fruit',
        type: 'words',
        gap: {
          words: [],
          selected: []
        }
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.pairs.map(pair =>
            <Pair
            key={pair.id}
            pair={pair}
            state={this.state}
            setGap={this.setGap}
            selectGap={this.selectGap}
            onDelete={this.deleteHandler}
            saveChanges={this.saveChanges}
            resizeElement
            />
          )}
        </header>
    </div>
    );
  }

  saveChanges = (e, id, key) => {
    e.preventDefault()

    const pairIndex = this.getPairIndex(id)

    const pair = {
      ...this.state.pairs[pairIndex]
    }

    pair[key] = e.target.value.trim()

    if (pair.type === 'gap') {
        pair.gap.words = pair.left.split(' ').filter(word => word.length > 0)
    }

    const pairs = [...this.state.pairs]

    pairs[pairIndex] = pair

    this.setState({pairs: pairs})
  }

  deleteHandler = (pairId) => {
    const pairIndex = this.getPairIndex(pairId)
    const pairs = [...this.state.pairs]
    pairs.splice(pairIndex, 1)
    this.setState({pairs: pairs})
  }

  setGap = (id) => {

      const pairIndex = this.getPairIndex(id)

      const pair = {
        ...this.state.pairs[pairIndex]
      }

      pair.type = pair.type === 'gap'? 'words' : 'gap'

      pair.gap.words = pair.left.split(' ').filter(word => word.length > 0)

      const pairs = [...this.state.pairs]
      pairs[pairIndex] = pair
      this.setState({pairs: pairs})

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
}

export default App;
