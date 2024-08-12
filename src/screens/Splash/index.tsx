import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import { height, width } from '../../style/typography';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <FastImage
          style={{ height: height, width: width }}
   
          source={require('../../assets/img/BikerSplashImage.png')}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <LinearGradient
      colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.6)']}
      style={{position:'absolute',height:height,width:width}}>
      <View style={styles.logoView}>
            <Image source={require('../../assets/img/bikelogo.png')} style={styles.logoImage} resizeMode='contain' />
          </View>
        </LinearGradient>
    </View>
  );
};

export default SplashScreen;