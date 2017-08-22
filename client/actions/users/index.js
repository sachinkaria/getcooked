import axios from 'axios';
import { hashHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../types';
import { errorHandler } from '../public';
// const errorHandler = require('../public').errorHandler;

const API_URL = 'http://localhost:3001';

export function updateUser({ user }, url) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/update`, { user })
      .then((response) => {
        console.log(response);
        hashHistory.push(url);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}

