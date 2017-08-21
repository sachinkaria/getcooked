import { AUTH_USER, UNAUTH_USER, SHOW_ERROR, HIDE_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', authenticated: false };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case SHOW_ERROR:
      return { ...state, error: action.payload };
    case HIDE_ERROR:
      return {...state, error: action.payload };
    default:
      break;
  }
  return state;
}
