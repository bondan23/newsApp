import { combineReducers } from 'redux';

import auth from '@redux/auth/reducer';
import nav from '@redux/nav/reducer';
import news from '@redux/news/reducer';

const AppReducer = combineReducers({
  nav,
  auth,
  news
});

export default AppReducer;
