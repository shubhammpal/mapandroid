import { View, Text, TouchableOpacity, Switch, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { BackToLocationIcon, BlackCameraIcon, BlackPauseIcon, PauseIcon, WhiteCameraIcon } from '../../assets/svgImg/SvgImg'
import { COLORS } from '../../style'
import AppText from '../AppText/AppText'
import { styles } from './styles'
import SubmitButton from '../ButtonCotainer/SubmitButton'
import { shadowStyle } from '../../style/typography'
type StopContainerprops = {
  setScreenData: any,
  setAddressHeight: any
  takePhotoFromCamera?: any
  handleApicall2: any
  userId?: any
  finalLoad?: boolean
  groupRide?: any
}
const StopContainer = ({ setScreenData, setAddressHeight, takePhotoFromCamera, handleApicall2, userId, finalLoad, groupRide }: StopContainerprops) => {
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;

    setAddressHeight(height);
  };
  return (
    <View style={styles.stopView} onLayout={onLayout}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {

          takePhotoFromCamera()
        }} style={[styles.pictureContainer, shadowStyle, { borderWidth: 0.5, borderColor: COLORS.whiteEB }]}>
          <BlackCameraIcon />
          <View style={styles.innerView}>
            <AppText size={15} color={COLORS.black} family='PoppinsRegular' align='center'>Take Photo</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={[styles.pictureContainer, shadowStyle, { borderWidth: 0.5, borderColor: COLORS.whiteEB }]} onPressIn={toggleSwitch2}>
          {isEnabled2 ? <BackToLocationIcon active={'black'} />  : <BlackPauseIcon />}
          <View style={styles.innerView}>
            <AppText size={15} color={COLORS.black} family='PoppinsRegular' align='center'>{isEnabled2 ? 'Resume Ride' : "Pause Ride"}</AppText>
          </View>
        </TouchableOpacity>

      </View>

      <View style={{ marginTop: 10 }}>
        <SubmitButton title={'Back'} pressing={() => setScreenData(3)} widthOf={'100%'} height={55} />
      </View>
      { }
      {
        userId == true ? (

          <TouchableOpacity style={styles.stoprideButton} onPress={() => { handleApicall2() }}>
            <AppText size={18} color={COLORS.white} family='PoppinsBold' >Stop Ride</AppText>
          </TouchableOpacity>
        ) : (
          <>
            {
              userId == false ? (
                <><View style={{ height: 25 }} /></>
              ) : (
                <TouchableOpacity style={styles.stoprideButton} onPress={() => { handleApicall2() }}>
                  {
                    finalLoad ? (
                      <ActivityIndicator color={'white'} size={35} />
                    ) : (
                      <AppText size={18} color={COLORS.white} family='PoppinsBold' >{groupRide ? 'Stop Ride' : 'Stop Ride'}</AppText>
                    )
                  }
                </TouchableOpacity>
              )
            }

          </>
        )
      }
    </View>
  )
}

export default StopContainer