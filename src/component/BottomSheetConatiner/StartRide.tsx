import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { CrossIcon } from '../../assets/svgImg/SvgImg'
import AppText from '../AppText/AppText'
import { COLORS } from '../../style'
import { WhatsTime, timeShortMap } from '../../utils/misc'
type StartRideProps = {
  setScreenData: any,
  setAddressHeight: any
  directionData: any
  distance: any
  duration: any
  userId?: any
  directionRouteDetails?: any
}
const StartRide = ({ setScreenData, setAddressHeight, directionData, distance, duration, userId, directionRouteDetails }: StartRideProps) => {
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setAddressHeight(height);
  };
  const DistanceMap = (directionRouteDetails?.distanceTraveled / 1000).toFixed(2); // distance in km
  const durationInMinutes = directionRouteDetails?.durationRemaining / 60; // duration in minutes
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.floor(durationInMinutes % 60);

  const formatedistance = `${(directionRouteDetails?.distanceRemaining / 1000).toFixed(2)}`;
  const FormattedDuration = `${hours == 0 ? '' : `${hours} hr`} ${minutes} min`;

  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + durationInMinutes);
  const arrivalHours = currentTime.getHours();
  const arrivalMinutes = currentTime.getMinutes();
  const period = arrivalHours >= 12 ? 'PM' : 'AM';
  const formattedArrivalHours = arrivalHours % 12 || 12;
  const formattedArrivalMinutes = arrivalMinutes.toString().padStart(2, '0');
  const finalTiming = `${formattedArrivalHours}:${formattedArrivalMinutes} ${period}`;

  
  return (
    <View style={{}} onLayout={onLayout}>
      <View style={{ height: 15 }} />
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          <AppText size={22} color={COLORS.black} family='PoppinsBold'>{finalTiming}</AppText>
          <AppText size={16} color={COLORS.black} family='PoppinsRegular'  >Arrival</AppText>
         
          <AppText size={16} color={COLORS.black} family='PoppinsSemiB'  >{formatedistance} km  {'\u2022'}  {FormattedDuration}</AppText>
        </View>
        <View style={styles.secondView}>
          {
            userId ? (
              <TouchableOpacity style={[styles.stopButton,{backgroundColor: COLORS.blue}]} onPress={() => setScreenData(4)}>
                <AppText size={20} color={COLORS.white} family='PoppinsBold' >Options</AppText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.stopButton} onPress={() => setScreenData(4)}>
                <AppText size={20} color={COLORS.white} family='PoppinsBold' >Halt</AppText>
              </TouchableOpacity>
            )
          }
        </View>
      </View>
    </View>

  )
}

export default StartRide