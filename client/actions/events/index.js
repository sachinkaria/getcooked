import axios from 'axios';
import { SENT_BOOKING_REQUEST, RESET_BOOKING_REQUEST } from '../types';

const { errorHandler, successHandler } = require('../public');

export function createEvent(event) {
  return function (dispatch) {
    axios.post('/api/events/create', event)
      .then(() => {
        dispatch({ type: SENT_BOOKING_REQUEST });
        successHandler(dispatch, 'Fantastic! Your event request has been sent. You will be contacted shortly.');
        dispatch({ type: RESET_BOOKING_REQUEST });
      })
      .catch(() => {
        errorHandler(dispatch, 'Sorry, there was a problem creating your event.');
      });
  };
}
