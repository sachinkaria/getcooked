import React from 'react';
import { ReactRouter, Router, Route, hashHistory, IndexRoute } from 'react-router';
import ProfileList from '../containers/ProfileList';
import NavigationBar from '../components/NavigationBar';
import Bookings from '../components/Bookings';
import Profile from '../containers/Profile';
import Inbox from '../containers/Inbox';
import Chat from '../containers/Chat';
import Home from '../components/Home';

let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={NavigationBar}>
      <IndexRoute component={Home} />
        <Route path='/search' component={ProfileList}/>
        <Route path='/profile/:id' component={Profile}/>
        <Route path="/inbox" component={Inbox} />
        <Route path="/bookings" component={Bookings} />
        <Route path='/chat/:id' component={Chat}/>
    </Route>
  </Router>
);

module.exports = routes;