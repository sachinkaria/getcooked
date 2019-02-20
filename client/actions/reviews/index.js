import axios from 'axios';
import { BOOKING_LIST, GET_BOOKING } from '../types';

const { errorHandler, successHandler } = require('../public');

export function createReview(review, id, bookingId) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post(`/api/chefs/${id}/bookings/${bookingId}/reviews`, review, AUTH_HEADERS)
      .then((response) => {
        successHandler(dispatch, 'Thank you. Your review was saved.');
        dispatch({
          type: GET_BOOKING,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your booking.');
      });
  };
}

export function getReviews(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/chef/${id}/reviews`, AUTH_HEADERS)
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

