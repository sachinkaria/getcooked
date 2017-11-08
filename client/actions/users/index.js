import axios from 'axios';
import { hashHistory } from 'react-router';
import { UPDATE_USER, PROCESSING_FILE_UPLOAD, COMPLETED_FILE_UPLOAD } from '../types';
import { errorHandler, successHandler } from '../public';

const API_URL = 'http://localhost:3000';

export function updateUser(user, url, showSuccess) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    axios.put(`${API_URL}/users`, user, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        if (showSuccess) successHandler(dispatch, 'Your changes have been successfully saved.');
        if (url) hashHistory.push(url);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response);
      });
  };
}

export function uploadPhoto(file, type) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    dispatch(processingFileUpload());
    axios.post(`${API_URL}/users/photos/${type}`, file, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        dispatch(completedFileUpload());
        // hashHistory.push(url);
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem saving your image. Please try again.');
        dispatch(completedFileUpload());
      });
  };
}

export function uploadMultiplePhotos(file) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    dispatch(processingFileUpload());
    axios.post(`${API_URL}/users/photos`, file, AUTH_HEADERS)
      .then(() => {
        dispatch(completedFileUpload());
        dispatch(getCurrentUser());
        // hashHistory.push(url);
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem saving your image. Please try again.');
        dispatch(completedFileUpload());
      });
  };
}

export function processingFileUpload() {
  return ({ type: PROCESSING_FILE_UPLOAD });
}

export function completedFileUpload() {
  return ({ type: COMPLETED_FILE_UPLOAD });
}

export function deletePhoto(type) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    axios.delete(`${API_URL}/users/photos/${type}`, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        // hashHistory.push(url);
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a deleting your image. Please try again.');
      });
  };
}

export function deleteMultiple(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    axios.delete(`${API_URL}/users/photos/${id}`, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
        // hashHistory.push(url);
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a deleting your image. Please try again.');
      });
  };
}


export function getCurrentUser() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    axios.get(`${API_URL}/users/me`, AUTH_HEADERS)
      .then((response) => {
        dispatch({ type: UPDATE_USER, payload: response.data });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry there is a problem getting your account details. Please sign in and try again.');
      });
  };
}

export function updatePassword(password, showSuccess) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    axios.put(`${API_URL}/users/password`, password, AUTH_HEADERS)
      .then(() => {
        if (showSuccess) successHandler(dispatch, 'Your password has been updated.');
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem changing your password. Please try again.');
      });
  };
}

