import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../style";
import { fonts } from "../../utils/misc";
export const styles = StyleSheet.create({
    scrollview: {
        flexGrow: 1,
        backgroundColor: COLORS.black
    },
    container: {
        flex: 1,
        paddingVertical: ms(2),
        paddingHorizontal: 15,
        backgroundColor: COLORS.black
    },
    row: {
        flexDirection: 'row', alignItems: 'center',
    },
    updatecontainer: {
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
        paddingVertical:ms(0),
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
    modalContainer: { 
        flex: 1,
        backgroundColor: '#021420b3',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    modalDataContainer: {
        height: 256,
        width: 328,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    yesButton: {
        width: '45%',
        backgroundColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical:8
    },
    modalBtnContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 20
    },
    noButton: {
        width: '45%',
        borderWidth: 1,
        borderColor: COLORS.blue,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 10,
    },


})