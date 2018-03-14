import axios from 'axios';
import { ADMIN_LIST_CHEFS, ADMIN_GET_CHEF, UPDATE_CHEF_LIST, ADMIN_LIST_USERS } from '../types';
import { errorHandler, processingFileUpload, completedFileUpload } from '../public';

export function adminListChefs() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get('/api/admin/chefs', AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: ADMIN_LIST_CHEFS,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry there was an error.');
      });
  };
}

export function adminListUsers() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get('/api/admin/users', AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: ADMIN_LIST_USERS,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry there was an error.');
      });
  };
}

export function adminGetChef(id) {
  return function (dispatch) {
    axios.get(`/api/admin/chefs/${id}`)
      .then((response) => {
        dispatch({
          type: ADMIN_GET_CHEF,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem. Please refresh and try again.');
      });
  };
}

export function updateStatus(status, id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/admin/chefs/${id}/${status}`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: UPDATE_CHEF_LIST,
          id: response.data._id,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem. Please refresh and try again.');
      });
  };
}

export function adminUploadPhotos(files, id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.getItem('token') } };
  return function (dispatch) {
    dispatch(processingFileUpload());
    axios.all(files.map(file => axios.post(`/api/admin/chefs/${id}/photos`, file, AUTH_HEADERS)))
      .then(() => {
        dispatch(completedFileUpload());
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem saving your image. Please try again.');
        dispatch(completedFileUpload());
      });
  };
}