import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  Platform,
} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import {moderateScale} from 'react-native-size-matters';
import AppText from '../../../component/AppText/AppText';
import CustomTotal from '../Common/CustomTotal';
import CustomCardCheck from '../Checkout/CustomCardCheck';
import {LocationBlue} from '../../../assets/svgImg/SvgImg';
import Stepper from '../Common/Stepper';
import {strings} from '../../../utils/strings';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import RequestOrderCancel from './RequestOrderCancel';

const TrackOrder = ({navigation, route}: any) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['60%'], []);
  const iossnapPoints = useMemo(() => ['70%'], []);
  const [filters, setFilters] = useState<any>({});

  const [stepsData, setStepsData] = useState([
    {title: 'Order Placed', date: '06 July 2024', time: '10.00'},
    {title: 'Processing', date: '07 July 2024', time: '12.00'},
    {title: 'Shipped', date: '08 July 2024', time: '01.00'},
    {title: 'Delivered', date: '10 July 2024', time: 'Till Evening'},
  ]);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    
  }, []);

  useEffect(() => {
    if (filters) {
      setStepsData(prevSteps => [
        ...prevSteps.slice(0, 2),
        {
          title: 'Cancelled',
          date: filters?.date,
          time: filters?.time,
          reason: filters?.reason,
        },
      ]);
    }
  }, [route.params]);
  const applyFilters = (newFilters: any) => {
    
    setFilters(newFilters);
    bottomSheetModalRef.current?.close();
  };
  const closemodal = () => {
    bottomSheetModalRef.current?.close();
  };
  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <SimpleHeader navigation={navigation} label="Track Order" />
        <Animated.ScrollView>
          <View style={styles.subcontainer}>
            <AppText size={16} family="PoppinsSemiB" color="#646363">
              8 July, 2024
            </AppText>
            <CustomTotal
              color="#646363"
              familyprice="PoppinsSemiB"
              family="PoppinsMedium"
              size={16}
              price={22352}
              text={'Order ID-1562792781478'}
            />
            <AppText size={16} family="PoppinsSemiB">
              ETA: 10 July, Wednesday
            </AppText>
            <Stepper
              stepData={stepsData}
              navigation={navigation}
              onCancel={handlePresentModalPress}
            />
            <CustomCardCheck
              lefticon={<LocationBlue />}
              label="Delivery Address"
              discription="78, TTK Road, Alwarpet, Chennai, Tamil Nadu 600018"
            />
            <View style={styles.submitbutton}>
              <SubmitButton
                title="Write Riview"
                widthOf={'100%'}
                pressing={() => {
                  navigation.navigate(strings.REVIEW_PRODUCT_SCREEN);
                }}
              />
            </View>
          </View>
        </Animated.ScrollView>
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={Platform.OS === 'ios' ? iossnapPoints : snapPoints}
        onChange={handleSheetChanges}>
        <RequestOrderCancel closemodal={closemodal} cancel={applyFilters} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  stepIndicator: {
    borderRadius: 15,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#aaaaaa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStepIndicator: {
    backgroundColor: '#ffffff',
  },
  finishedStepIndicator: {
    backgroundColor: '#1E9BFC',
  },
  cancelledStepIndicator: {
    backgroundColor: '#E74C3C',
  },
  stepIndicatorText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: moderateScale(20),
    backgroundColor: '#E74C3C',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refundButton: {
    marginTop: moderateScale(10),
    backgroundColor: '#F7B353',
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  refundButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitbutton: {
    height: '10%',
    width: '100%',
  },
});

export default TrackOrder;
