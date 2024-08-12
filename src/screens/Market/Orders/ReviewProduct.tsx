//import liraries
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import {AirbnbRating} from 'react-native-ratings';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import {Card} from 'react-native-paper';
import {COLORS} from '../../../style';
import {strings} from '../../../utils/strings';

const ReviewProduct = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <SimpleHeader label="Review Products" navigation={navigation} />
      <Animated.ScrollView style={styles.subcontainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingVertical: 5,
          }}>
          <AirbnbRating
            showRating={false}
            count={5}
            defaultRating={0}
            size={30}
          />
          <View style={{marginVertical: 10}}>
            <AppText size={20} family="PoppinsBold" color="#646363">
              You are awesome!
            </AppText>
          </View>
          <View
            style={{
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AppText size={18} family="PoppinsRegular" color="#646363">
              Thanks for sending your
            </AppText>
            <AppText size={18} family="PoppinsRegular" color="#646363">
              valuable time
            </AppText>
          </View>
        </View>
        <AppText size={16} family="PoppinsSemiB" color="#646363">
          Review your earlier purchases
        </AppText>
        <Card style={styles.cardstyles}>
          <View style={styles.imageTextContainer}>
            <FastImage
              style={styles.images}
              source={require('../../../assets/img/helmet1.png')}
              resizeMode="contain"
            />
            <View style={styles.textContainer}>
              <AppText size={14} family="PoppinsMedium" color="#212121">
                SMK Allterra Off Road Tribou GL 527 Helmets
              </AppText>

              <AirbnbRating
                showRating={false}
                count={5}
                defaultRating={0}
                size={15}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(strings.ORDER_COMPLETED_SCREEN);
                }}>
                <AppText size={14} family="PoppinsMedium" color="#1E9BFC">
                  Write a review
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(50),
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
  cardstyles: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    position: 'relative',
    marginTop: moderateScale(15),
  },
});

//make this component available to the app
export default ReviewProduct;
