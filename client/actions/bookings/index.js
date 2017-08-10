import axios from 'axios';
import { GET_BOOKINGS, AUTH_ERROR } from '../types';

const errorHandler = require('../public').errorHandler();

const API_URL = 'http://localhost:3001';

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
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
