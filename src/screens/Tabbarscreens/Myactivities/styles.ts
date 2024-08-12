import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";


export const styles = StyleSheet.create({
    scrollview: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: ms(0),
        justifyContent: 'space-between', width: '100%',
        paddingHorizontal: 10,
        backgroundColor: COLORS.black
    },
    container2: {
        flex: 1,
        paddingVertical: ms(0),
        paddingHorizontal: 10,
        backgroundColor: COLORS.black
    },
    editICon: {
        backgroundColor: COLORS.green,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginRight: 15,
        paddingVertical: 10,
    },
    item: {
        height: 110,
        borderRadius: 5,
        marginVertical: 10,
        // marginRight:10
    },
})