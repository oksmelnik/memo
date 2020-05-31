import React, { Component } from 'react';
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import { ListsNavigationItems } from './../components/Navigation/ListsNavigationItems'
import { Button } from "../components/UI/Button/Button";
import EditList from "./EditList"
import Practice from "./Practice"
import axiosWords from '../axios-words'
import { Route, withRouter } from 'react-router-dom';
import { AuthContext } from './../services/AuthContext'
import { ListWrapper } from './elements/ListWrapper'

class List extends Component {

  static contextType = AuthContext

  componentDidMount () {
    this.setState()
    this.loadData({loading: true})
  }

  state = {
    pairs: [],
    loading: true,
    id: this.props.match.params.id,
    action: this.props.match.params.action,
    params: `?auth=${this.context.authState.token}`
  }

  componentWillUnmount() {
    axiosWords.patch(`/lists/${this.state.id}.json${this.state.params}`, { pairs: this.state.pairs })
  }

  loadData = () => {
    axiosWords.get(`lists/${this.state.id}.json${this.state.params}`).then(res => {

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
    axiosWords.patch(`/lists/${this.state.id}.json${this.state.params}`, { pairs: pairs })

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
    axiosWords.patch(`/lists/${this.state.id}/pairs/${id}.json${this.state.params}`, pair)
  }

  render() {
    const { history } = this.props

    return (
      <Aux>
         <ListsNavigationItems
          name={this.state.name}
          id={this.state.id}
          action={this.state.action}
          />
        <ListWrapper>
          <Button clicked={() => history.replace(`${this.state.id}/practice`)}>  Practice </Button>

           <Route
             path={`${this.props.match.path}`}
             exact
             render={() => (
                <EditList
                id={this.state.id}
                pairs={this.state.pairs}
                updateList={this.updateList}
                setGap={this.setGap}
                selectGap={this.selectGap}
                onDelete={this.deleteHandler}
                updateValues={this.updateValues}
                updatePair={this.updatePair}
                params={this.state.params}
                />
             )}/>
            <Route
              path={`${this.props.match.path}/:action`}
              render={(props) => (<Practice pairs={this.state.pairs && this.state.pairs.length} />)} />
        </ListWrapper>
      </Aux>

    );
  }
}


export default withErrorHandler(withRouter(List), axiosWords);
