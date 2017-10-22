import { ADMIN_LIST_CHEFS, ADMIN_GET_CHEF } from '../actions/types';

const INITIAL_STATE = { chefs: [], chef: null };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADMIN_LIST_CHEFS:
      return { ...state, chefs: action.payload };
    case ADMIN_GET_CHEF:
      return { ...state, chef: action.payload };
    default:
      break;
  }
  return state;
}
