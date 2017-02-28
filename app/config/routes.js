var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory = ReactRouter.hashHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../containers/Main');
var Navigation = require("../components/Navigation");

var routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Navigation}>
      <IndexRoute component={Main} />
    </Route>
  </Router>
);

module.exports = routes;