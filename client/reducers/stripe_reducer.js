import {
  UPDATE_SOURCE,
  UPDATE_SUBSCRIPTION,
  UPDATE_END_DATE
} from '../actions/types';

const INITIAL_STATE = { card: null, plan: null, end_date: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_SOURCE:
      return { ...state, card: action.payload };
    case UPDATE_SUBSCRIPTION:
      return { ...state, plan: action.payload };
    case UPDATE_END_DATE:
      return { ...state, end_date: action.payload };
    default:
      break;
  }
  return state;
}
