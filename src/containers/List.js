import React, { Component } from 'react';
import Aux from './../hoc/Aux'
import withErrorHandler from './../hoc/withErrorHandler/withErrorHandler'
import { ListsNavigationItems } from './../components/Navigation/ListsNavigationItems'
import { Button } from "../components/UI/Button/Button";
import EditList from "./EditList"

import axiosWords from '../axios-words'
import { Route, withRouter } from 'react-router-dom';
import { useList, useLists } from './../services/listsContext'
import { ListWrapper } from './elements/ListWrapper'


const List = (props) => {
    const { history, token, match } = props
    const { params: { id, action }, path } = match
    const [ list, pairs, , , useAddPairs ] = useList(id)
    const [ , , , , updateList ] = useLists()

    const resetProgress = () => {
      const newPairs = {}
      Object.values(pairs).map(item => {
        newPairs[item.id] = {...item, answered: false}
      })
      updateList({...list, pairs: newPairs })
    }

    const pairsToAnswer = pairs ? pairs.filter(pair => !pair.answered).length : 0

    return (
      <>
      {
        list ?
          <Aux>
             <ListsNavigationItems
              name={list.name}
              id={id}
              action={action}
            />

            <ListWrapper>
              <div>
                <Button
                  clicked={() => history.push(`/lists/${id}/practice`)}
                  color="#78b0a0"
                >
                  Practice ({pairsToAnswer} words)
                </Button>

                <Button
                  clicked={resetProgress}
                  color="#78b0a0"
                  >
                    Reset Progress
                </Button>
              </div>

               <Route
                 path={`${path}`}
                 exact
                 render={() => (
                    <EditList
                      id={id}
                      pairs={pairs}
                      addPairsToList={useAddPairs}
                      token={token}
                    />
                 )}/>
            </ListWrapper>
          </Aux>
    : <></>}
    </>
    );
}




export default withErrorHandler(withRouter(List), axiosWords);
