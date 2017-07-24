/**
 * Loading Screen
 *
     <Loading text={'Server is down'} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, StatusBar, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  },
  centered:{
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle:{
    marginTop:10
  }
})

/* Component ==================================================================== */
const Loading = ({ text, transparent, networkIndicator }) => (
  <View
    style={[styles.container,styles.centered]}
  >
    <ActivityIndicator animating size={'large'}/>
    <Text
      style={styles.textStyle}
    >
      Loading {text}
    </Text>
  </View>
);

Loading.propTypes = { text: PropTypes.string, transparent: PropTypes.bool, networkIndicator: PropTypes.bool };
Loading.defaultProps = { text: null, transparent: false, networkIndicator: true };
Loading.componentName = 'Loading';

/* Export Component ==================================================================== */
export default Loading
