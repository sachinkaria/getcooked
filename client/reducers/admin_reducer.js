import _ from 'lodash';
import { ADMIN_LIST_CHEFS, ADMIN_GET_CHEF, UPDATE_CHEF_LIST } from '../actions/types';

const INITIAL_STATE =  { chefs: [], chef: null };
let CHEFS = [];
let INDEX = null;

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADMIN_LIST_CHEFS:
      return { ...state, chefs: action.payload };
    case UPDATE_CHEF_LIST:
      CHEFS = state.chefs;
      INDEX = _.findIndex(CHEFS, (chef => chef._id === action.id));
      state.chefs.splice(INDEX, 1, action.payload);
      return { ...state };
    case ADMIN_GET_CHEF:
      return { ...state, chef: action.payload };
    default:
      break;
  }
  return state;
}