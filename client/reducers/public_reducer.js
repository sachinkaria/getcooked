import { GET_CHEFS } from '../actions/types';

const INITIAL_STATE = { chefs: [] };

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case GET_CHEFS:
            return { ...state, chefs: action.payload };
    }

    return state;
}