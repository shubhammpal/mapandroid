import { StyleSheet } from 'react-native'
import { COLORS, ms } from '../../style'
import { height, width } from '../../style/typography'
import { fonts } from '../../utils/misc'
export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
      
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        left: '30%',
        transform: [{ translateX: -75 }],
        width: 150,
    },
    topConatiner: {
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'center',
        alignSelf: 'center',
        position:"absolute",
        paddingTop: 65,
        paddingHorizontal: 15
    },
    drawer: {
        backgroundColor: COLORS.black,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    locationIcon: {
        backgroundColor: COLORS.black,
        height: 44,
        width: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: ms(2),
        
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden',
    },
    bottomSheetContainer: {
        backgroundColor: COLORS.black,
    },
    handleIndicator: {
        backgroundColor: COLORS.black313,
        height: 7,
        width: 35
    },
    innerView:{
        width:'60%',marginLeft:10
    },
    pictureContainer: {
        backgroundColor: COLORS.black1B1D,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical: 15
    },
    upcomingStepContainer:{
        width: "100%",
        alignSelf: 'center',
        backgroundColor:COLORS.green,
        paddingVertical: 5,
        paddingRight: 35,
        paddingLeft: 15,
        borderRadius: 15,
        flexDirection:"row",
        alignItems: 'center',
       
    },
    upcomingStepText:{
        color: 'blue'
    },
    drawerTopView:{
        width: "90%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 50
    },
    topMapFunction:{
        position:'absolute',
        width: "95%",
        alignSelf: 'center',
        flexDirection:"row",
        justifyContent: 'space-between',
        marginTop: 50,
        
    },
    bottomStartButton:{
        width:"90%",
        alignSelf: 'center',
        position:'absolute',
        bottom: 20,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.blue
    },
    markerPlayer:{
        height: 25, width: 25, borderRadius: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.5)'
    },
    markerPlayerINNER:{
        height: 20, width: 20, borderRadius: 35, justifyContent: 'center', alignItems: 'center',alignSelf: 'center', 
    },
    page: {
        flex: 1,
        
      },
      containerMap: {
        width: '100%',
        backgroundColor: 'black',
      },
      mapBox: {
        flex: 1,
      },
      annotationContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(0, 122, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',
      },
      annotationFill: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#007AFF',
        transform: [{ scale: 0.6 }],
      },
      ViewMap:{
        flex: 1
        ,height:"100%"
      },
      rideOverview:{
        backgroundColor: COLORS.black,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
      },
      iconContainer: {
        backgroundColor: COLORS.white2D,
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      row2: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
    
      },
      mapGroupContainer:{
        flex: 1
      }
      
})