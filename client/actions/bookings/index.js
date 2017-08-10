import axios from 'axios';
import React from 'react';
import { GET_BOOKINGS } from '../types';

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


export function getBookings() {
  return function (dispatch) {
    axios.get(`${API_URL}/bookings`, {
      headers: { Authorization: localStorage.token }
    })
      .then((response) => {
        dispatch({
          type: GET_BOOKINGS,
          payload: response.data.bookings
        });
      })
      .catch((error) => {
        // errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  };
}
