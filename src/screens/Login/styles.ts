import { StyleSheet } from 'react-native'
import { COLORS, ms } from '../../style'
import { height, width } from '../../style/typography'
import { fonts } from '../../utils/misc'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },

    scrollsContainer:{
        flex:1
    },
    scrollContainer: {
        flexGrow: 1, backgroundColor: COLORS.black
    },
    mainContainer: {
        // flex: 1,
        paddingVertical:ms(0),
        backgroundColor: COLORS.offblack,
        marginVertical: ms(6),
        marginHorizontal: ms(2),
        paddingHorizontal: ms(0),
        borderRadius:10,
       
    },
    logoImage: {
        height: 51,
        width: 270,
       
    },
    sharedView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ms(5)
    },
    logoView: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: ms(0)
    },
    welcomeView: {
        marginTop: ms(5),
        alignSelf: 'center'
    },
    code: {
        width: '75%', alignSelf: 'center'
    },
    textContainer: {
        backgroundColor: COLORS.black21,
        marginVertical: ms(1),
        borderRadius: 4,
        paddingVertical: ms(0),
        paddingHorizontal: ms(1),

    },
    textinputContainer: {
        backgroundColor: COLORS.semigrey,
        marginVertical: ms(-1),
        height: 55,
        borderRadius: 6,
        borderWidth: 1,
       
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: ms(-1)
    },
    mobile: {
        height: 50,
        borderRadius: 6,
        letterSpacing: 3,
        color: COLORS.white,
        fontSize: 14,
        marginVertical:5,
        width: '85%',
        fontFamily: fonts.PoppinsRegular
    },
    register: {
        fontSize: 12,
        top:2,
        fontFamily: fonts.PoppinsMedium,
        textAlign: 'center'
    },
    terms: {
        flexDirection: 'row',
        width: '86%',
        alignSelf: 'center',
        marginVertical: ms(2)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    underline: {
        borderWidth: 0.5,
        width: '40%',
        borderColor: '#444444',
    },
    sociallogin:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width:'70%',
        alignSelf:'center',
        marginVertical:ms(5)
    },
    icon:{
        backgroundColor:COLORS.black21,
        height:50,
        width:50,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    },
    aboveContainer: {
        height: "100%",
        position: "absolute",
        width: "100%",
        paddingTop: height/15
    },
    innerView: {
        width: "90%",
        alignSelf: 'center',
        backgroundColor: COLORS.offblack,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: ms(6),
        borderRadius: 10
    },
    codeView: {
        marginVertical: 20,
    },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20, gap: 20 },
    cell: {
        width: 55,
        height: 55,
        backgroundColor: COLORS.semigrey,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.offblack43,
        borderWidth: 1,
        marginVertical:5
    },
    cellText: {
        fontSize: 24, 
        textAlign: 'center',
        color: COLORS.white,
        fontFamily: fonts.PoppinsRegular,
        
    },
    focusCell: {
        borderColor: COLORS.blue,
    },
    bottomSmall:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 15,
        marginBottom: 15,
    },
    resendCode: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: fonts.PoppinsRegular,
    },
    otperror:{
        marginTop:10
    },
    errorCell: {
        borderColor: '#D4675A',
        borderWidth: 1,
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

})