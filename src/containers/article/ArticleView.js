import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Loading from '@components/ui/Loading';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

class Article extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading:true
    }
  }
  componentWillMount() {
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    this.props.getNewsList(params.id,params.sortBy)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.news.articles.status === 'ok'){
      this.data = nextProps.news.articles.articles
      this.setState({
        loading:false
      })
    }
  }

  _openWebView(url){
    this.props.navigation.dispatch(
      NavigationActions.navigate({routeName: 'WebView', params: { url }})
    )
  }

  _renderItem({item,index}){
    const uri = item.urlToImage;

    return (
      <TouchableOpacity onPress={this._openWebView.bind(this,item.url)}>
        <View
          style={[
            {
              minHeight:110,
              borderBottomColor:'#bdbdbd',
              borderBottomWidth:1,
              paddingVertical:5
            },
            (index === 0)?
            {
              borderTopColor:'#bdbdbd',
              borderTopWidth:1
            }
            :
            {}
          ]}
        >
          <View style={{flexDirection:'row'}}>
            <View
              style={{
                width:100,
                height:100
              }}
            >
              <Image source={{uri}} style={{width:100,height:100}} resizeMode={'contain'} />
            </View>
            <View
              style={{
                flex:1,
                marginLeft:10
              }}
            >
              <Text
                style={{
                  fontWeight:'bold',
                  fontSize:16
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  marginTop:5
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View
                style={{
                  flex:1,
                  alignItems:'flex-end',
                  justifyContent:'center',
                  marginRight:5,
                  marginVertical:5
                }}
              >
                <Text style={{color:'#14a0c9'}}>
                  View Detail Here
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render(){
    if(this.state.loading) return <Loading text={'Articles'} />
    console.log(this.data)
    return(
      <View
        style={[styles.container]}
      >
        <FlatList
          data={this.data}
          keyExtractor={(item,index) => index }
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    )
  }
}

Article.navigationOptions = {
  title: 'Profile'
};

export default Article;
