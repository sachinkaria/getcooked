import axios from 'axios';
import { hashHistory } from 'react-router';
import { GET_INBOX, GET_CONVERSATION, AUTH_ERROR } from '../types';

const API_URL = 'http://localhost:3001';
const AUTH_HEADERS = { headers: { Authorization: localStorage.token } };
const errorHandler = require('../public').errorHandler();

export function getConversations() {
  return (dispatch) => {
    axios.get(`${API_URL}/conversations`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_INBOX,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function getConversation(_id) {
  return (dispatch) => {
    axios.get(`${API_URL}/conversations/${_id}/messages`, AUTH_HEADERS)
      .then((response) => {
        dispatch({
          type: GET_CONVERSATION,
          payload: response.data
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function createConversation({ body, _recipient }) {
  return (dispatch) => {
    axios.post(`${API_URL}/conversations/create`, { _recipient }, AUTH_HEADERS)
      .then((response) => {
        const _conversationId = response.data._id;
        _newMessage({ _conversationId, body });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}


export function sendMessageUpdateConversation({ _conversationId, body }) {
  return (dispatch) => {
    return _sendMessage({ _conversationId, body }).then((response) => {
      dispatch(getConversation(response.data._conversation));
    });
  };
}

function _newMessage({ _conversationId, body }) {
  return (dispatch) => {
    axios.post(`${API_URL}/conversations/${_conversationId}/messages/create`, { body }, AUTH_HEADERS)
      .then(() => {
        hashHistory.push(`/conversation/${_conversationId}`);
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

function _sendMessage({ _conversationId, body }) {
  return axios.post(`${API_URL}/conversations/${_conversationId}/messages/create`, { body }, AUTH_HEADERS);
}

