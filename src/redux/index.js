import { combineReducers } from 'redux';

import auth from '@redux/auth/reducers';
import nav from '@redux/nav/reducers';

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
