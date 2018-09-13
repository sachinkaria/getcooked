import axios from 'axios';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { READ_EVENT, LIST_EVENTS, SENT_BOOKING_REQUEST, RESET_BOOKING_REQUEST } from '../types';

const { errorHandler, successHandler } = require('../public');

export function getEvents() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get('/api/events', AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: LIST_EVENTS,
          payload: response.data
        });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem getting your bookings.');
      });
  };
}


export function readEvent(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/events/${id}`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: READ_EVENT,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, 'Sorry, there was a problem getting your event.');
      });
  };
}

export function createEvent(event, endRoute) {
  const USER = JSON.parse(localStorage.getItem('user'));
  const FINAL_EVENT = _.extend(event, { user: USER._id });

  return function (dispatch) {
    axios.post('/api/events/create', FINAL_EVENT)
      .then(() => {
        dispatch({ type: SENT_BOOKING_REQUEST });
        successHandler(dispatch, 'Fantastic! Your event request has been sent. You will be contacted shortly.');
        endRoute && browserHistory.push(endRoute);
        dispatch({ type: RESET_BOOKING_REQUEST });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your event.');
      });
  };
}
