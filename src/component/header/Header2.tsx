import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Platform,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {
  AppLogo,
  ArrowBAckIcon,
  BagIconBlack,
  BellIconBlack,
  HeartIconBlack,
  MainDrawerIconBlack,
} from '../../assets/svgImg/SvgImg';
import {COLORS} from '../../style';
import {moderateScale} from 'react-native-size-matters';
import {strings} from '../../utils/strings';

const CustomHeader2 = ({navigation, back}:any) => {
  return (
    <Animated.View >
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => back ? navigation.goBack() : navigation.dispatch(DrawerActions.toggleDrawer())}>
              {back ? <ArrowBAckIcon /> : <MainDrawerIconBlack />}
            </TouchableOpacity>
            <AppLogo />
          </View>
          <View style={styles.rightSection}>
           
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(strings.FAVOURITES_PAGE)}>
              <HeartIconBlack />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(strings.CART_PAGE)}>
              <BagIconBlack />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height:moderateScale(55)
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 2 : 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
    marginRight: moderateScale(10),
  },
});

export default CustomHeader2;
