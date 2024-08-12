import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";


export const styles = StyleSheet.create({
    scrollview: {
        flexGrow: 1,backgroundColor: COLORS.black131
    },
    container: {
        flex: 1,
        paddingVertical: ms(2),
        paddingHorizontal: ms(0),
        backgroundColor: COLORS.black
    },
    detailscontainer: {
        flex: 1,
        backgroundColor: COLORS.black131
    },
    coverarrow: {
        flexDirection: 'row', marginVertical: ms(2),
        marginHorizontal: ms(0), alignItems: 'center',
        justifyContent:'space-between'
    },
    views:{
        flexDirection:'row',alignItems:'center'
    },
    detailsmainContainer: {
        marginHorizontal: ms(1),
    },
    logo:{
        height: 120, 
        width: 120, 
        borderRadius: 50,
        marginTop: -40,
        backgroundColor:COLORS.black,
    },
    item: {
        height: 140,
        width: 140,
        borderRadius: 5,
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
        marginBottom: 5
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
        width: '60%', marginHorizontal: 20
    },
    view: {
        borderRadius: 4,
        height: 30,
        backgroundColor: COLORS.black3030, paddingHorizontal: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10
    },
    viewConatiner: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    row: {
        flexDirection: 'row',
    },
    chatICon:{
        backgroundColor:COLORS.white,
        borderColor:COLORS.greyBCBC,
        borderWidth:1,
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:50
      }
})