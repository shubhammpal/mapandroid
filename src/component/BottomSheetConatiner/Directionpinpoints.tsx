import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { styles } from './styles'
import { AlternativeIcon, CrossIcon, DeleteIcon, FastestIcon, FerriesIcon, FlagIcon, HighwayIcon, ReverseIcon, ShortICon, SmallDestinationIcon, SuperThrillingIcon, ThrillingIcon, TollRoads, UnpavedRoadsIcon } from '../../assets/svgImg/SvgImg'
import { COLORS, ms } from '../../style'
import AppText from '../AppText/AppText'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { WhatsTime, timeShortMap } from '../../utils/misc'
type DirectionpinpointsProps = {
  setScreenData: any,
  setAddressHeight: any
  directionData: any
  setAvoidRoute: any
  endAddress: any
  startAddress: any
  handleStartButtonClick: () => void
}
const data = [
  { key: 1, job: "Short", img: ShortICon, extraImg: '', mode: "WALKING" },
  { key: 2, job: "Fastest", img: FastestIcon, extraImg: '', mode: "DRIVING" },
  { key: 3, job: "Thrilling", img: ThrillingIcon, extraImg: '', mode: "BICYCLING" },
  { key: 4, job: "Super Thrilling", img: SuperThrillingIcon, extraImg: '', mode: "TRANSIT" },
  { key: 5, job: "Alternative", img: AlternativeIcon, extraImg: '', mode: "WALKING" }
];
const dotData = [1, 1, 1];
const data2 = [
  { key: 1, job: "Highways", img: HighwayIcon, extraImg: '', mode: "motorway" },
  { key: 2, job: "Toll Roads", img: TollRoads, extraImg: '', mode: "toll" },
  { key: 3, job: "Unpaved Roads", img: UnpavedRoadsIcon, extraImg: '', mode: "unpaved" },
  { key: 3, job: "Ferries", img: FerriesIcon, extraImg: '', mode: "ferry" },
  // { key: 5, job: "Tunnels", img: TunnelsIcon, extraImg: '' },
  // { key: 6, job: "Shuttle Trains", img: ShuttleTrainsIcon, extraImg: '', mode: "highways"  }

];
const Directionpinpoints = ({ setScreenData, setAddressHeight, directionData, handleStartButtonClick, setAvoidRoute, endAddress, startAddress, }: DirectionpinpointsProps) => {
  
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;

    setAddressHeight(height);
  };
  const [index, setIndex] = useState<any>(null);
  const [indexroute, setIndexRoute] = useState<any>(null);

  const DistanceMap = (directionData?.distance / 1000).toFixed(2); // distance in km
  const durationInMinutes = directionData?.duration / 60; // duration in minutes
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = Math.floor(durationInMinutes % 60);
  
  const formatedistance = `${(directionData?.distance / 1000).toFixed(2)}`;
  const FormattedDuration = `${hours == 0 ? '' : `${hours} hr`} ${minutes} min`;

  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + durationInMinutes);
  const arrivalHours = currentTime.getHours();
  const arrivalMinutes = currentTime.getMinutes();
  const period = arrivalHours >= 12 ? 'PM' : 'AM';
  const formattedArrivalHours = arrivalHours % 12 || 12;
  const formattedArrivalMinutes = arrivalMinutes.toString().padStart(2, '0');
  const finalTiming = `${formattedArrivalHours}:${formattedArrivalMinutes} ${period}`;

  const Tcolors = {
    active: COLORS.blue,
    inactive: COLORS.white2D,
  };
  const renderItem = useCallback(
    (item: any, fIndex: number) => {
      const IconComponent = item.img;
      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setIndex(fIndex);
            // setModeData(item?.mode)
          }}
        >
          <View
            style={{
              paddingVertical: 4,
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: COLORS.black141,
              backgroundColor: fIndex == index ? Tcolors.active : Tcolors.inactive,
              flexDirection: "row",
              alignItems: 'center',
              gap: 10,
              justifyContent: 'center',
              marginRight: ms(1)
            }}
          >
            <IconComponent isActive={fIndex == index} />
            <AppText color={COLORS.white} size={14} family={'PoppinsRegular'}>
              {item.job}
            </AppText>
          </View>
        </TouchableOpacity>
      );
    },
    [index]
  );
  const renderItemRoute = useCallback(
    (item: any, fIndex: number) => {
      const IconComponent = item.img;
  
      return (
        <TouchableOpacity
          style={{ flex: 1, width: "30%", justifyContent: 'center', alignItems: 'center', }}
          onPress={() => {

            if (indexroute == fIndex) {
              setIndexRoute(null)
              setAvoidRoute(null)
            } else {
              setIndexRoute(fIndex);
              setAvoidRoute(item?.mode)
            }
          }}
        >
          <View
            style={{
              paddingHorizontal: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: ms(1),
            }}
          >
            <View style={{ height: 25 }}>
              <IconComponent isActive={fIndex == indexroute} />

            </View>
            <View style={{ marginTop: 6 }}>
              <AppText color={fIndex == indexroute ? COLORS.lightyellow : COLORS.mediumgray} size={13} family={'PoppinsRegular'} align='center'>
                {item.job}
              </AppText>

            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [indexroute]
  );

  return (
    <View style={{}} onLayout={onLayout}>
      <View style={styles.view}>
        <TouchableOpacity style={styles.distanceView} onPress={() => setScreenData(1)}>
          <CrossIcon />
        </TouchableOpacity>
        { }
        <View>
          <View style={styles.arrivalContainer}>
            <View style={{ width: "33%", justifyContent: 'center', }}>
              <AppText size={16} color={COLORS.white} family='PoppinsBold'  >{finalTiming}</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular' >Arrival</AppText>
            </View>
            <View style={[styles.time, {  height: "103%" }]}>
              <AppText size={16} color={COLORS.white} family='PoppinsBold' >{FormattedDuration}</AppText>
              <AppText size={14} color={COLORS.white} family='PoppinsRegular' align='center'>Time</AppText>
            </View>
            <View style={{ width: "33%", justifyContent: 'center', alignItems: 'flex-end', }}>
              <AppText size={16} color={COLORS.white} family='PoppinsBold' >{formatedistance}</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular'>KM </AppText>
            </View>
          </View>
          
          <ScrollView style={{ marginTop: 15 }} horizontal showsHorizontalScrollIndicator={false}>
            {data2.map(renderItemRoute)}
          </ScrollView>
          <View style={[styles.startView, { marginTop: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10, }]}>
            <SmallDestinationIcon />
            <AppText size={16} color={COLORS.greyDC} family='PoppinsRegular' numLines={1} dotMode='tail' horizontal={20}>{startAddress ? startAddress : 'Your location'}</AppText>
          </View>
         
          <View style={[styles.startView, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: -1 }]}>
            <FlagIcon />
            <AppText size={16} color={COLORS.greyDC} family='PoppinsRegular' numLines={1} horizontal={20}>{endAddress}</AppText>
          </View>
          <View>
          </View>
        </View>

        <View style={styles.buttonView}>
         
          <TouchableOpacity style={styles.startrideButton} onPress={() => {
            setScreenData(3)
            handleStartButtonClick()
          }}>
            <AppText size={15} color={COLORS.white} family='PoppinsBold' >Start Ride</AppText>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  )
}

export default Directionpinpoints