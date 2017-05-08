import axios from 'axios';
import { hashHistory } from 'react-router';
import React from 'react';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, GET_BOOKINGS, GET_INBOX } from './types';

const API_URL = 'http://localhost:3001';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}

export function loginUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/login`, { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: AUTH_USER });
                hashHistory.push('/search');
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerUser({ email, firstName, lastName, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: AUTH_USER });
                hashHistory.push('/search');
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerChef({ email, firstName, lastName, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/chef/register`, { email, firstName, lastName, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: AUTH_USER });
                hashHistory.push('/search');
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        delete localStorage['token'];
        hashHistory.push('/');
    }
}

export function getBookings() {
    return function(dispatch) {
        axios.get(`${API_URL}/bookings`, {
            headers: { 'Authorization': localStorage['token'] }
        })
            .then(response => {
                dispatch({
                    type: GET_BOOKINGS,
                    payload: response.data.bookings
                });
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function getInbox() {
    return function(dispatch) {
        axios.get(`${API_URL}/inbox`, {
            headers: { 'Authorization': localStorage['token'] }
        })
            .then(response => {
                dispatch({
                    type: GET_INBOX,
                    payload: response.data.inbox
                });
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}