import React from 'react';
import { ReactRouter, Route, IndexRoute } from 'react-router';
import ProfileList from '../containers/ProfileList';
import NavigationBar from '../components/NavigationBar';
import Bookings from '../components/Bookings';
import Profile from '../containers/Profile';
import Inbox from '../containers/Inbox';
import Chat from '../containers/Chat';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import Home from '../components/Home';
import RequireAuth from '../components/auth/RequireAuth';

let routes = (
    <Route path='/' component={NavigationBar}>
      <IndexRoute component={Home} />
        <Route path='/search' component={ProfileList}/>
        <Route path='/profile/:id' component={Profile}/>
        <Route path="/inbox" component={Inbox} />
        <Route path="/bookings" component={RequireAuth(Bookings)} />
        <Route path='/chat/:id' component={Chat}/>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
    </Route>
);

export default routes;