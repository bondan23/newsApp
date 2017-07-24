import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '@navigators/AppNavigator';

const onPress = (navigation) => {
  navigation.dispatch(
    NavigationActions.setParams({
      params:{ openSearchBar: true },
      key:navigation.state.key
    })
  )
}

const searchBarButton = ({navigation,screenProps}) => {
  return(
    <TouchableOpacity
      style={{
        flex:1,
        width:30,
        alignItems:'center',
        justifyContent:'center'
      }}
      onPress={() => onPress(navigation)}
    >
      <Icon name="search" size={18} color='#FFF'/>
    </TouchableOpacity>
  )
}


export default searchBarButton;
