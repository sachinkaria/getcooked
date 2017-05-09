import { LIST_CHEFS, GET_CHEF } from '../actions/types';

const INITIAL_STATE = { chefs: [], chef: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case LIST_CHEFS:
            return { ...state, chefs: action.payload };
        case GET_CHEF:
            return {...state, chef: action.payload };
    }
    return state;
}