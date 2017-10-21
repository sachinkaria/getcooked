import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers/index';
import routes from './config/routes';
import { AUTH_USER } from './actions/types';
import { getCurrentUser } from './actions/users';

require('./styles/main.scss');
require('./images/logo-icon.png');
require('./images/1.jpg');
require('./images/2.jpg');
require('./images/3.jpg');
require('./images/4.jpg');
require('./images/cover-photo.jpg');
require('./images/chef.svg');
require('./images/barbecue.svg');
require('./images/vegan.svg');
require('./images/cake.svg');
require('./images/cocktail.svg');
require('./images/food/food-1.jpg');
require('./images/food/food-2.jpg');
require('./images/food/food-3.jpg');
require('./images/food/food-4.jpg');
require('./images/food/food-5.jpg');
require('./images/icons/wedding-cake.png');
require('./images/default_profile.png');
require('./images/icon-edit.png');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.token;

if (token) {
  store.dispatch(getCurrentUser());
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
