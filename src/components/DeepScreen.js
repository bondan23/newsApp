import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Tabs } from '@navigators/AppNavigator';

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



const DeepScreen = ({navigation}) => {

const profile = Tabs.router.getActionForPathAndParams('Profile');
const state = Tabs.router.getStateForAction(profile);

return(
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Deep Screen
    </Text>
    <Button
      onPress={() => navigation.dispatch({
        type:'SpecialCase',
        payload:state.index
      })}
      title="Back to surface"
    />
  </View>
)};

DeepScreen.navigationOptions = {
  title: 'Deep Screen',
};

export default DeepScreen;
