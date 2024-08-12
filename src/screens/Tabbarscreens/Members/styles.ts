import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";
import { width } from "../../../style/typography";
import { fonts } from "../../../utils/misc";


export const styles = StyleSheet.create({
    scrollview: {

    },
    container: {
        flex: 1,
        paddingVertical: ms(2),
        paddingHorizontal: 20,
        backgroundColor: COLORS.black
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
    InviteLink:{
        flexDirection:'row',
        alignItems:"center"
      },
    addcontainer: {
        flex: 1,
        
        backgroundColor: COLORS.black
    },
    item: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 8,
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingHorizontal:20,
        borderBottomColor: COLORS.black3030, paddingBottom: 20
    },
    photoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 5,

    },
    photo: {
        borderRadius: 4,
        height: 30,
        backgroundColor: COLORS.black3030,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center', marginTop: 10
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
    input: {
        width: '100%',
        color: COLORS.white,
        fontFamily: fonts.PoppinsLight,
        fontSize: 15,
        height: 45
    },
    filterICon: {
        height: 45,
        width: 45,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.black141,
        marginHorizontal: 20,
        borderRadius: 50, borderColor: '#383B47'
    },
    editICon: {
        backgroundColor: COLORS.green,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginRight:15,
        paddingVertical: 6,
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
      addButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:'center',
        backgroundColor: COLORS.green,
      },
      inviteButton: {
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
     
})