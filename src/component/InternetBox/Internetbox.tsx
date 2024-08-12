import { View, Text, Modal, Image, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubmitButton from '../ButtonCotainer/SubmitButton'
import { useNetInfo } from "@react-native-community/netinfo";
import { fonts } from '../../utils/misc';
import { COLORS, ms } from '../../style';
import { CrossRedIcon } from '../../assets/svgImg/SvgImg';
const InternetBox = () => {
  const { type, isConnected } = useNetInfo();
  const [internet, serttInternet] = useState(false)
  useEffect(() => {
    if (isConnected == false) {
      serttInternet(true)
    } else {
      serttInternet(false)
    }
  }, [isConnected])

  return (
    <View style={{ flex: 1, position: "absolute" }}>
      <Modal
        visible={internet}
        animationType="fade"
        transparent={true}>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ width: "92%", backgroundColor: COLORS.offwhite, paddingHorizontal: ms(0), 
            borderRadius: 21, justifyContent: 'center', alignItems: 'center', }}>
            
            <Image source={require('../../assets/img/internet.png')} style={{
              width: 100,
              height: 100, marginTop: ms(8),
            }} />
            <View style={{ borderWidth: 2, borderColor: COLORS.lightBlack, width: 150 }} />
            <View style={{ height: 20 }} />
            <Text style={{ fontSize: 20, color: COLORS.semiDark, fontFamily: fonts.PoppinsBold }}>Whoops!</Text>
            <View style={{ height: 10 }} />
            <Text style={{ fontSize: 15, color: COLORS.semiDark, fontFamily: fonts.PoppinsSemiB, textAlign: 'center' }}>
              Please check your internet connection</Text>
            <View style={{ height: 20 }} />
            <SubmitButton title={'Try again'} pressing={() => Linking.openSettings()} widthOf={'50%'} />
            <View style={{ height: 40 }} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default InternetBox