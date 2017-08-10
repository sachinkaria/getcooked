import axios from 'axios';
import React from 'react';
import { LIST_CHEFS, GET_CHEF } from '../types';
import { logoutUser } from '../auth/index';

const API_URL = 'http://localhost:3001';

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type,
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
        // errorHandler(dispatch, error.response, AUTH_ERROR)
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
        // errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  };
}
