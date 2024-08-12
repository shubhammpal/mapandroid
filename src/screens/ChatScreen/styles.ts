import {StyleSheet} from 'react-native';
import {COLORS, ms} from '../../style';
import {height, width} from '../../style/typography';
import {fonts} from '../../utils/misc';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black131,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.black131,
  },

  mainContainer: {
    marginVertical: ms(4),
    marginHorizontal: ms(2),
    flex: 1,
  },
  row:{
    flexDirection: 'row', alignItems: 'center' 
  }
})