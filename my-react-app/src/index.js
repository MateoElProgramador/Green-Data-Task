import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import './stylesheets/index.sass';
import Login from './classes/Login';
import Profile from './classes/Profile';
import reportWebVitals from './reportWebVitals';

// TODO: Routes don't work yet
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path='/' component={Login} />
      <Route path='/profile' component={Profile} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
