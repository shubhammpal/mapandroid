import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";
import { width } from "../../../style/typography";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black131,
        paddingHorizontal: 1
    },
    clubscrollContainer: {
        flexGrow: 1, backgroundColor: COLORS.black
    },
    clubcontainer: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: ms(0)
    },
    scrollContainer: {
        flexGrow: 1, 
        // backgroundColor: COLORS.black131
    },
    detailscontainer: {
        flex: 1,
        backgroundColor: COLORS.black131
    },
    coverarrow: {
        flexDirection: 'row', marginVertical: ms(2),
        marginHorizontal: ms(0), alignItems: 'center',
        justifyContent: 'space-between'
    },
    views: {
        flexDirection: 'row', alignItems: 'center'
    },
    logo: {
        height: 120,
        width: 120,
        borderRadius: 100,
        marginTop: -40,
        backgroundColor:COLORS.black,
        borderWidth: 1
    },
    item: {
        height: 140,
        width: 140,
        overflow: 'hidden',
        borderRadius: 10,
    },
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderBottomWidth: 1,
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
    titleView: {
        width: '58%', marginHorizontal: 20, marginTop: -5
    },
    view: {
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignItems: 'center', justifyContent: 'center', marginTop: 10
    },
    join: {
        borderRadius: 4,
        // paddingHorizontal: 15,
        height: 30,
        paddingHorizontal:10,
        backgroundColor: COLORS.black3030, alignItems: 'center', justifyContent: 'center', marginTop: 10
    },

    detailsmainContainer: {
        marginHorizontal: ms(1),
    },
    row: {
        flexDirection: 'row',
        marginTop: ms(0),
        alignItems: 'center',
        
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
        backgroundColor: COLORS.black21,
        paddingVertical: 10,
        marginVertical: ms(1),
        borderRadius: 5,
        paddingHorizontal: 5
    },
    stat: {
        alignItems: 'center',
        width: '32%',
    },
    stat2: {
        alignItems: 'center',
        width: '40%',
    },
    blurview: {
        position: 'absolute',
        bottom: 0,
        height: 113,
        width: '100%',

        backgroundColor: 'rgba(19, 19, 19, 0.8)'
    },
    joinButton: {
        backgroundColor: COLORS.blue,
        height: 46,
        flexDirection: 'row',
        width: '80%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
    },
    shareButton: {
        backgroundColor: COLORS.green,
        height: 46,
        flexDirection: 'row',
        width: '10%',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 8,
    },
    chatICon: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.greyBCBC,
        borderWidth: 1,
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 50
    },
    inviteContainer: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        alignItems: 'center',
        borderTopColor: COLORS.black3030,
        borderBottomColor: COLORS.black3030,
        paddingVertical: 14,

    },
    userimage: {
        height: 50,
        width: 50,
        borderRadius: 50,
    },


})