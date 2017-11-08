import axios from 'axios';
import { GET_BOOKINGS, AUTH_ERROR } from '../types';
const errorHandler = require('../public').errorHandler;

const API_URL = 'http://localhost:3000';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };

export function createBooking(booking) {
  console.log('action create booking triggered', booking);
  return function (dispatch) {
    axios.post(`${API_URL}/bookings/create`, booking, AUTH_HEADERS)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your booking.');
      });
  };
}

export function getBookings() {
  return function (dispatch) {
    axios.get(`${API_URL}/bookings`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_BOOKINGS,
          payload: response.data.bookings
        });
      })
      .catch((error) => {
        errorHandler(dispatch, 'Sorry, there was a problem getting your bookings.');
      });
  };
}
