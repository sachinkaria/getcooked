import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers/index';
import routes from './config/routes';
import { AUTH_USER } from './actions/types';
import { getCurrentUser } from './actions/users';
import { getBookings } from './actions/bookings';

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
require('./images/icons/wedding-cake.png');
require('./images/default_profile.png');
require('./images/icon-edit.png');
require('./images/event.png');
require('./images/ingredients.png');
require('./images/search.png');
require('./images/bell.png');
require('./images/loading.svg');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.token;

if (token) {
  store.dispatch(getCurrentUser());
  store.dispatch(getBookings());
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));
