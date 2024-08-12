import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { COLORS } from "../../../style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    paddingContainer: {
      paddingHorizontal: 20,
    },
    sizeContainer: {
      width: moderateScale(50),
      height: moderateScale(40),
      backgroundColor: '#F2F2F2',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#737373',
      borderRadius: 8,
      padding: 10,
      marginTop: 15,
    },
    selectedSizeContainer: {
      backgroundColor: '#49494D',
    },
    selectedColorContainer: {
      borderColor: COLORS.black,
      borderWidth: 0.5,
    },
    submitButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    addSub: {
      height: moderateScale(40),
      marginVertical: 10,
      paddingHorizontal: 10,
      paddingVertical: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '40%',
      borderWidth: 0.5,
      borderColor: '#D9D9D9',
      borderRadius: 50,
    },
    addressPin: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '43%',
      marginRight: moderateScale(8),
    },
    addressPinContainer: {
      flexDirection: 'row',
      marginRight: moderateScale(50),
      alignItems: 'center',
    },
    colorImageContainer: {
      width: moderateScale(70),
      height: moderateScale(70),
      backgroundColor: 'white',
      marginHorizontal: moderateScale(10),
      borderRadius: moderateScale(10),
      marginVertical: moderateVerticalScale(10),
    },
    colorImage: {
      width: moderateScale(68),
      height: moderateScale(68),
      backgroundColor: 'white',
      borderRadius: moderateScale(10),
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: moderateScale(0.5),
      borderColor: '#00000040',
      borderRadius: moderateScale(5),
  
      padding: moderateScale(2),
    },
    ReviewContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  
      borderColor: '#00000040',
      borderRadius: moderateScale(5),
      justifyContent: 'center',
      padding: moderateScale(2),
    },
    pricecontainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
    },
    creditcontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: moderateScale(5),
      marginBottom: moderateScale(5),
    },
    creditsubcontainer: {
      flexDirection: 'row',
      marginLeft: moderateScale(10),
      borderWidth: 1,
      borderColor: '#D9D9D9',
      padding: moderateScale(4),
      borderRadius: moderateScale(10),
    },
    icon: {
      position: 'relative',
      left: moderateScale(30),
      top: moderateScale(0),
    },
  });