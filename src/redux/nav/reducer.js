import { StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '@navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
// get state for doing some action from
const tempNavState = AppNavigator.router.getStateForAction(firstAction);

const secondAction = AppNavigator.router.getActionForPathAndParams('Login');

export const initialNavState = AppNavigator.router.getStateForAction(
  firstAction
);

export default function navReducers(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index:0,
          actions: [
            NavigationActions.navigate({ routeName : 'Tabs' })
          ]
        }),
        state
      );
      break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.reset({
          index:0,
          actions: [
            NavigationActions.navigate({ routeName : 'Main' })
          ]
        }),
        state
      );
      break;
    case 'SpecialCase':
      console.log(state,'asi')
      return {
        index:0,
        routes:[
          {
            ...state.routes[0],
            index:action.payload
          }
        ]
      }
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
