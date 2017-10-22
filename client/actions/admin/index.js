import axios from 'axios';
import { ADMIN_LIST_CHEFS, ADMIN_GET_CHEF } from '../types';
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
