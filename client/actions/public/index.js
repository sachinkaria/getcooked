import axios from 'axios';
import { LIST_CHEFS, GET_CHEF, SHOW_ERROR, HIDE_ERROR } from '../types';
import { logoutUser } from '../auth';

const API_URL = 'http://localhost:3001';

export function errorHandler(dispatch, error) {
  let errorMessage = null;
  if (error && error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error && error.status === 401) {
    dispatch({
      type: SHOW_ERROR,
      payload: 'Oops you are authenticated. Please login and try again.'
    });
    logoutUser();
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR,
        payload: ''
      });
    }, 5000);
  } else {
    dispatch({
      type: SHOW_ERROR,
      payload: errorMessage
    });
  }
}


export function listChefs() {
  return function (dispatch) {
    axios.get(`${API_URL}/chefs`)
      .then((response) => {
        dispatch({
          type: LIST_CHEFS,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function getChef(id) {
  return function (dispatch) {
    axios.get(`${API_URL}/chefs/${id}`)
      .then((response) => {
        dispatch({
          type: GET_CHEF,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
