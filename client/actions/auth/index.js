import axios from 'axios';
import { hashHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, UPDATE_USER } from '../types';
import { errorHandler } from '../public';
import { getCurrentUser } from '../users';

const API_URL = 'http://localhost:3000';


export function loginUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/users/login`, { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        getCurrentUser();
        window.location.reload();
        hashHistory.push('/chefs');
      })
      .catch(() => {
        const ERROR = 'Sorry the email or password was incorrect. Please try again.';
        errorHandler(dispatch, ERROR);
      });
  };
}

export function registerUser({ email, firstName, lastName, password }) {
  return (dispatch) => {
    axios.post(`${API_URL}/users/create`, { email, firstName, lastName, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        hashHistory.push('/chefs');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerChef({ email, firstName, lastName, password, displayName, description }) {
  return (dispatch) => {
    axios.post(`${API_URL}/chefs/create`, { email, firstName, lastName, password, displayName, description })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: UPDATE_USER, payload: response.data.user });
        dispatch({ type: AUTH_USER });
        hashHistory.push('/setup/personal');
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
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
