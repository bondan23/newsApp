import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const TestScreen = ({navigation}) => (
  <View style={styles.container}>
    <Button
      onPress={() => navigation.dispatch(NavigationActions.navigate({ routeName : 'Deep' })) }
      title="Go to Deep"
    />
  </View>
);

TestScreen.navigationOptions = {
  title: 'Test',
};

export default TestScreen;
