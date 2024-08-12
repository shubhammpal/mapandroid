//import liraries
import React, {useState} from 'react';
import {View, StyleSheet, SafeAreaView, Animated} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import AppText from '../../../component/AppText/AppText';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {fonts} from '../../../utils/misc';
import DropDownInputField from '../../../component/CustomInput/CustomDropdowm';
import {formatDate, formatTime} from '../../../style/typography';

const RequestOrderCancel = ({navigation, cancel, closemodal}: any) => {
  const [reason, setReason] = useState('');
  const [selectedReason, setSelectedReason] = useState(false);

  const handleApplyFilters = () => {
    let canceldata: any = {
      reason: reason,
      date: formatDate(Date.now()),
      time: formatTime(Date.now()),
    };
    cancel(canceldata);
  };

  const cancelReasons = [
    {title: 'Changed Mind', id: 1},
    {title: 'Found a Better Price', id: 2},
    {title: 'Product No Longer Needed', id: 3},
    {title: 'Delayed Delivery', id: 4},
    {title: 'Product Unavailable', id: 5},
    {title: 'Incorrect Product Ordered', id: 6},
    {title: 'Shipping Issues', id: 7},
    {title: 'Quality Concerns', id: 8},
    {title: 'Unsatisfactory Service', id: 9},
    {title: 'Other (Please Specify)', id: 10},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView>
        <View style={styles.subcontainer}>
          <View style={{marginVertical: 10}}>
            <AppText size={18} family="PoppinsBold" color="#646363">
              Order ID-1562792781478
            </AppText>
          </View>
          <View style={{marginVertical: 10}}>
            <AppText size={16} family="PoppinsMedium" color="#646363">
              You can cancel order before shipped{' '}
            </AppText>
          </View>
          <View style={{marginVertical: 10}}>
            <AppText size={16} family="PoppinsSemiB" color="#D75152">
              You will be refund your amount in 2-3 working day after Cancel
            </AppText>
          </View>
          <View style={{marginVertical: 10}}>
            <AppText size={16} family="PoppinsSemiB" color="#646363">
              Please select a reason for cancellation
            </AppText>
          </View>
          <DropDownInputField
            lightTheme
            value={reason}
            setValue={(text: any) => setReason(text)}
            editable={false}
            right={true}
            setSelectedValue={setReason}
            name={'Select Brand'}
            secure={false}
            data={cancelReasons}
            setIsDropdownOpen={setSelectedReason}
            isDropdownOpen={selectedReason}
          />
          <View style={styles.submitButton}>
            <View style={{width: '48%'}}>
              <SubmitButton
                colorChange={'#D75152'}
                title="Confirm"
                widthOf="100%"
                pressing={handleApplyFilters}
              />
            </View>
            <View style={{width: '48%'}}>
              <SubmitButton
                title="Close"
                colorChange="#D4D4D4"
                widthOf="100%"
                pressing={closemodal}
              />
            </View>
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
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    flex: 1,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 30,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: moderateScale(8),
    fontSize: scale(14),
  },
  placeholderStyle: {
    fontSize: scale(16),
    fontFamily: fonts.PoppinsRegular,
    color: '#434344',
  },
  selectedTextStyle: {
    fontSize: scale(14),
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: '#434344',
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
    paddingHorizontal: 20,
    marginTop: moderateScale(50),
    width: '100%',
    bottom: 0,
  },
});

//make this component available to the app
export default RequestOrderCancel;
