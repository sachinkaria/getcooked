let React = require('react');
let ReactRouter = require('react-router');
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let hashHistory = ReactRouter.hashHistory;
let IndexRoute = ReactRouter.IndexRoute;
let ProfileList = require('../containers/ProfileList');
let Navigation = require('../components/Navigation');
let Profile = require('../components/Profile');

let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Navigation}>
      <IndexRoute component={ProfileList} />
        <Route path='/profile' component={Profile}/>
    </Route>
  </Router>
);

module.exports = routes;