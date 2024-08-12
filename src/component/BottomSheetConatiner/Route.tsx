import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { AlternativeIcon, CrossIcon, DeleteIcon, FastestIcon, FerriesIcon, FlagIcon, HighwayIcon, ReverseIcon, ShortICon, ShuttleTrainsIcon, SmallDestinationIcon, SuperThrillingIcon, ThrillingIcon, TollRoads, TunnelsIcon, UnpavedRoadsIcon } from '../../assets/svgImg/SvgImg';
import { COLORS, ms } from '../../style';
import AppText from '../AppText/AppText';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import SubmitButton from '../ButtonCotainer/SubmitButton';
import { WhatsTime, timeShortMap } from '../../utils/misc';

type RouteProps = {
  setScreenData: any,
  setAddressHeight: any
  directionData: any
  setMode: any
  mode: any
  setAlternative: any
  setDestination: any
  getCurrentLocation: any
  setAvoid: any
  setAvoidStatus: any
  avoid: any
}

const Route = ({ setScreenData, setAddressHeight, directionData, setMode, mode, setAlternative, setDestination, getCurrentLocation, setAvoid, setAvoidStatus, avoid }: RouteProps) => {
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;

    setAddressHeight(height);
  };
  const data = [
    { key: 1, job: "Short", img: ShortICon, extraImg: '', mode: "WALKING" },
    { key: 2, job: "Fastest", img: FastestIcon, extraImg: '', mode: "DRIVING" },
    { key: 3, job: "Thrilling", img: ThrillingIcon, extraImg: '', mode: "BICYCLING" },
    { key: 4, job: "Super Thrilling", img: SuperThrillingIcon, extraImg: '', mode: "TRANSIT" },
    { key: 5, job: "Alternative", img: AlternativeIcon, extraImg: '', mode: "WALKING" }
  ];
  const data2 = [
    { key: 1, job: "Highways", img: HighwayIcon, extraImg: '', mode: "highways" },
    { key: 2, job: "Toll Roads", img: TollRoads, extraImg: '', mode: "tolls" },
    // { key: 3, job: "Unpaved Roads", img: UnpavedRoadsIcon, extraImg: '', mode: "highways"  },
    { key: 3, job: "Ferries", img: FerriesIcon, extraImg: '', mode: "ferries" },
    // { key: 5, job: "Tunnels", img: TunnelsIcon, extraImg: '' },
    // { key: 6, job: "Shuttle Trains", img: ShuttleTrainsIcon, extraImg: '', mode: "highways"  }

  ];
  const _colors = {
    active: COLORS.blue,
    inactive: COLORS.white2D,
  };

  const [index, setIndex] = useState();
  const [indexroute, setIndexRoute] = useState<any>();
  const [modeData, setModeData] = useState<any>("DRIVING");
  function addTime(hours: any, minutes: any) {
    // Get the current date and time
    let now = new Date();

    // Add the specified hours and minutes
    now.setHours(now.getHours() + hours);
    now.setMinutes(now.getMinutes() + minutes);

    return now;
  }
  function formatTime(date: any) {
    // Format the hours and minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  let newTime = addTime(WhatsTime(directionData?.legs[0]?.duration?.text, 'hr'), WhatsTime(directionData?.legs[0]?.duration?.text, 'm'));
  let formattedNewTime = formatTime(newTime);
  const renderItem = useCallback(
    (item: any, fIndex: number) => {
      const IconComponent = item.img;
      return (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            setIndex(fIndex);
            setModeData(item?.mode)
          }}
        >
          <View
            style={{
              paddingVertical: 5,
              height: 40,
              paddingHorizontal: 10,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: COLORS.black141,
              backgroundColor: fIndex == index ? _colors.active : _colors.inactive,
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
            
            setIndexRoute(fIndex);
            setAvoid(item?.mode)
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
    <View style={{ marginVertical: 25 }} onLayout={onLayout}>
      <View style={styles.view}>
       
        <View>
          <View style={styles.arrivalContainer}>
            <View style={{ width: "33%", justifyContent: 'center', }}>
              <AppText size={18} color={COLORS.white} family='PoppinsBold'  >{formattedNewTime}</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular' >Arrival</AppText>
            </View>
            <View style={[styles.time, { width: "33%", height: "103%" }]}>
              <AppText size={18} color={COLORS.white} family='PoppinsBold' >{timeShortMap(directionData?.legs[0]?.duration?.text)}</AppText>
              <AppText size={14} color={COLORS.white} family='PoppinsRegular' align='center'>Time</AppText>
            </View>
            <View style={{ width: "33%", justifyContent: 'center', alignItems: 'flex-end', }}>
              <AppText size={18} color={COLORS.white} family='PoppinsBold' >{directionData?.legs[0]?.distance?.text}</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular'>KM</AppText>
            </View>
          </View>
          <BottomSheetScrollView contentContainerStyle={{ marginVertical: 30 }} horizontal showsHorizontalScrollIndicator={false}>
            {data.map(renderItem)}
          </BottomSheetScrollView>
          <AppText size={20} color={COLORS.white} family='PoppinsSemiB'>Avoid on Route</AppText>
          <View style={{ marginVertical: 15, justifyContent: 'space-between', alignItems: "center", flexDirection: "row", }}>
            {data2.map(renderItemRoute)}
          </View>
          <View style={{ marginVertical: 20, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
            <TouchableOpacity style={styles.backView} onPress={() => setScreenData(2)}>
              <AppText size={15} color={COLORS.white} family='PoppinsBold'>Back</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Recalculate} onPress={() => {
              setAvoidStatus(false)
              setTimeout(() => {
                setAvoidStatus(true)
                setTimeout(() => {
                  // setDestination([getCurrentLocation])
                  setMode(modeData)
                }, 1000);
                setModeData()
                
                setScreenData(2)
              }, 1000);


            }}>
              <AppText size={15} color={COLORS.white} family='PoppinsBold' >Recalculate</AppText>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </View>
  );
};

export default Route;
