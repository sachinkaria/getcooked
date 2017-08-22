import axios from 'axios';
import { hashHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CURRENT_USER } from '../types';
import { errorHandler } from '../public';
// const errorHandler = require('../public').errorHandler;

const API_URL = 'http://localhost:3001';


export function loginUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/login`, { email, password })
      .then((response) => {
      console.log(response);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({ type: AUTH_USER });
        dispatch({type: CURRENT_USER, payload: response.data.user});
        hashHistory.push('/chefs');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser({ email, firstName, lastName, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/create`, { email, firstName, lastName, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({ type: AUTH_USER });
        hashHistory.push('/chefs');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerChef({ email, firstName, lastName, password, displayName, description }) {
  return function (dispatch) {
    axios.post(`${API_URL}/chefs/create`, { email, firstName, lastName, password, displayName, description })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch({ type: AUTH_USER });
        hashHistory.push('/basic-setup');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser() {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    delete localStorage.token;
    delete localStorage.user;
    hashHistory.push('/');
  };
}
