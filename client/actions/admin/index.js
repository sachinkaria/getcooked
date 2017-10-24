import axios from 'axios';
import { ADMIN_LIST_CHEFS, ADMIN_GET_CHEF, UPDATE_CHEF_LIST, ADMIN_LIST_USERS } from '../types';
import { errorHandler } from '../public';

const API_URL = 'http://localhost:3000';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };

export function adminListChefs() {
  return function (dispatch) {
    axios.get(`${API_URL}/admin/chefs`, AUTH_HEADERS)
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
  return function (dispatch) {
    axios.get(`${API_URL}/admin/users`, AUTH_HEADERS)
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
    axios.get(`${API_URL}/admin/chefs/${id}`)
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
  return function (dispatch) {
    axios.get(`${API_URL}/admin/chefs/${id}/${status}`, AUTH_HEADERS)
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