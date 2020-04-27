import React, { Component } from 'react';
import './App.css';
import EditList from './containers/EditList'
import AllLists from './containers/AllLists'
import Layout from './hoc/Layout'
import {BrowserRouter, Route} from 'react-router-dom'

class App extends Component {

  render() {
    return (
        <BrowserRouter>
            <Layout>
                <Route path="/" exact component={AllLists} />
                <Route path="/:id" component={EditList} />
            </Layout>
        </BrowserRouter>
    );
  }

}

export default App;
