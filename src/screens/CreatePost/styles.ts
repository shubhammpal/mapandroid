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
    paddingBottom:ms(12)
  },
  mainContainer: {
    marginVertical: ms(4),
    marginHorizontal: ms(2),
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  anyone: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: COLORS.black3232,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },
  dropdown: {
    backgroundColor: COLORS.black3232,
    borderRadius: 5,
    marginTop: 5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  publishButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: COLORS.blue,
    height: 35,
    width: 88,
  },
  descriptionContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    // height:height/2.4,
    alignItems: 'center',
    marginVertical: ms(4),
  },
  input: {
    width: '100%',
    color: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 20,
    paddingLeft: 16,
  },
  bottomSheetContainer: {
    backgroundColor: COLORS.black,
  },
  handleIndicator: {
    backgroundColor: COLORS.black313,
    height: 7,
    width: 35,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: ms(2),
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    backgroundColor: COLORS.black3232D,
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  SearchBox: {
    backgroundColor: COLORS.black21,
    borderRadius: 50,
    borderWidth: 1,
    width: '92%',
    borderColor: COLORS.semigrey,
    paddingHorizontal: ms(0),
    // marginBottom: ms(5),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    alignSelf: 'center',
  },
  inputBox: {
    flex: 1,
    paddingHorizontal: 5,
  },
  mention: {
    color: COLORS.white,
    marginRight: 5,
  },
  mentionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black3232D,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25,
    marginRight: 10,
  },
  removeBackground:{
    alignItems: 'center',
    borderRadius: 10,
    height: 20,
    width:20,
  }
  
});
