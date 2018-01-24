import React from 'react';
import {Route, IndexRoute} from 'react-router';
import ProfileList from '../containers/chefs/List';
import NavigationBar from '../components/NavigationBar';
import Bookings from '../components/bookings/List';
import Profile from '../containers/chefs/Profile';
import Inbox from '../components/messages/Inbox';
import Register from '../components/auth/Register';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
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
import Caterer from '../components/Caterer';
import RequireAuth from '../components/auth/RequireAuth';
import RequireRole from '../components/auth/RequireRole';

const routes = (
  <Route path="/" component={NavigationBar}>
    <IndexRoute component={Home} />
    <Route path="/chefs" component={ProfileList} />
    <Route path="/chefs/:id" component={Profile} />
    <Route exact path="/inbox" component={RequireAuth(Inbox)}/>
    <Route exact path="/bookings" component={RequireAuth(Bookings)}/>
    <Route exact path="register" component={Register} redirect/>
    <Route exact path="forgot" component={ForgotPassword} />
    <Route exact path="reset/:token" component={ResetPassword} />
    <Route path="caterers">
      <Route path="about" component={Caterer} />
      <Route path="register" component={RegisterChef} />
    </Route>
    <Route path="/login" component={Login} />
    <Route exact path="/logout" component={Logout}  />
    <Route path="setup">
      <Route exact path="personal" component={PersonalSetup}/>
      <Route exact path="basics" component={BasicSetup}/>
      <Route exact path="photos" component={PhotosSetup}/>
      <Route exact path="services" component={ServicesSetup}/>
      <Route exact path="food" component={FoodSetup}/>
    </Route>
    <Route path="dashboard">
      <Route path="profile" >
        <Route path="basics" component={RequireRole(Dashboard, 'chef')} view="basics" />
        <Route path="service-type" component={RequireRole(Dashboard, 'chef')} view="service-type" />
        <Route path="food-services" component={RequireRole(Dashboard, 'chef')} view="food-services" />
        <Route path="photos" component={RequireRole(Dashboard, 'chef')} view="photos" />
      </Route>
      <Route path="account">
        <Route exact path="settings" component={RequireAuth(Dashboard)} view="settings" />
        <Route exact path="password" component={RequireAuth(Dashboard)} view="password" />
      </Route>
      <Route exact path="bookings" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="bookings"/>
      <Route path="bookings/:id" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="view-booking"/>
    </Route>
    <Route path="admin">
      <Route path="dashboard">
        <Route path="chefs" component={RequireRole(AdminDashboard, 'admin')} view="chefs"/>
        <Route path="users" component={RequireRole(AdminDashboard, 'admin')} view="users"/>
        <Route path="chefs/:id" component={RequireRole(Profile, 'admin')} view="chefs"/>
      </Route>
    </Route>
  </Route>
);


export default routes;
