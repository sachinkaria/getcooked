var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var ProfileList = require('../containers/ProfileList');
var Navigation = require("../components/Navigation");

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Navigation}>
      <IndexRoute component={ProfileList} />
    </Route>
  </Router>
);

module.exports = routes;