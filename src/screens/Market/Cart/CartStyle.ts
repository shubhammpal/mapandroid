import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS } from "../../../style";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    paddingContainer: {
      paddingHorizontal: 20,
      marginBottom: moderateScale(80),
    },
    submitbutton: {
      height: '10%',
      backgroundColor: COLORS.white,
      width: '100%',
      paddingHorizontal: 20,
    },
    partContainer: {
      width: '48%',
      marginVertical: 5,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 9,
      borderColor: '#D9D9D9',
    },
    images: {
      height: 124,
      width: 124,
      borderRadius: 5,
      marginBottom: 10,
      resizeMode: 'cover',
    },
    columnWrapper: {
      justifyContent: 'space-between',
    },
  });