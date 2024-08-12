import {StyleSheet} from 'react-native';
import {COLORS, ms} from '../../style';
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
    justifyContent: 'space-between',
  },
  mainContainer: {
    backgroundColor: COLORS.black21,
    marginVertical: ms(3),
    borderRadius: 10,
  },
  icon: {
    height: 35,
    width: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightyellow,
  },
  sosmodalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
  },
  modalContent: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
  },
  textinputConatiner: {
    marginVertical: ms(3),
    marginHorizontal: ms(0),
  },

  closeButton2: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    paddingVertical: ms(1),
    width: '90%',
  },
  contentRow:{
    flexDirection:'row',
    alignItems:'center',
    paddingBottom:8,
    paddingHorizontal:16
  }

});
