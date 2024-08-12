import { StyleSheet } from 'react-native'
import { COLORS, ms } from '../../style'
import { height, width } from '../../style/typography'
import { fonts } from '../../utils/misc'
export const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
        height: 41,
        marginRight: ms(1)
    },
    titleText: {
        left: 8, marginRight: 35
    },
    searchContainer: {
        flexDirection: "row",
        paddingHorizontal: 18,
        paddingVertical: 12,
        alignItems: 'center'
    },
    favroutesContainer: {
        paddingHorizontal: ms(1),
        width: '100%',
        paddingVertical: ms(0),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.black21
    },
    routeView: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.black,
        borderRadius: 50, marginBottom: 10
    },
    marginview: {
        marginTop: ms(0)
    },
    favConatiner: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    mainConatiner: {
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        flexDirection: 'row'
    },
    addConatiner: {
        backgroundColor: COLORS.blue, height: 60,
        width: 60,
        borderRadius: 50, justifyContent: 'center', alignItems: 'center'
    },
    recentView: {
        marginTop: ms(0)
    },
    recentSearch: {
        borderRadius: 10, overflow: 'hidden', marginVertical: 10
    },
    addressContaier: {
        marginVertical: ms(1.5)
    },
    view: {
        marginVertical: 2
    },
    distanceView: {
        alignItems: 'flex-end',
        marginBottom: ms(0)
    },
    crossView: {
        alignItems: 'flex-end',
        marginBottom: ms(1)
    },
    arrivalContainer: {
        height: 55,
        backgroundColor: COLORS.black131,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20, 
        alignItems: 'center',
    },
    time: {
        backgroundColor: COLORS.orangelight,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    time2: {
        backgroundColor: COLORS.orangelight,
        borderRadius: 6,
        paddingHorizontal: 20,
        paddingVertical: 10,
        top: -3,
        left: '40%',
        position: 'absolute', height: 89
    },
    startView: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.semigrey,
        backgroundColor: COLORS.black141,
    },
    wappointView: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.semigrey,
        backgroundColor: COLORS.black21,
    },
    deleteView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '16%',
        marginHorizontal: 10
    },
    blackCircle: {
        backgroundColor: COLORS.white2D,
        height: 30,
        width: 30, borderRadius: 50
    },
    orangeCircle: {
        backgroundColor: COLORS.orangelight,
        height: 29,
        width: 29,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', left: '4%'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: 17
    },
    optionsView: {
        backgroundColor: COLORS.black21,
        width: '65%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.blue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backView: {
        backgroundColor: COLORS.black21,
        width: '38%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.blue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Recalculate: {
        backgroundColor: COLORS.blue,
        width: '60%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.blue,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startrideButton: {
        backgroundColor: COLORS.blue,
        width: '100%',
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        flexDirection: 'row',
        width: '100%',
    },
    firstView: {
       flex: 1,
       paddingLeft:10,
       gap: 2
    },
    secondView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },
    timeView: {
        backgroundColor: COLORS.green,
        borderRadius: 6,
        height: 70,
        width: 145,
        justifyContent: 'center',
        alignItems: 'center'
    },
    stopButton: {
        backgroundColor: COLORS.redish,
        borderRadius: 6,
        height: 70,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pictureContainer: {
        backgroundColor: COLORS.white,
        width: width/2.4,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        paddingVertical: 10
    },
    reportContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-between',marginVertical:20
    },
    report:{
        backgroundColor: COLORS.black131,
        width: width/3.6,
        borderRadius: 5,
        paddingHorizontal:10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom:10
    },
    innerView:{
        width:'60%',marginLeft:10
    },
    reportView:{
        width:'85%',paddingTop:10
    },
    stoprideButton: {
        backgroundColor: COLORS.redish,
        borderRadius: 4,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    autoPause:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
         marginVertical: 20
    },
    autoresume:{
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginVertical: 5, marginBottom: 20
    },
    row:{
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginTop: 5
    },
    stopView:{
         marginBottom: 20
    },
    SearchBox: {
        backgroundColor: COLORS.black21,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.semigrey,
        paddingHorizontal: 12,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width:'65%',
       
    },
    inputBox: {
        flex: 1,
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        color: COLORS.white,
        fontFamily: fonts.PoppinsLight,
        fontSize: 15,
        height: 50
    },
})