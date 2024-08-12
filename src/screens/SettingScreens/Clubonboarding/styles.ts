import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";
import { height } from "../../../style/typography";
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
    containerfeedback: {
        flex: 1,
        paddingBottom: ms(2),
        backgroundColor: COLORS.black
    },
    row: {
        flexDirection: 'row', alignItems: 'center',

    },
    imageView: {
        alignItems: 'center',
        marginVertical: ms(1)
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
    logoImage: {
        height: 51,
        width: 270,
    },
    sharedView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ms(6)
    },
    textinputConatiner: {
        marginVertical: ms(2),
        marginHorizontal: ms(0)
    },
    descriptionContainer: {
        backgroundColor: COLORS.black,
        borderRadius: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.semigrey,
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
    input: {
        width: '100%',
        color: COLORS.white,
        fontFamily: 'PoppinsMedium',
        fontSize: 18,
        padding: 20,
        textAlignVertical: 'top', // Aligns text to start from top
        minHeight: 250,
    },


})