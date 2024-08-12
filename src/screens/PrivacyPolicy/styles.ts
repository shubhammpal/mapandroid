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
        paddingHorizontal: 15,
    },
    contain:{
        flex: 1, backgroundColor: COLORS.white,
        
    }
    


})