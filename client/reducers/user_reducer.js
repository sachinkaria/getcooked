import { CURRENT_USER, GET_BOOKINGS, GET_INBOX, GET_CONVERSATION } from '../actions/types';

const INITIAL_STATE = { bookings: [], inbox: [], conversation: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, user: action.payload };
    case GET_BOOKINGS:
      return { ...state, bookings: action.payload };
    case GET_INBOX:
      return { ...state, inbox: action.payload };
    case GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    default:
      break;
  }

  return state;
}
