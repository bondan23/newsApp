import React,{Component} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import LoginStatusMessage from './LoginStatusMessage';
import AuthButton from './AuthButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class MainScreen extends Component{
  componentDidMount() {
    console.log('mounted')
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  componentWillUnmount() {
    console.log('unmounted')
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#00819D"
          barStyle="light-content"
        />
        <LoginStatusMessage />
        <AuthButton />
      </View>
    )
  }
}

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
