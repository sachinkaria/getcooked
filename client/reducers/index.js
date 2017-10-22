import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import publicReducer from './public_reducer';
import userReducer from './user_reducer';
import adminReducer from './admin_reducer';

const rootReducer = combineReducers({
  public: publicReducer,
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  form: formReducer
});

export default rootReducer;
