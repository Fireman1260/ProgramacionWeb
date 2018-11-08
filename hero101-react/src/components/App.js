import React, { Component } from 'react';
import logo from './logo.svg';
import propTypes from 'prop-types'

import './App.css';
import Content from '../components/Global/Content';

class App extends Component {
  static propTypes = {
    children: propTypes.object.isRequired
  };

  render() {
    const {children} = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hero 101</h1>
        </header>
        <Content body={children}></Content>
      </div>
    );
  }
}

export default App;
