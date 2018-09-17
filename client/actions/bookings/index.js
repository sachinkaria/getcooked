import axios from 'axios';
import { BOOKING_LIST, GET_BOOKING, SENT_BOOKING_REQUEST, RESET_BOOKING_REQUEST } from '../types';

const { errorHandler, successHandler } = require('../public');

export function createBooking(booking) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post('/api/bookings/create', booking, AUTH_HEADERS)
      .then(() => {
        dispatch({ type: SENT_BOOKING_REQUEST });
        successHandler(dispatch, 'Fantastic! Your booking request has been sent. You will be contacted shortly.');
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
    axios.get('/api/bookings', AUTH_HEADERS)
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
    axios.get(`/api/bookings/${id}`, AUTH_HEADERS)
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

export function update(id, booking) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post(`/api/bookings/${id}`, booking, AUTH_HEADERS)
      .then(() => {
        dispatch(getBooking(id));
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem. Please refresh and try again.');
      });
  };
}

export function accept(id, message) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post(`/api/bookings/${id}/accept`, { message }, AUTH_HEADERS)
      .then(() => {
        dispatch(getBooking(id));
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem. Please refresh and try again.');
      });
  };
}

export function decline(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/bookings/${id}/decline`, AUTH_HEADERS)
      .then(() => {
        dispatch(getBooking(id));
      })
      .catch(() => {
        errorHandler(dispatch, 'There was a problem. Please refresh and try again.');
      });
  };
}
