import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ProfileList from '../containers/chefs/List';
import NavigationBar from '../components/NavigationBar';
import Bookings from '../components/bookings/List';
import Profile from '../containers/chefs/Profile';
import Inbox from '../components/messages/Inbox';
import Conversation from '../components/messages/Conversation';
import Register from '../components/auth/Register';
import RegisterChef from '../components/auth/chef/Register';
import PersonalSetup from '../components/users/chefs/setup/personal';
import BasicSetup from '../components/users/chefs/setup/basic';
import FoodSetup from '../components/users/chefs/setup/food';
import ServicesSetup from '../components/users/chefs/setup/services';
import PhotosSetup from '../components/users/chefs/setup/photos';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Home from '../components/Home';
import RequireAuth from '../components/auth/RequireAuth';

const routes = (
  <Route path="/" component={NavigationBar}>
    <IndexRoute component={Home} />
    <Route path="/chefs" component={ProfileList} />
    <Route path="/chefs/:id" component={Profile} />
    <Route path="/inbox" component={RequireAuth(Inbox)} />
    <Route path="/bookings" component={RequireAuth(Bookings)} />
    <Route path="/conversation/:id" component={Conversation} />
    <Route path="/register" component={Register} />
    <Route path="/chef/register" component={RegisterChef} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/setup-personal" component={PersonalSetup} />
    <Route path="/setup-basic" component={BasicSetup} />
    <Route path="/setup-photos" component={PhotosSetup} />
    <Route path="/setup-services" component={ServicesSetup} />
    <Route path="/setup-food" component={FoodSetup} />
  </Route>
);


export default routes;
