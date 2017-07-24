import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  FlatList,
  Image,
  WebView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import Loading from '@components/ui/Loading';
import { NavigationActions } from 'react-navigation';
import logoParser from '@libs/logoParser';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  centered:{
    alignItems:'center',
    justifyContent:'center'
  },
});

class MainView extends Component{
  constructor(props){
    super(props);

    this.state = {
      loading:true,
      loadingMore:true
    }

    this.uri = []
    this.limit = 10;
    this.scrollLimiter = 1;

  }

  componentWillMount() {
    this.props.getNewsSource()
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.news.sources.status === 'ok'){
      this.scrollLimiter = 1;
      this.data = nextProps.news.sources.sources
      let limit = 1;
      this.data.map((v,k)=>{
        logoParser(v.url).then(({uri})=>{
          this.uri[v.id] = {
            uri
          }
          limit++;
          if(limit === this.data.length){
            this.setState({
              loading:false
            })
          }
        })
      })
    }
  }

  _onPressRow(id,sortBy){
    this.props.navigation.dispatch(
      NavigationActions.navigate({routeName: 'Article',params:{ id,sortBy }})
    )
  }

  _renderItem({item,index}){
    const uri = (typeof this.uri[item.id] !== 'undefined') ? this.uri[item.id].uri : 'https://indiecrowdfunder.azureedge.net/content/images/no-logo.png'
    return (
      <TouchableOpacity
        onPress={this._onPressRow.bind(this,item.id,item.sortBysAvailable[0])}
      >
        <View
          style={[
            {
              height:110,
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
                {item.name}
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
                  marginRight:5
                }}
              >
                <Text style={{color:'#14a0c9'}}>
                  View Articles Here
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _loadingFooter(){
    if(this.state.loadingMore === false) return null;
    return (
      <View
        style={{
          height:50,
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <ActivityIndicator size="small" animating />
      </View>
    )
  }

  _onScroll(event){
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.offset ? 'down' : 'up';
    var frameSizeHeight = event.nativeEvent.layoutMeasurement.height;
    var contentSizeHeight = event.nativeEvent.contentSize.height;
    var maxOffset = contentSizeHeight - frameSizeHeight;

    if(parseInt(currentOffset) === parseInt(maxOffset))
    {
      if(this.scrollLimiter === 1 && !this.props.news.sources.allLoaded){
        let page = this.props.news.sources.page;
        this.props.getNewsSource(page+1)
        this.scrollLimiter++;
      }else if(this.props.news.sources.allLoaded){
        this.setState({
          loadingMore:false
        })
      }
    }
  }

  render(){
    if(this.state.loading) return <Loading text={'Sources'}/>

    return(
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#00819D"
          barStyle="light-content"
        />
        <View style={{flex:1}}>
          <FlatList
            data={this.data}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, index) => index}
            ListFooterComponent={this._loadingFooter.bind(this)}
            onScroll={this._onScroll.bind(this)}
          />
        </View>
      </View>
    )
  }
}

MainView.navigationOptions = {
  title: 'Home Screen',
};

export default MainView;
