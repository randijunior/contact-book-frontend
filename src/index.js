import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Home from './Home';
import DialogUser from './DialogUser';
import SignUp from './SignUp';

function App() {
    return(
        <Router>
        <Switch>
        <PrivateRoute exact path="/" component={Home}/>
        <Route path="/login" component={Login}/> 
        <Route path="/dialog" component={DialogUser} />
        <Route path="/signup" component={SignUp}/>
        </Switch>
        </Router>
    )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
