import React, { Component } from 'react';
import './App.css';

//functional imports
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//components
import Login from './Components/Login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
            path="login"
            component={Login}
            exact
            />
            <Route
            component={Login}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
