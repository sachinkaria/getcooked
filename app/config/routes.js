import React from 'react';
import { ReactRouter, Router, Route, hashHistory, IndexRoute } from 'react-router';
import ProfileList from '../containers/ProfileList';
import Navigation from '../components/Navigation';
// let Navigation = require('../components/Navigation');
// let Profile = require('../containers/Profile');
// let Inbox = require('../containers/Inbox');
// let Chat = require('../containers/Chat');

let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Navigation}>
      <IndexRoute component={ProfileList} />
        {/*<Route path='/profile/:id' component={Profile}/>*/}
        {/*<Route path="/inbox" component={Inbox} />*/}
        {/*<Route path='/chat/:id' component={Chat}/>*/}
    </Route>
  </Router>
);

module.exports = routes;