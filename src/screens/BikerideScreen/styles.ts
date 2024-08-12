import { StyleSheet } from 'react-native';
import { COLORS, ms } from '../../style';
import { fonts } from '../../utils/misc';
export const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
    paddingVertical: ms(2),
    paddingHorizontal: 15,
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  item: {
    height: 40,
    width: 50,
    borderRadius: 5,
  },
  mainContainer: {
    width: '100%',
    marginVertical: 10,
    paddingBottom: 5,
  },
  mainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:10
  },
  imageVuiew: {
    backgroundColor: COLORS.black2F,
    width: 100,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },

  titleView: {
    width: '80%',
    marginHorizontal: 20,
    flex: 1,
  },
  contentWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10
  }

});
