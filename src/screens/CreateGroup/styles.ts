import {StyleSheet} from 'react-native';
import {COLORS, ms} from '../../style';
import {height, width} from '../../style/typography';
import {fonts} from '../../utils/misc';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black131,
  },
  InviteLink:{
    flexDirection:'row',
    alignItems:"center"
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.black131,
  },
  item: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginVertical: ms(4),
    marginHorizontal: ms(2),
    flex: 1,
  },
  descriptionContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 10,
    marginVertical: ms(4),
    borderWidth: 1,
    borderColor: COLORS.semigrey,
  },
  image: {
    width: 256,
    height: 178,
    borderRadius: 6,
  },
  SearchBox: {
    backgroundColor: COLORS.black21,
    borderRadius: 50,
    borderWidth: 1,
    width: '100%',
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
  input2: {
    width: '100%',
    color: COLORS.white,
    fontFamily: fonts.PoppinsLight,
    fontSize: 15,
    height: 51,
  },
  inviteContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 5,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLORS.black3030,
    paddingBottom: 20,
  },
  input: {
    width: '100%',
    color: COLORS.white,
    fontFamily: 'PoppinsMedium',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 25,
    textAlignVertical: 'top',
    minHeight: 300,
  },
  errorText: {
    marginTop: 4,
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
    backgroundColor: COLORS.black131,
    height: 34,
    width: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  coverarrow: {
    flexDirection: 'row',
    marginVertical: ms(4),
    marginHorizontal: ms(2),
    alignItems: 'center',
  },
  editView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginRight: 10,
  },
  edit: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: 85,
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  inviteButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:'center',
    backgroundColor: COLORS.green,
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link:{
    height: 50,
    width: 50,
    borderRadius: 60,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: COLORS.grey54,
    marginBottom: 13
  },
});
