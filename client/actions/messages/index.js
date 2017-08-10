import axios from 'axios';
import React from 'react';
import { GET_INBOX, GET_CONVERSATION } from '../types';
import { hashHistory } from 'react-router';

const API_URL = 'http://localhost:3001';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };

export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if (error.status === 401) {
    dispatch({
      type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type,
      payload: errorMessage
    });
  }
}


export function getConversations() {
  return function (dispatch) {
    axios.get(`${API_URL}/conversations`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_INBOX,
          payload: response.data
        });
      })
      .catch((error) => {
        // errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  };
}

export function getConversation(_id) {
  return function (dispatch) {
    axios.get(`${API_URL}/conversations/${_id}/messages`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_CONVERSATION,
          payload: response.data
        });
      })
      .catch((error) => {
        // errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  };
}

export function createConversation({ body, _recipient }) {
  return function () {
    axios.post(`${API_URL}/conversations/create`, { _recipient }, AUTH_HEADERS)
      .then((response) => {
        const _conversationId = response.data._id;
        _newMessage({ _conversationId, body });
      })
      .catch((error) => {
        // errorHandler(dispatch, error.response, AUTH_ERROR)
      });
  };
}


export function sendMessageUpdateConversation({ _conversationId, body }) {
  return function (dispatch) {
    return _sendMessage({ _conversationId, body }).then((response) => {
      dispatch(getConversation(response.data._conversation));
    });
  };
}

function _newMessage({ _conversationId, body }) {
  axios.post(`${API_URL}/conversations/${_conversationId}/messages/create`, { body }, AUTH_HEADERS)
    .then((response) => {
      hashHistory.push(`/conversation/${_conversationId}`);
    })
    .catch((error) => {
      // errorHandler(dispatch, error.response, AUTH_ERROR)
    });
}

function _sendMessage({ _conversationId, body }) {
  return axios.post(`${API_URL}/conversations/${_conversationId}/messages/create`, { body }, AUTH_HEADERS);
}

