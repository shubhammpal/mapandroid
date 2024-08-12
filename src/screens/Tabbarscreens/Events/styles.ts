import { StyleSheet } from 'react-native';
import { COLORS, ms } from '../../../style';
import { height, width } from '../../../style/typography';
import { fonts } from '../../../utils/misc';

export const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: ms(2),
    paddingHorizontal: 10,
    backgroundColor: COLORS.black,

  },
  detailsContainer: {
    flex: 1,
    paddingTop: ms(2),
    backgroundColor: COLORS.black141,
  },
  item: {
    height: 140,
    width: 140,
    borderRadius: 5,
  },
  mainContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black3030,
    paddingBottom: 20,
  },
  photoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  editContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingRight: 20
  },
  photo: {
    borderRadius: 4,
    height: 30,

    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  titleView: {
    width: '58%',
    marginHorizontal: 10,
    marginTop: -5,
  },

  join: {
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 2,

    alignItems: 'center',
    justifyContent: 'center',
  },
  savecontainerModal: {
    backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'center',
  },
  check: {
    height: 20,
    width: 20
  },
  checkBox: {
    height: 24, width: 24, backgroundColor: COLORS.black21,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: COLORS.offblack43, borderRadius: 4
  },
  closeButton: {
   
  },
  repeatmodalView: {
    backgroundColor: COLORS.black, width: '100%',
  },
  profileitem: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  SearchBox: {
    backgroundColor: COLORS.black21,
    borderRadius: 50,
    borderWidth: 1,
    width: '80%',
    borderColor: COLORS.semigrey,
    paddingHorizontal: ms(0),
    // marginBottom: ms(5),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 45,
  },
  filterICon: {
    height: 45,
    width: 45,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black141,
    marginHorizontal: 20,
    borderRadius: 50,
    borderColor: '#383B47',
  },
  coverarrow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainerCreate: {
    marginVertical: ms(2),
    paddingHorizontal: ms(0),
  },
  eventPhotoContainer: {
    backgroundColor: COLORS.black1717,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: ms(8),
    marginVertical: ms(2),
  },
  upload: {
    flexDirection: 'row',
    backgroundColor: COLORS.semigrey,
    borderRadius: 50,
    paddingHorizontal: ms(0),
    paddingVertical: 5,
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    marginVertical: 20,
    alignItems: 'center',
  },
  status: {
    borderRadius: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  price: {
    backgroundColor: COLORS.darkOrange,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    flexDirection: 'row'
  },
  iconContainer: {
    backgroundColor: COLORS.white2D,
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row2: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,

  },
  rowData: {
    flexDirection: 'row',
    width: '48%',
    alignItems: 'center',
  },
  viewMap: {
    backgroundColor: COLORS.white2D,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    width: 136,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandableInputContainer: {
    borderWidth: 1,
    borderColor: COLORS.offblack43,
    borderRadius: 20,

    // justifyContent: 'flex-start',
    flex: 1,
    marginTop: 10,
    backgroundColor: COLORS.black,
  },
  multilineTextInput: {
    color: COLORS.white,
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    flex: 1,
    marginVertical: 10,
  },
  descriptionContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.offblack43,
  },
  startPoint: {
    backgroundColor: COLORS.white2D,
    height: 55,
    width: 143,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(0),
    borderColor: COLORS.offblack43,
  },
  input2: {
    width: '50%',
    color: COLORS.white,
    fontFamily: fonts.PoppinsRegular,
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  camera: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  editICon: {
    backgroundColor: COLORS.darkOrange,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 5,
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  topHeaderSafe:{
    alignItems: 'center',
    flexDirection:'row',
    width:'100%'
  }
});
