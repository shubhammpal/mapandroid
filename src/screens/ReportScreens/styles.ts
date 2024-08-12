import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../style";

export const styles = StyleSheet.create({
    reporticon: {
      height: 25, width: 25
  },
  report: {
      flexDirection: 'row', paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.black3030
  },
  indicator: {
      backgroundColor: COLORS.black313, height: 7
  },
  actionContainer: {
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      marginBottom: ms(0),
      backgroundColor: COLORS.black,
  },
  actionView: {
      justifyContent: 'center',
      backgroundColor: COLORS.black222,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      marginHorizontal: 20
  }
  
  })