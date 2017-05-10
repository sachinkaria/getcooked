import axios from 'axios';
import React from 'react';
import { GET_INBOX } from '../types';

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


export function getConversations() {
    return function(dispatch) {
        axios.get(`${API_URL}/conversations`, {
            headers: { 'Authorization': localStorage['token'] }
        })
            .then(response => {
                dispatch({
                    type: GET_INBOX,
                    payload: response.data
                });
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}