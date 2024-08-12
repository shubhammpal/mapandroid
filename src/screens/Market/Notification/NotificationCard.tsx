import React from 'react';
import {View} from 'react-native';

import AppText from '../../../component/AppText/AppText';
import {moderateScale} from 'react-native-size-matters';
import {RedInfoIcon} from '../../../assets/svgImg/SvgImg';
import {styles} from './NotificationStyle';

const NotificationCard = ({text}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.iconContainer}>
          <RedInfoIcon />
        </View>
        <View style={styles.textContainer}>
          <AppText size={14} family="PoppinsMedium" color="#646363">
            Your order is late due to shipping side we will check and update you
            soon!
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(10),
              alignItems: 'center',
            }}>
            <AppText size={13} color="#646363" family="PoppinsRegular">
              15 minutes ago
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
