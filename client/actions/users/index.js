import axios from 'axios';
import { hashHistory } from 'react-router';
import { CURRENT_USER, UPDATE_USER, UPLOAD_PHOTO } from '../types';
import { errorHandler } from '../public';
// const errorHandler = require('../public').errorHandler;

const API_URL = 'http://localhost:3000';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };

export function updateUser(user, url) {
  return function (dispatch) {
    axios.put(`${API_URL}/users`, user, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        if (url) hashHistory.push(url);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}

export function uploadPhoto(file, type) {
  return function (dispatch) {
    axios.post(`${API_URL}/users/upload-photo/${type}`, file, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        // hashHistory.push(url);
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
        dispatch({ type: CURRENT_USER, payload: response.data });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}

