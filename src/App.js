import React, { Component } from 'react';
import './App.css';
import { Frame } from './components/frame/frame.component';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { DashBoard } from './screens/dashboard/dashboard.component';

class App extends Component {
  render() {
    return (
     
      <Router>
        <Frame /> 
        <Switch>

          <Route path="/" exact>
            <DashBoard/>
          </Route>

        </Switch>
    </Router>
    );
  }
}

export default App;
