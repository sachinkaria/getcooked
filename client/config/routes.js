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
import PersonalSetup from '../components/chefs/setup/personal';
import BasicSetup from '../components/chefs/setup/basics';
import FoodSetup from '../components/chefs/setup/food';
import ServicesSetup from '../components/chefs/setup/services';
import PhotosSetup from '../components/chefs/setup/photos';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Dashboard from '../components/chefs/Dashboard/index';
import AdminDashboard from '../components/admin/Dashboard/index';
import Home from '../components/Home';
import RequireAuth from '../components/auth/RequireAuth';
import RequireRole from '../components/auth/RequireRole';

const routes = (
  <Route path="/" component={NavigationBar}>
    <IndexRoute component={Home} />
    <Route path="/chefs" component={ProfileList} />
    <Route path="/chefs/:id" component={Profile} />
    <Route exact path="/inbox" component={RequireAuth(Inbox)} />
    <Route exact path="/bookings" component={RequireAuth(Bookings)} />
    <Route path="/conversation/:id" component={Conversation} />
    <Route exact path="/register" component={Register} redirect />
    <Route path="/chef/register" component={RegisterChef} />
    <Route path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route exact path="/setup/personal" component={PersonalSetup} />
    <Route exact path="/setup/basics" component={BasicSetup} />
    <Route exact path="/setup/photos" component={PhotosSetup} />
    <Route exact path="/setup/services" component={ServicesSetup} />
    <Route exact path="/setup/food" component={FoodSetup} />
    <Route exact path="/dashboard/profile/basics" component={RequireRole(Dashboard, 'chef')} view="basics" />
    <Route exact path="/dashboard/profile/service-type" component={RequireRole(Dashboard, 'chef')} view="service-type" />
    <Route exact path="/dashboard/profile/food-services" component={RequireRole(Dashboard, 'chef')} view="food-services" />
    <Route exact path="/dashboard/profile/photos" component={RequireRole(Dashboard, 'chef')} view="photos" />
    <Route exact path="/dashboard/account/settings" component={RequireAuth(Dashboard)} view="settings" />
    <Route exact path="/dashboard/account/password" component={RequireAuth(Dashboard)} view="password" />
    <Route exact path="/dashboard/bookings" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="bookings" />
    <Route path="/dashboard/bookings/:id" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="view-booking" />
    <Route exact path="/admin/dashboard/chefs" component={RequireRole(AdminDashboard, 'admin')} view="chefs" />
    <Route exact path="/admin/dashboard/users" component={RequireRole(AdminDashboard, 'admin')} view="users" />
    <Route path="/admin/dashboard/chefs/:id" component={RequireRole(Profile, 'admin')} view="chefs" />
  </Route>
);


export default routes;
