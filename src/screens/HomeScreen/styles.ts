import { Platform, StyleSheet } from "react-native";
import { COLORS, ms } from "../../style";
import { fonts } from "../../utils/misc";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.black131
    },

    container: {
        flex: 1,
        paddingTop: Platform.OS == 'ios' ? 130 : 120
    },
    mainHomeContainer: {
        flex: 1,
        backgroundColor: COLORS.black131
    },

    linearContainer: {
        flex: 1,
        backgroundColor: COLORS.black131,
        paddingVertical: 15,
        // paddingBottom: 550,

    },
    trendingText: {
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingTop: 6
    },
    sliderView: {
        marginTop: 25,
        marginBottom: 15,
    },
    postView: {
        // paddingHorizontal: 20,
        marginTop: 10,
        paddingBottom: 10,
        paddingTop: 15,
        backgroundColor: COLORS.black
    },
    everyPostView: {
        // flex: 1,
        marginTop: 5,


    },
    userDetails: {
        flexDirection: "row",
        alignItems: "center",
        width: '90%',
    },
    nameUserName: {
        paddingHorizontal: 12,
    },
    infoIcon: {
        width: '10%',
        // paddingVertical: 5,
        alignItems: "center",
        bottom: 12
    },
    postDesc: {
        flex: 1,
        marginTop: 11
    },
    photoStatus: {
        flexDirection: "row",
        alignItems: 'center',
        flex: 1,
        width: '90%',
        alignSelf: 'center'
    },
    img: {
        height: '65%',
        width: '90%',
    },

    likecommentShare: {
        gap: 20,
        // marginTop: 15,
    },
    emojiContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: -5
    },
    bottomSheetContainer: {
        backgroundColor: COLORS.black,
        flex: 1
    },
    handleIndicator: {
        backgroundColor: COLORS.black313,
        height: 7,
        width: 35
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: ms(2),
        backgroundColor: COLORS.black,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    icons: {
        backgroundColor: COLORS.black3232D,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },
    overlayBG: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sosmodalContent: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1
    },
    modalContent: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flex: 1
    },
    closeButton: {
        position: 'absolute',
        top: 130,
        right: 10,
        zIndex: 1,
    },
    closeButton2: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    iconContainer: {
        backgroundColor: COLORS.black,
        borderRadius: 10,
        paddingVertical: ms(1),
        alignItems: 'center',
        width: '90%'
    },
    reporticon: {
        height: 25, width: 25
    },
    report: {
        flexDirection: 'row', paddingVertical: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: COLORS.black3030
    },
    indicator: {
        backgroundColor: COLORS.black313, height: 7
    },
    actionContainer: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginBottom: ms(0),
        backgroundColor: COLORS.black,

    },
    actionContainer2: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        backgroundColor: COLORS.black,
        height: '90%',
    },
    actionView: {
        justifyContent: 'center',
        backgroundColor: COLORS.black222,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginHorizontal: 20
    },
    blockContainer: {
        marginVertical: ms(2), backgroundColor: COLORS.black, alignItems: 'center', marginHorizontal: ms(2)
    },
    message: {
        flexDirection: 'row', paddingVertical: 10, alignItems: 'center',
    },
    reportContainer: {
        marginVertical: ms(2), backgroundColor: COLORS.black, marginHorizontal: ms(2)
    },
    reportView: {
        marginTop: ms(2)
    },
    commentView: {
        paddingHorizontal: 20, flexDirection: 'row', borderTopWidth: 1,
        borderTopColor: COLORS.black3030, paddingVertical: 15,
        alignItems: "center",
    },
    commentTextinput: {
        flex: 1, paddingRight: 8, color: COLORS.white, fontSize: 16, fontFamily: 'PoppinsMedium'
    },
    toparrow: {
        backgroundColor: COLORS.blue, borderRadius: 20, paddingHorizontal: 10,
        paddingVertical: 2
    },
    smallBullet: {
        fontSize: 10,
    },

    listContainer: {
        flex: 1,
        width: "100%",
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    buttonContainer: {
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 8
    },
    replyBox: {
        flexDirection: "row",
        alignItems: 'center',
        alignSelf: 'center',
        width: "95%",
        backgroundColor: COLORS.black141,
        justifyContent: 'space-between',
    },
    mentionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingVertical: 12,
        width: '90%',
        alignSelf: 'center',
    },
    mention: {
        color: COLORS.blueoff,
        marginRight: 5,
        fontFamily: fonts.PoppinsRegular,
    },

    buttonContainerDelete: {
        paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        alignSelf: 'center'
    },
    TextBackgroundBox: {
        height: 400,
        width: '100%',
        // borderRadius: 10,
        marginBottom: 12,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },




    previewWrapper: {
        width: '100%',
    },
    previewContainer: {
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
        height:ms(13.3)
    },
    metadataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    previewTitle: {
        color: 'white',
        fontFamily: fonts.PoppinsBold,
        fontSize: 14,
        flexShrink: 1,
    },
    previewDescription: {
        color: COLORS.mediumgray,
        fontFamily: fonts.PoppinsSemiB,
        flexShrink: 1,
    },
    previewText: {
        color: COLORS.blue,
        fontFamily: fonts.PoppinsMedium,
        fontSize: 12,
        flexShrink: 1,
    },
    previewImage: {
        width: '90%',
        height: 80,
        borderRadius: 8,
    },

});