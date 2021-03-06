import axios from 'axios';
import { getCurrentUser } from '../users';
import { update, confirm } from '../bookings';
import { UPDATE_SOURCE, UPDATE_SUBSCRIPTION, UPDATE_END_DATE } from '../types';

const { errorHandler, successHandler } = require('../public');

export function getSource(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/stripe/sources/${id}`, AUTH_HEADERS).then((res) => {
      dispatch({
        type: UPDATE_SOURCE,
        payload: res.data.card
      });
    }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem getting your card details.');
    });
  };
}

export function getSubscription(id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.get(`/api/stripe/subscriptions/${id}`, AUTH_HEADERS).then((res) => {
      dispatch({
        type: UPDATE_SUBSCRIPTION,
        payload: res.data.plan
      });
      dispatch({
        type: UPDATE_END_DATE,
        payload: res.data.currentPeriodEnd
      });
    }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem getting your subscription details.');
    });
  };
}

export function createSource(source, amount, id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post('/api/stripe/sources', source, AUTH_HEADERS).then(() => {
      dispatch(makePayment(amount, id));
    }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem saving your cards details.');
    });
  };
}

export function makePayment(amount, id) {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post('/api/stripe/payments', { amount }, AUTH_HEADERS)
      .then(() => {
        const depositAmount = parseInt(amount);
        const quoteAmount = parseInt(amount) * 20;
        heap.track('Confirmed Event', { depositAmount, quoteAmount});
        dispatch(confirm(id, { status: 'confirmed' }));
      }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem saving your cards details.');
    });
  };
}


export function cancelSubscription() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post('/api/stripe/subscriptions/cancel', {}, AUTH_HEADERS).then(() => {
      getCurrentUser();
      successHandler(dispatch, 'Your subscription has successfully been cancelled.');
    }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem saving your cards details.');
    });
  };
}

export function resumeSubscription() {
  const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
  return function (dispatch) {
    axios.post('/api/stripe/subscriptions/resume', {}, AUTH_HEADERS).then(() => {
      getCurrentUser();
      successHandler(dispatch, 'Your subscription has successfully been resumed.');
    }).catch(() => {
      errorHandler(dispatch, 'Sorry, there was a problem saving your cards details.');
    });
  };
}
