import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const {app} = window.require('electron').remote;
const crypto = require("crypto");

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
        </div>
        <p className="App-intro">
          {crypto.getCiphers()}
          
          <b> Version: {app.getVersion()} </b>
          
          
        </p>
      </div>
    );
  }
}

export default App;
