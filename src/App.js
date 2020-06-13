import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AllLists from './containers/AllLists'
import Logout  from './containers/Auth/Logout'
import Layout from './hoc/Layout'
import { AuthContext } from './services/authContext/AuthContext'
import { withListsFromProps } from './services/listsContext'
import asyncComponent from './hoc/asyncComponent'
import Practice from "./containers/Practice"

const asyncNewList = asyncComponent(() => {
  return import('./components/List/AddList')
})
const AsyncList = asyncComponent(() => {
  return import('./containers/List')
})

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
})

const asyncProfile = asyncComponent(() => {
  return import('./containers/Profile')
})

class App extends Component {
  static contextType = AuthContext

  state = {
    authChecked: false
  }

  async componentDidMount() {
    const { authCheckState } = this.context
    await authCheckState()
    this.setState({ authChecked: true })
  }

  render() {
    const { authState } = this.context
    const isAuthenticated = Boolean(authState.token)
    let routes

    if (this.state.authChecked) {
      if (isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/auth" exact component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/lists" exact component={AllLists} />
            <Route path={`/lists/:id/practice`} exact component={Practice} />
            <Route path="/lists/:id" component={() => <AsyncList token={authState.token}/>} />
            <Route path="/new-list" component={asyncNewList} />
            <Route path="/profile" component={asyncProfile} />
            <Route path="/" exact component={AllLists} />
            <Route render={() => <h3>Not fount</h3>} />
          </Switch>
        )
      } else {
          routes = (
            <Switch>
              <Route path="/auth" exact component={asyncAuth} />
              <Redirect to="/auth" />
              <Route render={() => <h3>Not fount</h3>} />
            </Switch>
          )
      }
    }

    return (
        <BrowserRouter>
          <Layout>
            {routes}
          </Layout>
        </BrowserRouter>
    );
  }
}

export default withListsFromProps(App);
