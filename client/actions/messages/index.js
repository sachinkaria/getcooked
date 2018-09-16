import axios from 'axios';
import { AUTH_ERROR } from '../types';
import { getBooking } from '../bookings';

const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
const errorHandler = require('../public').errorHandler;


function create(id, message, eventId) {
  return (dispatch) => {
    axios.post(`/api/bookings/${id}/messages`, { message, eventId }, AUTH_HEADERS)
      .then(() => {
        dispatch(getBooking(id));
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  }
}

exports.create = create;
