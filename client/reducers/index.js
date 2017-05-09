import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import publicReducer from './public_reducer';

const rootReducer = combineReducers({
    public: publicReducer,
    auth: authReducer,
    form: formReducer
});

export default rootReducer;