import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, WebView, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 16 : 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class AppWebView extends Component {

  _back(){
    this.props.navigation.dispatch(
      NavigationActions.back()
    )
  }

  render(){
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    return(
      <View style={styles.container}>
        <View
          style={{
            alignItems:'flex-start',
            padding:5,
            borderBottomColor:'#bdbdbd',
            borderBottomWidth:1
          }}
        >
          <TouchableOpacity
            onPress={this._back.bind(this)}
            style={{
              backgroundColor:'#00a1c5',
              alignItems:'center',
              justifyContent:'center',
              padding:2.5,
              borderRadius:5
            }}
          >
            <Text
              style={{
                fontSize:16,
                fontWeight:'bold',
                color:'#fff'
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex:1}}>
          <WebView
            scalesPageToFit
            startInLoadingState
            source={{ uri: params.url }}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      </View>
    )
  }
}

AppWebView.navigationOptions = {
  title: 'Profile',
  header:null,
  mode:'modal'
};

export default AppWebView;
