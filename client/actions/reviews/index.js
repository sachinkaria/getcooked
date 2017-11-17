import axios from 'axios';
import { BOOKING_LIST, GET_BOOKING, SENT_BOOKING_REQUEST, RESET_BOOKING_REQUEST } from '../types';

const { errorHandler, successHandler } = require('../public');
const API_URL = 'http://localhost:3000';

export function createReview(review, id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post(`${API_URL}/chefs/${id}/reviews/create`, review, AUTH_HEADERS)
      .then(() => {
        successHandler(dispatch, 'Thank you. Your review was saved.');
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your booking.');
      });
  };
}

export function getReviews(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`${API_URL}/chef/${id}/reviews`, AUTH_HEADERS)
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

