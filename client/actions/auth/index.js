import axios from 'axios';
import { hashHistory } from 'react-router';
import React from 'react';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, GET_BOOKINGS, GET_INBOX } from '../types';

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
        axios.post(`${API_URL}/users/login`, { email, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({ type: AUTH_USER });
                hashHistory.push('/chefs');
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerUser({ email, firstName, lastName, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/users/create`, { email, firstName, lastName, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({ type: AUTH_USER });
                hashHistory.push('/chefs');
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerChef({ email, firstName, lastName, password, displayName, description }) {
    return function(dispatch) {
        axios.post(`${API_URL}/chefs/create`, { email, firstName, lastName, password, displayName, description })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                dispatch({ type: AUTH_USER });
                hashHistory.push('/chefs');
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
        delete localStorage['user'];
        hashHistory.push('/');
    }
}