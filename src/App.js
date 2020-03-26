import React, { Component } from 'react';
import './App.css';
import { Frame } from './components/frame/frame.component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { DashBoard } from './screens/dashboard/dashboard.component';
import { ConfigEncrypt } from './screens/config_encrypt/config_encrypt.component';

class App extends Component {
  render() {
    
    return (
     
      <Router>
        <Frame /> 
        <Switch>

          <Route path="/" exact component={DashBoard}/>
            


          <Route path="/configencrypt" component={ConfigEncrypt}/>
        

        </Switch>
    </Router>
    );
  }
}

export default App;
