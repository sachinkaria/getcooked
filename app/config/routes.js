let React = require('react');
let ReactRouter = require('react-router');
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;
let hashHistory = ReactRouter.hashHistory;
let IndexRoute = ReactRouter.IndexRoute;
let ProfileList = require('../containers/ProfileList');
let Navigation = require('../components/Navigation');
let Profile = require('../containers/Profile');
let Inbox = require('../containers/Inbox');

let routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Navigation}>
      <IndexRoute component={ProfileList} />
        <Route path='/profile/:id' component={Profile}/>
        <Route path="/inbox" component={Inbox} />
    </Route>
  </Router>
);

module.exports = routes;