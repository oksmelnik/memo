import React, { Component } from 'react';
import './App.css';
import Pair from './components/Pair/Pair'

class App extends Component {

  state = {
    edit: [],
    pairs: [
      {
        id: 1,
        left: 'links',
        right: 'left'
      },
      {
        id: 2,
        left: 'apple',
        right:'fruit'
      },
      {
        id: 3,
        left: 'tomato',
        right:'veg'
      },
      {
        id: 4,
        left: 'rose',
        right:'flower'
      }
    ]
  }
  toggleEdit(e, id) {
    e.preventDefault()

    const state = [...this.state.edit]
    const isEditing = state.findIndex(item => item === id)

    if (isEditing >= 0) {
      state.splice(isEditing, 1)
      this.setState({edit: state})
    } else {
      this.setState({edit: [...state, id]})
    }
  }

  saveChanges = (e, id, key) => {
    e.preventDefault()

    const pairIndex = this.state.pairs.findIndex(p => {
      return p.id === id
    })

    const pair = {
      ...this.state.pairs[pairIndex]
    }

    pair[key] = e.target.value.trim()
    const pairs = [...this.state.pairs]
    pairs[pairIndex] = pair
    this.setState({pairs: pairs})
  }

  deleteHandler = (pairIndex) => {
    const pairs = [...this.state.pairs]
    pairs.splice(pairIndex, 1)
    this.setState({pairs: pairs})
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
            onDelete={() => this.deleteHandler(pair.id)}
            toggleEdit={(e) => this.toggleEdit(e, pair.id)}
            saveChanges={this.saveChanges}
            editMode={this.state.edit.includes(pair.id)}
            resizeElement
            />
          )}
        </header>
    </div>
    );
  }
}

export default App;
