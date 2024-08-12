import {StyleSheet} from 'react-native'
import { COLORS, ms } from '../../style'
import { height, width } from '../../style/typography'
export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.black,
    },
    logoView:{
        flex: 1,
        alignItems:'center'
    },
    gradient: {
        ...StyleSheet.absoluteFillObject, 
        height: height,
        width: width,
      },
    shaedelementlogoView:{
        marginVertical:ms(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage:{ 
        width: 207, 
        height:207,
        marginTop:ms(8),

    },
    
  
})