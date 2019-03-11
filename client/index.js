import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import 'babel-polyfill';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers/index';
import routes from './config/routes';
import { AUTH_USER } from './actions/types';
import { getCurrentUser } from './actions/users';
import { getBookings } from './actions/bookings';

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
require('./images/quality.png');
require('./images/hygiene.png');
require('./images/search.png');
require('./images/bell.png');
require('./images/loading.svg');
require('./images/catering.webp');
require('./images/catering-2.webp');
require('./images/chef.svg');
require('./images/food.png');
require('./images/review.png');
require('./images/phone.png');
require('./images/powered_by_stripe.svg');
require('./images/dinner.webp');
require('./images/tableware.webp');
require('./images/grow-your-business.webp');
require('./images/dining.webp');
require('./images/checklist.png');
require('./images/icon-facebook.png');
require('./images/icon-twitter.png');
require('./images/icon-instagram.png');
require('./images/icon-chefhat.png');
require('./images/icon-organic.png');
require('./images/icon-hands.png');
require('./images/icon-recycling.png');
require('./images/icon-healthy.png');
require('./images/location-grey.png');
require('./images/people-grey.png');
require('./images/money-grey.png');
require('./images/letter-grey.png');
require('./images/contact-grey.png');
require('./images/phone-grey.png');
require('./images/clock-grey.png');
require('./images/calendar-grey.png');
require('./images/event-poster.webp');
require('./images/icon-attachment.png');
require('./images/wedding.webp');
require('./images/wedding-2.webp');
require('./images/icon-camera.png');

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
    <Router onUpdate={function(){window.scrollTo(0, 0)}} history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app'));

