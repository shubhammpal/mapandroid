import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {COLORS} from '../../../style';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
import {AirbnbRating, Rating} from 'react-native-ratings';

interface OrderCardType {
  header:string;
  image:any;
  onpress: () => void;
  discription:string;
  RatingPress: () =>void;
}

const ratingCompleted = (rating: any) => {
  
};
const OrdersCard:React.FC<OrderCardType> = ({header, image, onpress,discription,RatingPress}) => {
  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={onpress} style={styles.subContainer}>
        <View style={styles.imageTextContainer}>
          <FastImage
            style={styles.images}
            source={image}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <AppText size={18} family="PoppinsSemiB" color="#212121">
              {header}
            </AppText>

            <AppText size={14} family="PoppinsRegular" color="#212121">
              {discription}
            </AppText>

            <TouchableOpacity onPress={RatingPress}
              style={{
                marginTop: moderateScale(5),
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={0}
                size={13}
              />
              <AppText size={12} family="PoppinsRegular" color="#212121">
                Rate this Product
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    alignItems: 'flex-start',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(2),
    marginLeft: moderateScale(20),
  },
});

export default OrdersCard;
