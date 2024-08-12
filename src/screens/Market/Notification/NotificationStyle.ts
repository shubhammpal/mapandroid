import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { COLORS } from "../../../style";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: moderateScale(15),
        marginBottom: moderateScale(10),
        paddingHorizontal: moderateScale(10),
        borderRadius: moderateScale(10),
        position: 'relative',
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    images: {
        height: moderateScale(60),
        width: moderateScale(60),
        borderRadius: moderateScale(5),
        marginRight: moderateScale(10),
    },
    textContainer: {
        flex: 1,
    },
    iconContainer: {
        borderColor: '#FFDFDB',
        backgroundColor: '#FFDFDB',
        padding: 10,
        borderRadius: moderateScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10),
    },
    Cardcontainer: {
        flex: 1,
    },
    CardsubContainer: {
        paddingHorizontal: moderateScale(10),
    },
});
