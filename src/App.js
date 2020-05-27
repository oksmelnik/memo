import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import AllLists from './containers/AllLists'
import Auth from './containers/Auth'
import Profile from './containers/Profile'
import Layout from './hoc/Layout'
import { AuthProvider }  from './services/AuthContext'
import asyncComponent from './hoc/asyncComponent'

const asyncNewList = asyncComponent(() => {
  return import('./components/List/AddList')
})
const asyncList = asyncComponent(() => {
  return import('./containers/List')
})

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Layout>
            <AuthProvider>
            <Switch>
                <Route path="/auth" exact component={Auth} />
                <Route path="/lists" exact component={AllLists} />
                <Route path="/lists/:id" component={asyncList} />
                <Route path="/new-list" component={asyncNewList} />
                <Route path="/profile" component={Profile} />
                <Route path="/" exact component={AllLists} />
                <Route render={() => <h3>Not fount</h3>} />
            </Switch>
            </AuthProvider>
            </Layout>
        </BrowserRouter>
    );
  }

}

export default App;
