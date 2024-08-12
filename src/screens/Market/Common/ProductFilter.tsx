import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import AppText from '../../../component/AppText/AppText';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import RangeSliderView from '../components/CustomSlider';
import {COLORS} from '../../../style';

const ProdutFilter = ({
  filters,
  setFilters,
  applyFilters,
  handleResetFilter,
}: any) => {
  const [miniMum, setMiniMum] = useState<any>(filters.price_min || 0);
  const [maximum, setMaximum] = useState<any>(filters.price_max || 50000);
  const [selectedRating, setSelectedRating] = useState<string>(
    filters.star || '',
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    filters.gender || '',
  );
  const [selectorder, setorder] = useState<string>(filters.order || '');

  const handleApplyFilters = () => {
    const newFilters: any = {
      price_min: miniMum ?? 0,
      price_max: maximum,
      star: selectedRating,
      gender: selectedGender,
      order: selectorder,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleRatingSelection = (rating: string) => {
    setSelectedRating(rating === selectedRating ? '' : rating);
  };

  const handleGenderSelection = (gender: string) => {
    setSelectedGender(gender === selectedGender ? '' : gender);
  };

  const handleOrderSelection = (order: string) => {
    setorder(order === selectorder ? '' : order);
  };

  

  return (
    <BottomSheetScrollView>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <AppText size={20} family="PoppinsSemiB">
            Filter
          </AppText>
        </View>
        <View>
          <AppText size={16} family="PoppinsSemiB">
            Select Price Range
          </AppText>
          <View style={styles.slidercontainer}>
            <RangeSliderView
              miniMum={miniMum}
              maximum={maximum}
              setMiniMum={setMiniMum}
              setMaximum={setMaximum}
            />
          </View>
          <AppText size={16} family="PoppinsSemiB">
            Rating
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: moderateScale(5),
            }}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity
                key={star}
                style={[
                  styles.ratingContainer,
                  selectedRating === star.toString() && {
                    backgroundColor: COLORS.blue,
                  },
                ]}
                onPress={() => handleRatingSelection(star.toString())}>
                <Image
                  source={require('../../../assets/img/star1.png')}
                  style={{height: 14, width: 14}}
                />

                <AppText
                  color={
                    selectedRating === star.toString()
                      ? COLORS.white
                      : COLORS.black
                  }>
                  {star} Star
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
          <AppText size={16} family="PoppinsSemiB">
            Gender
          </AppText>
          <View style={{flexDirection: 'row'}}>
            {['Male', 'Female', 'Unisex'].map(gender => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.chipcontainer,
                  selectedGender === gender && {backgroundColor: COLORS.blue},
                ]}
                onPress={() => handleGenderSelection(gender)}>
                <AppText
                  color={
                    selectedGender === gender ? COLORS.white : COLORS.black
                  }>
                  {gender}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
          <AppText size={16} family="PoppinsSemiB">
            Price
          </AppText>
          <View style={{flexDirection: 'row'}}>
            {['High to low', 'Low to high'].map(order => (
              <TouchableOpacity
                key={order}
                style={[
                  styles.chipcontainer,
                  selectorder === order && {backgroundColor: COLORS.blue},
                ]}
                onPress={() => handleOrderSelection(order)}>
                <AppText
                  color={selectorder === order ? COLORS.white : COLORS.black}>
                  {order}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{width: '100%', marginVertical: moderateVerticalScale(10)}}>
            <SubmitButton
              widthOf={'100%'}
              title={'Show Results'}
              pressing={handleApplyFilters}
            />
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: moderateVerticalScale(10),
              }}
              onPress={handleResetFilter}>
              <AppText size={16} family="PoppinsSemiB">
                Reset All Filters
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(80),
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: moderateScale(0.5),
    borderColor: '#00000040',
    borderRadius: moderateScale(5),
    padding: moderateScale(5),
    margin: moderateScale(5),
  },
  chipcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(0.5),
    borderColor: '#00000040',
    borderRadius: moderateScale(5),
    padding: moderateScale(8),
    margin: moderateScale(5),
  },
  slidercontainer: {
    marginVertical: moderateScale(10),
    marginBottom: moderateScale(30),
  },
});

export default ProdutFilter;
