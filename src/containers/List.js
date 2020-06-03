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
    axiosWords.delete(`/lists/${this.state.id}/pairs/${pairId}.json${this.state.params}`)
  }

  updateList = (newState) => {
      this.setState({
        pairs: newState,
        loading: false,
      })
  }

  getPairIndex(id) {
    return this.state.pairs.findIndex(p => {
      return p.id === id
    })
  }

  updatePair = (id, pair) => {

    const newPairs = this.state.pairs.map(item => item.id === id ? pair : item)

    this.setState({
      pairs: newPairs
    })

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
