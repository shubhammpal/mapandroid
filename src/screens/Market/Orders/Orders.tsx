//import liraries
import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, Animated} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import {
  moderateScale,
  moderateVerticalScale,
  s,
} from 'react-native-size-matters';
import CustomInput from '../components/CustomInput';
import {
  FilterIconBlack,
  SearchIconBlack,
} from '../../../assets/svgImg/SvgImg';
import OrdersCard from './OrdersCard';
import { strings } from '../../../utils/strings';

// create a component
const OrdersScreen = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');

  // render your UI here
  return (
    <SafeAreaView style={styles.container}>
      <SimpleHeader navigation={navigation} label="Orders" />
      <Animated.ScrollView style={styles.subcontainer}>
        <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
          <CustomInput
            width={'90%'}
            height={50}
            iconLeft={<SearchIconBlack />}
            bgColor="white"
            placeholder="Search anything"
            value={search}
            setValue={setSearch}
            secure={false}
          />
          <FilterIconBlack />
        </View>
        <OrdersCard
          header={'In Progress on July 01, 2024'}
          image={require('../../../assets/img/helmet1.png')}
          discription={'SMK Allterra Off Road Tribou GL 527 Helmets'}
          onpress={()=>{navigation.navigate(strings.TRACK_ORDER_SCREEN)}}
          RatingPress={()=>{navigation.navigate(strings.ORDER_COMPLETED_SCREEN)}}
        />
        <OrdersCard
          header={'Delivered on July 01, 2024'}
          image={require('../../../assets/img/helmet1.png')}
          discription={'Apex Venomous D/V Gloss Helmet'}
          onpress={function (): void {
            throw new Error('Function not implemented.');
          }}
          RatingPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <OrdersCard
          header={'In Progress on July 01, 2024'}
          image={require('../../../assets/img/helmet1.png')}
          discription={'Apex Venomous D/V Gloss Helmet'}
          onpress={function (): void {
            throw new Error('Function not implemented.');
          }}
          RatingPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <OrdersCard
          header={'Delivered on July 01, 2024'}
          image={require('../../../assets/img/helmet1.png')}
          discription={'Apex Venomous D/V Gloss Helmet'}
          onpress={function (): void {
            throw new Error('Function not implemented.');
          }}
          RatingPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <OrdersCard
          header={'In Progress on July 01, 2024'}
          image={require('../../../assets/img/helmet1.png')}
          discription={'Apex Venomous D/V Gloss Helmet'}
          onpress={function (): void {
            throw new Error('Function not implemented.');
          }}
          RatingPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateVerticalScale(10),
  },
});

//make this component available to the app
export default OrdersScreen;
