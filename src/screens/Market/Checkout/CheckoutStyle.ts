import { StyleSheet } from "react-native";
import { COLORS } from "../../../style";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    scrollView: {
      backgroundColor: COLORS.white,
    },
    paddingContainer: {
      paddingHorizontal: 20,
    },
    submitbutton: {
      height: '10%',
      backgroundColor: COLORS.white,
      width: '100%',
    },
    total: {
      flexDirection: 'row',
      paddingVertical: 10,
      backgroundColor: COLORS.white,
      marginBottom: 10,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imagesList: {
      marginVertical: moderateScale(10),
    },
    imageContainer: {
      marginHorizontal: moderateScale(10),
    },
    productImage: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(5),
      backgroundColor: COLORS.lightBlack,
    },
    noImage: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(5),
      backgroundColor: COLORS.grey54,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    input: {
      fontSize: moderateScale(14),
      color: COLORS.black,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.grey54,
    },
  });