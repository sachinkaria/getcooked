import React from 'react';
import { Route, IndexRoute } from 'react-router';
import ProfileList from '../containers/chefs/List';
import NavigationBar from '../components/NavigationBar';
import Terms from '../components/Terms';
import Privacy from '../components/Privacy';
import GetQuote from '../components/GetQuote';
import Bookings from '../components/bookings/List';
import Profile from '../containers/chefs/Profile';
import Inbox from '../components/messages/Inbox';
import ForgotPassword from '../components/auth/ForgotPassword';
import ResetPassword from '../components/auth/ResetPassword';
import RegisterChef from '../components/auth/chef/Register';
import PersonalSetup from '../components/chefs/setup/personal';
import BasicSetup from '../components/chefs/setup/basics';
import FoodSetup from '../components/chefs/setup/food';
import ServicesSetup from '../components/chefs/setup/services';
import PhotosSetup from '../components/chefs/setup/photos';
import PaymentSetup from '../components/chefs/setup/payment';
import Login from '../components/auth/Login';
import Logout from '../components/auth/Logout';
import Dashboard from '../components/chefs/Dashboard/index';
import AdminDashboard from '../components/admin/Dashboard/index';
import Home from '../components/Home/';
import Caterer from '../components/Caterer/';
import RequireAuth from '../components/auth/RequireAuth';
import RequireRole from '../components/auth/RequireRole';
import StripeWrapper from '../components/StripeWrapper';
import BookingACaterer from '../components/Blog/7-things-to-know-about-catering';
import SustainableCatering from '../components/Blog/What-is-sustainable-catering';
import Blockchain from '../components/Blog/How-blockchain-can-change-the-supply-chain';
import FoodWaste from '../components/Blog/How-is-technology-helping-us-reduce-food-waste';
import CateringBudget from '../components/Blog/5-things-to-consider-when-planning-your-event-catering-budget';
import Blog from '../components/Blog/List';
import SupperClubEvent from '../components/Events/The-urban-farming-debate';
import { Wedding } from '../components/LandingPages';

const routes = (
  <Route path="/" component={NavigationBar}>
    <IndexRoute component={Home} />
    <Route path="/caterers/profile/:id" component={Profile} />
    <Route path="/terms" component={Terms} />
    <Route path="/privacy" component={Privacy} />
    <Route path="/get-quotes" component={GetQuote} />
    <Route path="services">
      <Route path="weddings" component={Wedding} />
    </Route>
    <Route exact path="/inbox" component={RequireAuth(Inbox)} />
    <Route exact path="/bookings" component={RequireAuth(Bookings)} />
    <Route exact path="forgot" component={ForgotPassword} />
    <Route exact path="reset/:token" component={ResetPassword} />
    <Route path="/caterers" component={ProfileList} />
    <Route path="caterers">
      <Route path="about" component={Caterer} />
      <Route path="register" component={RegisterChef} />
    </Route>
    <Route path="events">
      <Route path="supper-club-the-urban-farming-debate" component={SupperClubEvent} />
    </Route>
    <Route path="/blog" component={Blog} />
    <Route path="blog">
      <Route exact path="7-things-to-consider-when-booking-a-caterer" component={BookingACaterer} />
      <Route exact path="what-is-sustainable-catering" component={SustainableCatering} />
      <Route exact path="how-blockchain-can-change-the-food-supply-chain" component={Blockchain} />
      <Route exact path="how-is-technology-helping-us-reduce-food-waste" component={FoodWaste} />
      <Route exact path="5-things-to-consider-when-planning-your-catering-budget" component={CateringBudget} />
    </Route>
    <Route path="/login" component={Login} />
    <Route exact path="/logout" component={Logout} />
    <Route path="setup">
      <Route exact path="personal" component={PersonalSetup} />
      <Route exact path="basics" component={BasicSetup} />
      <Route exact path="photos" component={PhotosSetup} />
      <Route exact path="services" component={ServicesSetup} />
      <Route exact path="food" component={FoodSetup} />
      <Route exact path="payment" component={StripeWrapper(PaymentSetup)} />
    </Route>
    <Route path="dashboard">
      <Route path="profile" >
        <Route path="basics" component={RequireRole(Dashboard, 'chef')} view="basics" />
        <Route path="summary" component={RequireAuth(Dashboard)} view="summary" />
        <Route path="service-type" component={RequireRole(Dashboard, 'chef')} view="service-type" />
        <Route path="food-services" component={RequireRole(Dashboard, 'chef')} view="food-services" />
        <Route path="photos" component={RequireRole(Dashboard, 'chef')} view="photos" />
      </Route>
      <Route path="account">
        <Route exact path="settings" component={RequireAuth(Dashboard)} view="settings" />
        <Route exact path="password" component={RequireAuth(Dashboard)} view="password" />
        {/*<Route exact path="subscription" component={RequireRole(Dashboard, 'chef')} view="subscription" />*/}
      </Route>
      <Route exact path="events" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="events" />
      <Route path="events/:id" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="view-event" />
      <Route path="events/:eventId/bookings/:id" component={RequireAuth(Dashboard)} expandView hideProfileStatus hideSidebar view="view-booking" />
      <Route exact path="bookings" component={RequireAuth(Dashboard)} hideProfileStatus hideSidebar view="bookings" />
      <Route path="bookings/:id" component={RequireAuth(Dashboard)} expandView hideProfileStatus hideSidebar hideLogout view="view-booking" />
    </Route>
    <Route path="admin">
      <Route path="dashboard">
        <Route path="chefs" component={RequireRole(AdminDashboard, 'admin')} view="chefs" />
        <Route path="users" component={RequireRole(AdminDashboard, 'admin')} view="users" />
        <Route path="events" component={RequireRole(AdminDashboard, 'admin')} view="events" />
        <Route path="bookings" component={RequireRole(AdminDashboard, 'admin')} view="bookings" />
        <Route path="caterers/profile/:id" component={RequireRole(Profile, 'admin')} view="chefs" />
      </Route>
    </Route>
  </Route>
);


export default routes;