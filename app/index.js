var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
require('./styles/main.scss');
require('./images/logo-icon.png');

ReactDOM.render(routes, document.getElementById('app'));