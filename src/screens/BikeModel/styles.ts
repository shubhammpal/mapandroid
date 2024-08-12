import {Platform, StyleSheet} from 'react-native';
import {COLORS, ms} from '../../style';
import {width} from '../../style/typography';
import {fonts} from '../../utils/misc';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.black,
  },
  completeView: {
    alignItems: 'center',
  },
  mainContainer: {
    marginHorizontal: ms(2),
    flex: 1,
  },
  
  dummy: {
    width: '90%',
    marginTop: ms(1),
    alignSelf: 'center',
  },
  isDropDown: {
    backgroundColor: '#212121',
    borderWidth: 1,
    borderRadius: 28,
    borderColor: COLORS.offblack43,
    marginVertical: 15,
  },
  dropDown: {
    borderRadius: 28,
    paddingHorizontal: 30,
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: COLORS.black21,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bikeContainer: {
    marginBottom: 10,
    height: 90,
    width: 90,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikeImage: {
    height: 60,
    width: 60,
  },
  flatListContainer: {
    paddingVertical: ms(0),
    paddingHorizontal: ms(2),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  innermainContainer: {
    marginTop:Platform.OS=='android' ?ms(6):ms(7),

    flex: 1,
  },
  margin: {
    marginHorizontal: ms(2),
  },
  check: {
    height: 15,
    width: 15,
  },
  checkBox: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black21,
    borderWidth: 1,
    borderColor: COLORS.offblack43,
    borderRadius: 4,
  },
  activecheckBox: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  inner: {
    flex: 1,
  },
  arrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchBox: {
    backgroundColor: COLORS.black21,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.semigrey,
    paddingHorizontal: ms(0),
    marginBottom: ms(5),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  inputBox: {
    flex: 1,
    paddingHorizontal: 5,
  },
  input: {
    width: '100%',
    color: COLORS.white,
    fontFamily: fonts.PoppinsLight,
    fontSize: 15,
    height: 50,
  },
  flatListContainer2: {
    paddingVertical: ms(0),
    marginVertical: 10,
  },
  bikeinnerImage: {
    height: 50,
    width: 95,
    marginBottom: 10,
  },
  bikeinnerContainer: {
    marginBottom: 10,
    height: 110,
    width: 110,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bikeNumberModalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    flex: 1,
  },
  bikeNumberModalWrapper:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:COLORS.lightBlack,
    height:'30%',
    width:'92%',
    borderRadius:16
  },
  bikeNumberContainer:{
    backgroundColor:COLORS.black,
    borderRadius:6,
    alignItems:'center',
    width:'85%', 
    marginTop: 20 ,
},
bikeNumberInput: {
    width: '100%',
    color: COLORS.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: 18,
    paddingHorizontal:20,
    paddingVertical:20
},
});
