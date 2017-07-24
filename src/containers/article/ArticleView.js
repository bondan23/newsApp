import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Keyboard, Platform } from 'react-native';
import Loading from '@components/ui/Loading';
import { NavigationActions } from 'react-navigation';
import SearchBarButton from '@components/ui/SearchBarButton';
import { SearchBar } from 'react-native-elements'
import _ from 'lodash';

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

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <SearchBarButton navigation={navigation} screenProps={screenProps} />,
  });

  constructor(props){
    super(props);

    this.state = {
      loading:true,
      searchText:'',
      keyboardheight:0,
      refreshing:false
    }

    this.data = [];
    this.searchData = [];
  }

  componentWillMount() {
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.props.getNewsList(params.id,params.sortBy)

  }

  _keyboardDidShow (e) {
    this.setState({
      keyboardheight:e.endCoordinates.height
    })
  }

  _keyboardDidHide () {
    this.setState({
      keyboardheight:0
    })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.news.articles.status === 'ok'){
      this.data = nextProps.news.articles.articles
      this.setState({
        loading:false,
        refreshing:false
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

  _onSearchChange(val){
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    if(val === ''){

      this.searchData = [
        ...this.data
      ]

    }else{

      var results=_.filter(this.data,function(item){
        return item.title.indexOf(val)>-1;
      });

      this.searchData = [
        ...results
      ]
    }

    this.setState({
      searchText:val
    })
  }

  _onRefresh(){
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    this.setState({
      refreshing:true
    })

    this.props.getNewsList(params.id,params.sortBy)
  }

  render(){
    const { navigation } = this.props;
    const { state : { params , routeName } } = navigation;

    if(this.state.loading) return <Loading text={'Articles'} />

    return(
      <View
        style={[
          styles.container,
          {
            marginBottom:this.state.keyboardheight
          }
        ]}
      >
        {
          (params.openSearchBar)?
            (
              <SearchBar
                lightTheme
                onChangeText={this._onSearchChange.bind(this)}
                value={this.state.searchText}
                placeholder='Search Here...'
                inputStyle={{
                  paddingTop:(Platform.OS === 'ios')?0:6
                }}
                noIcon
              />
            )
          :
            null
        }
        <FlatList
          data={(this.searchData.length === 0 )?this.data:this.searchData}
          keyExtractor={(item,index) => index }
          renderItem={this._renderItem.bind(this)}
          onRefresh={this._onRefresh.bind(this)}
          refreshing={this.state.refreshing}
        />
      </View>
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
}

export default Article;
