//import liraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import {COLORS} from '../../../style';
import FastImage from 'react-native-fast-image';

type CheckoutTotaltype = {
  text: string;
  price?: number | string;
  color?: string;
  size?: number;
  family?: string;
  familyprice?: string;
  icon?: any;
};
const CustomTotal: React.FC<CheckoutTotaltype> = ({
  text,
  price,
  color,
  size,
  family,
  familyprice,
  icon,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row',alignItems:"center"}}>
        <AppText size={size} family={family} color={color}>
          {text}
        </AppText>
        {icon && icon}
   </View>
      <AppText size={size} family={familyprice} color={color}>
        {price}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomTotal;
