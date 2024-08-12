//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import {
  FavouriteIcon,
   FavouriteIconWhite,
   LocationHomeIcon,
   Navigation,
  SmallLocationIcon,
  TimeHomeIcon,
  TimeIcon,
} from '../../../assets/svgImg/SvgImg';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {COLORS, ms} from '../../../style';

interface TopRouteCardProps{
    place: string;
    time: number | string;
    distance: string;
    onpress: () => void;
}
const TopRoutesCard = ({place,placeName,time,distance,onpress}:TopRouteCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8}
      onPress={onpress} 
    style={styles.contentContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={place}
        />
        <View style={styles.iconContainer}>
          <FavouriteIconWhite />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(8),
            left: moderateScale(8),
          }}>
          <AppText size={13} color="white" family="PoppinsBold">
            {placeName}
          </AppText>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
           marginTop: 8,
          paddingHorizontal: moderateScale(12),
        }}>
        <View style={{flexDirection: 'row'}}>
          <LocationHomeIcon />
          <AppText size={11} horizontal={5} color="white" family="PoppinsBold">
            {distance}
          </AppText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TimeHomeIcon />
          <AppText size={11} horizontal={8} color="white" family="PoppinsBold">
            {time}
          </AppText>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Navigation />
          <AppText
            size={11}
            horizontal={8}
            color="#00BBE5"
            family="PoppinsBold">
            Navigate Me
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 22,
    paddingHorizontal: moderateScale(18),
  },
  imageContainer: {
    height: 162,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: moderateScale(11),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: moderateScale(11),
  },
  iconContainer: {
    position: 'absolute',
    top: moderateScale(8), // Adjust as necessary
    right: moderateScale(8), // Adjust as necessary
  },
});

//make this component available to the app
export default TopRoutesCard;
