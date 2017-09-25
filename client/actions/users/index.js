import axios from 'axios';
import { hashHistory } from 'react-router';
import { UPDATE_USER } from '../types';
import { errorHandler } from '../public';
// const errorHandler = require('../public').errorHandler;

const API_URL = 'http://localhost:3001';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };

export function updateUser(user, url) {
  return function (dispatch) {
    axios.put(`${API_URL}/users`, user, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        hashHistory.push(url);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}


export function getCurrentUser() {
  return function (dispatch) {
    axios.get(`${API_URL}/users/me`, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}

