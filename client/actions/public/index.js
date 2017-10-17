import axios from 'axios';
import { LIST_CHEFS, GET_CHEF, SHOW_ERROR, HIDE_ERROR } from '../types';
import { logoutUser } from '../auth';

const API_URL = 'http://localhost:3000';

export function errorHandler(dispatch, error) {
  if (error) {
    dispatch({
      type: SHOW_ERROR,
      payload: error
    });
    logoutUser();
    setTimeout(() => {
      dispatch({
        type: HIDE_ERROR,
        payload: null
      });
    }, 5000);
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
        errorHandler(dispatch, error.response);
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
