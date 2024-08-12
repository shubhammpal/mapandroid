//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import CustomTotal from '../Common/CustomTotal';
import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
import CustomCardCheck from '../Checkout/CustomCardCheck';
import {CameraIconGrey, ProductIconBlue} from '../../../assets/svgImg/SvgImg';
import {COLORS} from '../../../style';
import {AirbnbRating} from 'react-native-ratings';
import {fonts} from '../../../utils/misc';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import { ProductReview } from '../../../services/marketplace_Services';


const OrderCompeleted = ({navigation}: any) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const handleRating = (rate: any) => {
    setRating(rate);
  };

  
  const Productreviews = async () => {
    const res = await ProductReview({
      product_id: 13,
      rating: rating,
      review_text: review,
    });
    if (res) {
      console.log('Review submitted', res);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader label="Order completed" navigation={navigation} />
      <Animated.ScrollView>
        <View style={styles.subcontainer}>
          <CustomCardCheck
            lefticon={<ProductIconBlue />}
            label={'Products'}
            discription="3 Products"
          />
          <View style={{flexDirection: 'row', marginLeft: moderateScale(50)}}>
            <Image
              style={{width: moderateScale(50), height: moderateScale(50)}}
              source={require('../../../assets/img/helmet1.png')}
            />
            <Image
              style={{width: moderateScale(50), height: moderateScale(50)}}
              source={require('../../../assets/img/helmet1.png')}
            />
          </View>

          <CustomTotal color="#646363" text="Subtotal:" price={20352} />
          <CustomTotal color="#646363" text="GST" price={2000} />
          <CustomTotal color="#646363" text="Delivery fee:" price={2000} />
          <CustomTotal color="#646363" text="Redeem Points" price={2000} />
          <View style={styles.total}>
            <AppText
              size={20}
              family="PoppinsBold"
              color="#646363"
              children={'Total'}
            />
            <AppText
              size={20}
              family="PoppinsBold"
              color="#646363"
              children={'₹ 22,352'}
            />
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <AppText size={20} family="PoppinsBold" color="#646363">
              How was your order?
            </AppText>
            <AirbnbRating
              onFinishRating={rate => {
                handleRating(rate);
              }}
              showRating={false}
              count={5}
              defaultRating={0}
              size={30}
            />

            <TouchableOpacity style={styles.addPhotoButton}>
              <CameraIconGrey />
              <Text style={styles.addPhotoText}>Add Photo</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.reviewInput}
              multiline
              numberOfLines={4}
              placeholder="How is the product? What do you like?"
              value={review}
              onChangeText={(text: any) => setReview(text)}
            />
          </View>
          <View style={{width: '100%', marginBottom: moderateScale(10)}}>
            <SubmitButton
              widthOf={'100%'}
              title="Rate Product"
              pressing={Productreviews}
            />
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(10),
  },
  total: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: COLORS.white,

    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPhotoButton: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#CBCBCB',
    padding: moderateScale(5),
    marginTop: 10,
    justifyContent: 'center',
  },
  addPhotoText: {
    marginLeft: 10,
    fontFamily: fonts.PoppinsSemiB,
    fontSize: 16,
    color: '#646363',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewInput: {
    width: '80%',
    height: moderateScale(150),
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
});

//make this component available to the app
export default OrderCompeleted;
