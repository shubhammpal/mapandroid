import { View, Text, Modal, Image, Linking, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubmitButton from '../ButtonCotainer/SubmitButton'
import { useNetInfo } from "@react-native-community/netinfo";
import { fonts } from '../../utils/misc';
import { COLORS, ms } from '../../style';
import { CrossRedIcon } from '../../assets/svgImg/SvgImg';
import FastImage from 'react-native-fast-image';
const RideCompleteBox = ({setDestinationArrivedBox, EndRideAction, setScreenData, point}: any) => {
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
    <View style={{ flex: 1, width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}>
    <View style={{ backgroundColor: COLORS.black, flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
      <View style={{
        width: "90%", backgroundColor: COLORS.black, paddingHorizontal: ms(0),
        borderRadius: 21, justifyContent: 'center', alignItems: 'center',
      }}>
        <Image source={require('../../assets/img/bikeimage.png')} style={{
          width: 100,
          height: 100,
          tintColor: 'white'
        }} resizeMode={'contain'} />
        <View style={{ borderWidth: 2, borderColor: COLORS.white, width: 150 }} />
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 15, color: COLORS.white, fontFamily: fonts.PoppinsBold }}>Earned point-  <Text style={{ fontSize: 15, color: COLORS.blue, fontFamily: fonts.PoppinsBold }}>{point}</Text> </Text>
        <View style={{ height: 20 }} />
        <Text style={{ fontSize: 20, color: COLORS.white, fontFamily: fonts.PoppinsBold }}>Ride complete</Text>
        <View style={{ height: 10 }} />
        <Text style={{ fontSize: 15, color: COLORS.white, fontFamily: fonts.PoppinsSemiB, textAlign: 'center' }}>
          You've arrived. Time to kick back and relax!</Text>
        <View style={{ height: 20 }} />
        <SubmitButton title={'Go Back'} pressing={() => {setDestinationArrivedBox(false), setScreenData(0)}} widthOf={'50%'} />
        <View style={{ height: 40 }} />
      </View>
    </View>
  </View>
  )
}

export default RideCompleteBox