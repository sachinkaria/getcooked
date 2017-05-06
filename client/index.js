import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers/index';
import routes from'./config/routes';
import { Router, hashHistory } from 'react-router';
import cookie, { Cookies } from 'react-cookie';
import { AUTH_USER } from './actions/types';

require('./styles/main.scss');
require('./images/logo-icon.png');
require('./images/1.jpg');
require('./images/2.jpg');
require('./images/3.jpg');
require('./images/4.jpg');
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

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// console.log(cookie);
const token = localStorage['token'];

if (token) {
    store.dispatch({ type: AUTH_USER });
    console.log(store.getState());
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory} routes={routes} />
    </Provider>,
    document.getElementById('app'));