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

require('babel-polyfill');
require('./styles/main.scss');
require('./images/logo-icon.png');
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
require('./images/catering.jpg');
require('./images/catering-2.jpg');
require('./images/chef.svg');
require('./images/food.png');
require('./images/review.png');
require('./images/phone.png');
require('./images/powered_by_stripe.svg');
require('./images/dinner.jpg');
require('./images/grow-your-business.jpg');

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

heap.load(process.env.REACT_APP_HEAP);

window.Intercom("boot", {
  app_id: process.env.REACT_APP_INTERCOM_ID
});


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

