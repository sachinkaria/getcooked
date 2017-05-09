import axios from 'axios';
import React from 'react';
import { GET_CHEFS } from '../types';

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


export function getChefs() {
    return function(dispatch) {
        axios.get(`${API_URL}/chefs`)
            .then(response => {
                dispatch({
                    type: GET_CHEFS,
                    payload: response.data
                });
            })
            .catch((error) => {
                // errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}
