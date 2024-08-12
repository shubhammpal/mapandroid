import React from 'react';
import {View, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Card} from 'react-native-paper';
import {COLORS} from '../../../style';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';


const truncateText = (text: any, limit: any) => {
  const words = text.split(' ');
  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return text;
};

const FavouriteCard = ({text, image, price,icon,rating}: any) => {
  return (
    <Card style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.imageTextContainer}>
          <FastImage
            style={styles.images}
            source={image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <AppText size={14} family="PoppinsRegular" color="#646363">
              {truncateText(text, 4)}
            </AppText>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <AppText size={16} color="#646363" family="PoppinsRegular">
                {'₹ ' + price}
              </AppText>
              <View style={styles.ratingContainer}>
              <Image source={require('../../../assets/img/star1.png')} style={{height:14 ,width:14}} />

                <AppText family="PoppinsRegular" size={15}>
                  {' '}
                  {rating}
                </AppText>
              </View>
            </View>
          </View>
          {icon}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    position: 'relative',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  images: {
    height: moderateScale(60),
    width: moderateScale(60),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(10),
  },
  textContainer: {
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(2),
    marginLeft: moderateScale(20),
  },
});

export default FavouriteCard;
