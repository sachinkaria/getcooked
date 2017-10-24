import axios from 'axios';
import {hashHistory} from 'react-router';
import {UPDATE_USER} from '../types';
import {errorHandler} from '../public';

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
        dispatch({ type: UPDATE_USER, payload: response.data });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry there was a problem with your account. Please sign in and try again.');
      });
  };
}

export function uploadToStream(file) {
  ss.createBlobReadStream(file).pipe(STREAM);
  ss(Socket).emit('upload-photos', STREAM, {
    name: file.name,
    type: file.type.split('/')[1],
    mimeType: file.type,
    length: file.size
  });
};

