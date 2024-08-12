import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../style";
import { height } from "../../style/typography";
import { fonts } from "../../utils/misc";

export const styles = StyleSheet.create({
    container: {
        
        backgroundColor: COLORS.black,
        paddingHorizontal: 1
    },
    scrollContainer: {
        flexGrow: 1, backgroundColor: COLORS.black
    },
    mainContainer: {
        marginVertical: ms(4),
        marginHorizontal: ms(2),
    },
    followarrow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: ms(5),
        marginHorizontal: ms(2),
    },
    imageView: {
        alignItems: 'center',
        marginVertical: -80
    },
    profileConatiner: {
        height: 156,
        width: 156,
        borderRadius: 100,
        alignItems: 'center'
    },
    edit: {
        width: 35,
        height: 35,
        borderRadius: 6,
        alignItems: 'center',
        marginLeft: -20,
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: COLORS.black3030
    },
    editContainer: {
        position: 'absolute',
        bottom: 25,
        right: 0,
    },
    image: {
        height: 130,
        width: 130,
        borderRadius: 100
    },
    nameConatiner: {
        marginBottom: 15
    },
    terms: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
        alignSelf: 'center',
    },
    rank: {
        fontSize: 14,
        fontFamily: fonts.PoppinsRegular,
        textAlign: 'center',
        color: COLORS.greyAD
    },
    count: {
        fontSize: 14,
        fontFamily: fonts.PoppinsBold,
        textAlign: 'center',
        color: COLORS.white,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '70%'
    },
    totalContainer: {
        backgroundColor: COLORS.black21,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: ms(1)
    },
    totalrides: {
        borderRadius: 6,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: ms(0.01)
    },
    join: {
        borderRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.blue
    },
    SearchBox: {
        backgroundColor: COLORS.black21,
        borderRadius: 50,
        borderWidth: 1,
        width: '100%',
        borderColor: COLORS.semigrey,
        paddingHorizontal: ms(0),
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
      item: {
        height: 55,
        width: 55,
        borderRadius: 50,
      },
      inviteButton: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 4,
      },
      camera: {
        flexDirection: 'row', marginVertical: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    textinputConatiner: {
        marginHorizontal: ms(0)
    },
    completeView: {
        marginVertical: ms(0),
        flexDirection:'row',
        alignItems:'center',
      
    },
    isDropDown: {
        backgroundColor: '#212121',
        borderWidth: 1,
        borderRadius: 28,
        borderColor: COLORS.offblack43,
        marginVertical: 15
    },
    button: {
        marginVertical: 20, alignItems: 'center'
    },
    dropDown: {
        borderRadius: 28,
        paddingHorizontal: 30,
        paddingVertical: 12,
        paddingBottom: 20,
        backgroundColor: COLORS.black21
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
})
