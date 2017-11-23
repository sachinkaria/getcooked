import axios from 'axios';
import { BOOKING_LIST, GET_BOOKING, SENT_BOOKING_REQUEST, RESET_BOOKING_REQUEST } from '../types';

const { errorHandler, successHandler } = require('../public');
const API_URL = 'http://localhost:3000';

export function createBooking(booking) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post(`${API_URL}/bookings/create`, booking, AUTH_HEADERS)
      .then(() => {
        dispatch({ type: SENT_BOOKING_REQUEST });
        successHandler(dispatch, 'Fantastic! You\'re booking request has been sent. You will be contacted shortly.');
        dispatch({ type: RESET_BOOKING_REQUEST });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your booking.');
      });
  };
}

export function getBookings() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`${API_URL}/bookings`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: BOOKING_LIST,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem getting your bookings.');
      });
  };
}

export function getBooking(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`${API_URL}/bookings/${id}`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_BOOKING,
          payload: response.data
        });
        dispatch(getBookings());
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem getting your booking.');
      });
  };
}

