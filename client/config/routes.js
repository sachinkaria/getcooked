import React from 'react';
import { ReactRouter, Route, IndexRoute } from 'react-router';
import ProfileList from '../components/chefs/List';
import NavigationBar from '../components/NavigationBar';
import Bookings from '../components/bookings/List';
import Profile from '../components/chefs/Profile';
import Inbox from '../components/Inbox';
import Conversation from '../components/Conversation';
import Register from '../components/auth/Register';
import RegisterChef from '../components/auth/chef/Register';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Home from '../components/Home';
import RequireAuth from '../components/auth/RequireAuth';

let routes = (
    <Route path='/' component={NavigationBar}>
      <IndexRoute component={Home} />
        <Route path='/chefs' component={ProfileList}/>
        <Route path='/chefs/:id' component={Profile}/>
        <Route path="/inbox" component={RequireAuth(Inbox)} />
        <Route path="/bookings" component={RequireAuth(Bookings)} />
        <Route path='/conversation/:id' component={Conversation}/>
        <Route path="/register" component={Register} />
        <Route path="/chef/register" component={RegisterChef} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
    </Route>
);

export default routes;