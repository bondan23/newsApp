import React,{Component} from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { connect } from 'react-redux';
import API,{ Fetcher } from '@libs/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

class MainScreen extends Component{
  componentWillMount() {
    const req = Fetcher('newsapi.articles.get').param({params:{'source':'the-next-web','sortBy':'latest'}})
    req.then((res)=>{
      console.log(res)
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#00819D"
          barStyle="light-content"
        />
        <Text>
          Hello World
        </Text>
      </View>
    )
  }
}

MainScreen.navigationOptions = {
  title: 'Home Screen',
};

export default MainScreen;
