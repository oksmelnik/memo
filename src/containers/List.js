import React, { Component } from 'react';
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import { ListsNavigationItems } from './../components/Navigation/ListsNavigationItems'
import { Button } from "../components/UI/Button/Button";
import EditList from "./EditList"
import Practice from "./Practice"
import axiosWords from '../axios-words'
import { Route, withRouter } from 'react-router-dom';
import { useList } from './../services/listsContext'
import { ListWrapper } from './elements/ListWrapper'

const List = (props) => {
    const { history, token, match } = props
    const { params: { id, action }, path } = match
    const [ list, pairs ] = useList(id)

    console.log('List', list)



  // deleteHandler = (pairId) => {
  //   const newPairs = { ...this.state.pairs }
  //   delete newPairs[pairId]
  //
  //   this.setState({pairs: newPairs})
  //   axiosWords.delete(`/lists/${this.state.id}/pairs/${pairId}.json${this.state.params}`)
  // }
  //
  // updateListState = (newState) => {
  //
  //     this.setState({
  //       pairs: newState,
  //       loading: false,
  //     })
  // }
  //
  // updatePair = (pair) => {
  //   const newPairs = {...this.state.pairs, [pair.id]: pair}
  //   this.setState({
  //     pairs: newPairs
  //   })
  //
  //   axiosWords.patch(`/lists/${this.state.id}/pairs/${pair.id}.json${this.state.params}`, pair)
  // }


    return (
      <Aux>
         <ListsNavigationItems
          name={list.name}
          id={id}
          action={action}
          />

        <ListWrapper>
          <Button clicked={() => history.replace(`${id}/practice`)}>  Practice </Button>

           <Route
             path={`${path}`}
             exact
             render={() => (
                <EditList
                  id={id}
                  pairs={pairs}
                  // updateListState={this.updateListState}
                  // onDelete={this.deleteHandler}
                  // updatePair={this.updatePair}
                  params={match.params}
                />
             )}/>
            <Route
              path={`${path}/:action`}
              render={(props) => (<Practice
                pairs={pairs}
                updateListState={this.updateListState}/>)} />
        </ListWrapper>
      </Aux>

    );
}


// <Button clicked={() => this.updateListState(Object.values(this.state.pairs).map(item => {
//   return {...item, answered: false}
// }))}>  Renew </Button>

export default withErrorHandler(withRouter(List), axiosWords);
