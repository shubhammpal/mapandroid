import { StyleSheet } from "react-native";
import { COLORS, ms } from "../../../style";
import { width } from "../../../style/typography";


export const styles = StyleSheet.create({
    scrollview: {
        flexGrow: 1,
        backgroundColor:COLORS.black
    },
    container: {
        flex: 1,
        paddingVertical: ms(2),
        paddingHorizontal: 10,
        backgroundColor: COLORS.black
    },
    starticon:{
        height: 22,
        width: 22,
    },
    item: {
        height: 50,
        width: 69,
        borderRadius: 5,
    },
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black3030, paddingBottom: 20,
    },
   imageVuiew:{
    backgroundColor:COLORS.black2F,width:100,height:100,borderRadius:6,alignItems:'center',justifyContent:'center'
   },
   photoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 5
},
    titleView:{
        width: '58%', marginHorizontal: 20,flex:1
    },
    dateView:{
        flexDirection: 'row', marginVertical: 4,justifyContent:'space-between',
        width: '95%',
    },
   
})