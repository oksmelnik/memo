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
import EditList from "./EditList"
import Practice from "./Practice"
import axiosWords from '../axios-words'
import { Route, withRouter } from 'react-router-dom';

class List extends Component {

  state = {
    pairs: [],
    loading: true,
    id: this.props.match.params.id,
    action: this.props.match.params.action
  }

  componentDidMount () {
    this.setState()
    this.loadData({loading: true})
  }

  componentWillUnmount() {
    axiosWords.patch(`/lists/${this.state.id}.json`, { pairs: this.state.pairs })
  }

  loadData = () => {
    axiosWords.get(`lists/${this.state.id}.json`).then(res => {

      if (res.data) {
        const data = res.data.pairs && res.data.pairs
        const list = data ? Object.values(data).flat() : []
        this.setState({pairs: list, name: res.data.name, loading: false })
      }
    }).catch(err => {
      this.setState({loading: false});
    });
  }

  updateValues = (newValue, id, key) => {

    this.setState(state => {

        const pairs = state.pairs.map(item => {

          if (item.id === id) {
            item[key] = newValue

            if (item.type === 'gap') {
                console.log(item)
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
    axiosWords.patch(`/lists/${this.state.id}.json`, { pairs: pairs })

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

  updateList = (newState) => {
      this.setState({
        pairs: newState,
        loading: false,
      })
  }

  updatePair = (id) => {
    const pair = this.state.pairs.find(x => x.id === id)
    axiosWords.patch(`/lists/${this.state.id}/pairs/${id}.json`, pair)
  }

  render() {
    const { history } = this.props
console.log(this.props.match.params)
    return (
      <Aux>
         <ListsNavigationItems
          name={this.state.name}
          id={this.state.id}
          action={this.state.action}
          />
         <Button clicked={() => history.replace(`${this.state.id}/practice`)}>  Practice </Button>

         <Route
           path={`${this.props.match.path}`}
           exact
           render={() => (
             <div className="App">
               <div className="App-header">
                    <EditList
                    id={this.state.id}
                    pairs={this.state.pairs}
                    updateList={this.updateList}
                    setGap={this.setGap}
                    selectGap={this.selectGap}
                    onDelete={this.deleteHandler}
                    updateValues={this.updateValues}
                    updatePair={this.updatePair}
                    />
                </div>
              </div>
           )}/>
          <Route
            path={`${this.props.match.path}/:action`}
            render={(props) => (<Practice pairs={this.state.pairs && this.state.pairs.length} />)} />
      </Aux>

    );
  }
}


export default withErrorHandler(withRouter(List), axiosWords);
