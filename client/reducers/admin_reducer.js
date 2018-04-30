import { ADMIN_LIST_CHEFS, ADMIN_LIST_USERS, ADMIN_GET_CHEF, UPDATE_CHEF_LIST, ADMIN_LIST_EVENTS, ADMIN_LIST_BOOKINGS } from '../actions/types';

const INITIAL_STATE = { chefs: [], chef: null, users: [], events: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADMIN_LIST_CHEFS:
      return { ...state, chefs: action.payload };
    case ADMIN_LIST_USERS:
      return { ...state, users: action.payload };
    case ADMIN_LIST_EVENTS:
      return { ...state, events: action.payload };
    case ADMIN_LIST_BOOKINGS:
      return { ...state, bookings: action.payload };
    case UPDATE_CHEF_LIST:
      return {
        ...state,
        chefs: state.chefs.map((chef) => {
          return chef._id === action.id ? action.payload : chef;
        })
      };
    case ADMIN_GET_CHEF:
      return { ...state, chef: action.payload };
    default:
      break;
  }
  return state;
}