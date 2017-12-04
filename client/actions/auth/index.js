import axios from 'axios';
import { hashHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, UPDATE_USER } from '../types';
import { errorHandler } from '../public';
import { getCurrentUser } from '../users';

export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post('/api/users/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        getCurrentUser();
        hashHistory.push('/chefs');
      })
      .catch(() => {
        const ERROR = 'Sorry the email or password was incorrect. Please try again.';
        errorHandler(dispatch, ERROR);
      });
  };
}

export function registerUser({ email, password }, redirect) {
  return (dispatch) => {
    axios.post('api/users/create', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        if (redirect) {
          hashHistory.push('/setup/personal');
        }
      })
      .catch((error) => {
        errorHandler(dispatch, 'There was a problem signing up. Please try again.');
      });
  };
}

export function registerChef({ email, password }) {
  return (dispatch) => {
    axios.post('/api/chefs/create', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        dispatch({ type: AUTH_USER });
        hashHistory.push('/setup/personal');
      })
      .catch((error) => {
        errorHandler(dispatch, 'There was a problem signing up. Please try again.');
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({ type: UNAUTH_USER });
    dispatch({ type: UPDATE_USER, payload: null });
    delete localStorage.token;
    hashHistory.push('/');
  };
}
