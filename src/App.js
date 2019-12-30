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
      },
      {
        id: 3,
        left: 'tomato',
        right:'veg',
        type: 'words',
        gap: {
          words: [],
          selected: []
        }
      }
    ]
  }

  saveChanges = (e, id, key) => {
    const newValue = e.target.value.trim()

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

  render() {

    return (
      <div className="App">
        <div className="App-header">
          {this.state.pairs.map(pair => {
            return <Pair
              key={pair.id}
              pair={pair}
              setGap={this.setGap}
              selectGap={this.selectGap}
              onDelete={this.deleteHandler}
              saveChanges={this.saveChanges}
            />
          }
          )}
        </div>
    </div>
    );
  }

}

export default App;
