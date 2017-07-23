import React from 'react';
import { Image,Platform,StyleSheet } from 'react-native';
import Logo from '@images/qareer-logo.png';

const TitleLogo = ()=>{
  return(
    <Image source={Logo} resizeMode={'contain'} style={styles.logo} />
  )
}

const styles = StyleSheet.create({
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

export default TitleLogo;
