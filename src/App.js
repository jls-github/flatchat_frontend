import React, { Component } from 'react';
<<<<<<< HEAD
import ConversationsContainer from './containers/ConversationsContainer'
import { ActionCableConsumer } from 'react-actioncable-provider';
import MessageContainer from './containers/MessageContainer';
import Cable from './components/Cable';
import { API_ROOT, HEADERS } from './constraints/index'

const actioncable = require("actioncable")
=======
import Home from './containers/Home'
import Login from './components/Login'
import {BrowserRouter as Router, Route } from 'react-router-dom';
>>>>>>> 8a0f27862fc4038a93616fd7ba8c662a83943d7f



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
