import React, { Component } from 'react';
import './App.css';
import EditList from './containers/EditList'
import Layout from './components/Layout'

class App extends Component {

  render() {
    return (
        <Layout>
          <EditList />
        </Layout>
    );
  }

}

export default App;
