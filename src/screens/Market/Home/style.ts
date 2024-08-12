import { moderateScale } from "react-native-size-matters";
import { COLORS } from "../../../style";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      marginBottom: moderateScale(80),
    },
    container: {
      flex: 1,
    },
    inputContainer: {
      margin: moderateScale(10),
      marginBottom: moderateScale(5),
    },
    sliderView: {
      marginVertical: moderateScale(10),
    },
    paddingContainer: {
      padding: moderateScale(10),
      paddingBottom: moderateScale(70),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: moderateScale(10),
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: moderateScale(10),
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageContainer: {
      alignItems: 'center',
    },
    images: {
      height: moderateScale(100),
      width: '100%',
      resizeMode: 'contain',
    },
    itemDetails: {
      paddingHorizontal: moderateScale(10),
      paddingBottom: moderateScale(10),
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
    partContainer: {
      flex: 0.5,
      justifyContent: 'space-between',
      margin: moderateScale(5),
      backgroundColor: COLORS.blue,
      borderRadius: moderateScale(10),
      paddingHorizontal: moderateScale(3),
    },
  });
  