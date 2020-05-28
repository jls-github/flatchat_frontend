import React, { Component } from 'react';
import Home from './containers/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter as Router, Route } from 'react-router-dom';
// import AuthWrapper from './HOCs/AuthWrapper'



const App = () =>  {
    return (
          <Router>
            <div>
              <Route exact path='/' component={Login} />
              <Route path='/home' component={Home}/>
              <Route path='/signup' component={Signup} />
            </div>
          </Router>
      );
}

export default App;
