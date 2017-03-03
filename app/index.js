var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
require('./styles/main.scss');
require('./images/logo-icon.png');
require('./images/1.jpg');
require('./images/2.jpg');
require('./images/3.jpg');
require('./images/4.jpg');

ReactDOM.render(routes, document.getElementById('app'));