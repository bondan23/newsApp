import React from 'react';
import { Image,Platform,StyleSheet,Text } from 'react-native';
import Logo from '@images/qareer-logo.png';
{/*<Image source={Logo} resizeMode={'contain'} style={styles.logo} />*/}

const styles = StyleSheet.create({
  title:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold',
    marginLeft: (Platform.OS === 'ios') ? 0 : 5
  },
  logo:{
    height:36,
    width:84,
    ...Platform.select({
      android:{
        marginLeft:10
      }
    })
  }
})

const TitleLogo = ({title})=>{
  return(
    <Text style={styles.title}>
      {title}
    </Text>
  )
}


export default TitleLogo;
