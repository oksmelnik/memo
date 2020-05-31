import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import AllLists from './containers/AllLists'
import Auth  from './containers/Auth/Auth'
import Logout  from './containers/Auth/Logout'
import Profile from './containers/Profile'
import Layout from './hoc/Layout'
import { AuthContext } from './services/AuthContext'

import asyncComponent from './hoc/asyncComponent'

const asyncNewList = asyncComponent(() => {
  return import('./components/List/AddList')
})
const asyncList = asyncComponent(() => {
  return import('./containers/List')
})

class App extends Component {
  static contextType = AuthContext

  componentDidMount() {
    const { authCheckState, authState } = this.context
    authCheckState()
  }

  render() {
    const { authState } = this.context
    const isAuthenticated = Boolean(authState.token)
    console.log('isAuthenticated', isAuthenticated)
    let routes

    if (isAuthenticated) {
      routes = (
        <>
        <Route path="/auth" exact component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/lists" exact component={AllLists} />
        <Route path="/lists/:id" component={asyncList} />
        <Route path="/new-list" component={asyncNewList} />
        <Route path="/profile" component={Profile} />
        <Route path="/" exact component={AllLists} />
        </>
      )
    } else {
        routes = (<Route path="/auth" exact component={Auth} />)
    }


    return (
        <BrowserRouter>
              <Layout>
              <Switch>
                  {routes}
                  <Route render={() => <h3>Not fount</h3>} />
              </Switch>

              </Layout>
        </BrowserRouter>
    );
  }

}

export default App;
