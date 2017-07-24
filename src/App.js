/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { NavigationActions } from 'react-navigation';

import AppReducer from '@redux/';
import AppWithNavigationState from '@navigators/AppNavigator';
import { initialNavState } from '@redux/nav/reducer';
import { initialAuthState } from '@redux/auth/reducer';

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const screenTracking = ({ getState }) => next => (action) => {
  /*if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK && action.type !== 'Login') {
    return next(action);
  }*/

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    // the line below uses the Google Analytics tracker
    // change the tracker here to use other Mobile analytics SDK.
    console.log(nextScreen)
  }

  return result;
};

const initialState = {
  nav:initialNavState,
  auth:initialAuthState,
  news:{
    sources:{},
    articles:{}
  }
}

const midlleware = [
  thunk,
  logger,
  screenTracking
]

const enchancer = applyMiddleware(...midlleware);

const store = createStore(AppReducer,initialState,enchancer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
