import { Platform, StyleSheet } from 'react-native'
import { COLORS, ms } from '../../style'
import { width } from '../../style/typography'
import { fonts } from '../../utils/misc'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },
    scrollContainer: {
        flexGrow: 1, backgroundColor: COLORS.black
    },
    mainContainer: {
        marginVertical: Platform.OS == 'ios' ? 0 : ms(4),
        marginHorizontal: ms(2),
    },
    completeView: {
        marginVertical: ms(0),
    },
    imageView: {
        alignItems: 'center',
        marginVertical: ms(-1)
    },
    profileConatiner: {
        backgroundColor: COLORS.black131,
        height: 156,
        width: 156,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent:'center'
    },
    editContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    image: {
        height: 148,
        width: 148,
        borderRadius: 100
    },
    textinputConatiner: {
        marginHorizontal: ms(0)
    },
    row: {
        flexDirection: 'row',
        marginTop:10
    },
    checkBox: {
        height: 16, width: 16, backgroundColor: COLORS.black21,
        alignItems:'center',justifyContent:'center',
        borderWidth: 1, borderColor: COLORS.offblack43, borderRadius: 4
    },
    check:{
        height:10,
        width:10
    },
    button: {
        marginVertical: 20, alignItems: 'center'
    },
    isDropDown: {
        backgroundColor: '#212121',
        borderWidth: 1,
        borderRadius: 28,
        borderColor: COLORS.offblack43,
        marginVertical: 15
    },
    dropDown: {
        borderRadius: 28,
        paddingHorizontal: 30,
        paddingVertical: 12,
        paddingBottom: 20,
        backgroundColor: COLORS.black21
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },

})