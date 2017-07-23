import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, addNavigationHelpers, StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import LoginScreen from '@components/LoginScreen';
import MainScreen from '@components/MainScreen';
import ProfileScreen from '@components/ProfileScreen';
import TestScreen from '@components/TestScreen';
import DeepScreen from '@components/DeepScreen';
import TitleLogo from '@components/TitleLogo';

export const Tabs = TabNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: {
        tabBarLabel: 'Home',
        headerTitle:<TitleLogo />,
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
        tabBarLabel: 'Profile',
        headerTitle:<TitleLogo />,
    }
  }
},{
    tabBarComponent: ({jumpToIndex, ...props, navigation}) => (
        <TabBarBottom
            {...props}
            jumpToIndex={index => {
                //const key = navigation.state.routes[navigation.state.index].key;
                //navigation.dispatch(NavigationActions.setParams({key,params:{goToTop:true}}))
                jumpToIndex(index)
            }}
        />

    ),
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: 'none'
});

export const AppNavigator = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Main: {
    screen: MainScreen,
    navigationOptions:{
      headerTitle:<TitleLogo />,
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      headerTitle:<TitleLogo />,
    }
  },
  Test: { screen: TestScreen },
  Deep: { screen: DeepScreen },
  Tabs : {
    screen : Tabs
  }
},{
  navigationOptions:{
    headerBackTitle:null,
    headerTintColor:'white',
    headerStyle:{
      backgroundColor:'#14a0c9'
    }
  },
  transitionConfig: () => ({
      screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const { index } = scene;

          const translateX = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [layout.initWidth, 0, 0]
          });

          const opacity = position.interpolate({
              inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
              outputRange: [0, 1, 1, 0.3, 0]
          });

          return { opacity, transform: [{ translateX }] }
      }
  })
});

class AppWithNavigationState extends Component{
  shouldCloseApp(nav) {
    return nav.index == 0;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      const {dispatch, nav} = this.props

      if (this.shouldCloseApp(nav)) return false

      dispatch({
        type: 'Navigation/BACK'
      })

      return true
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

  render(){
    const { dispatch, nav } = this.props

    return(
      <AppNavigator
        navigation={addNavigationHelpers({ dispatch, state : nav })}
      />
    )

  }
}

/*const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);*/

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
