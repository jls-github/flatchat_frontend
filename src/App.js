import React, { Component } from 'react';
import Home from './containers/Home'
import Login from './components/Login'
import {BrowserRouter as Router, Route } from 'react-router-dom';



class App extends Component {

  render() {
    return (
          <Router>
            <div>

              <Route path='/' component={Login} />
              <Route path='/home' component={Home} />
            </div>
          </Router>
      );
  }
}

export default App;
