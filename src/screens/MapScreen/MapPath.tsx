
import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity, Image, ActivityIndicator, Platform } from 'react-native';
import MapView, { Polyline, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';
import { mapStyle1 } from '../../component/data/mapdata';
import { ArrowBAckIcon, BackToLocationIcon, DestinationLogo, InfoIcon, LocationIcon, LocationIcon2, MapIcon, NewGreenOriginIcon } from '../../assets/svgImg/SvgImg';
import { COLORS, ms } from '../../style';
import { formatTime, shadowStyle } from '../../style/typography';
import AppText from '../../component/AppText/AppText';
import { AuthContext } from '../../component/auth/AuthContext';
import ImgView from '../../component/ImgView/ImgView';
import FastImage from 'react-native-fast-image';
// const MapboxGL = Platform.OS === 'ios' ? require('@react-native-mapbox-gl/maps') : null;
import MapboxGL from '@rnmapbox/maps';
MapboxGL.setAccessToken('sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg');

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 28.7041;
const LONGITUDE = 77.1025;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
if (Platform.OS == 'ios') { }


const MapPath = ({ route, navigation }: any) => {
  

  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [dataShow, setDataShow] = useState<any>();
  const { userToken, userDetails }: any = useContext(AuthContext);
  const data = route.params
  const createdDate: any = new Date(data?.createdAt);
  const updatedDate: any = new Date(data?.updatedAt);

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = updatedDate - createdDate;

  // Convert the difference to total minutes
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60);

  // Calculate the hours and remaining minutes
  const hours = Math.floor(differenceInMinutes / 60);
  const minutes = differenceInMinutes % 60;

  const dateFetch = (dateStr: any) => {
    const date = new Date(dateStr);

    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-indexed
    const year = date.getUTCFullYear();

    // Format the date as dd-mm-yyyy
    const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    handleFitBounds()
    return formattedDate; // Output: "14-06-2024
  }
  const traveledPath = JSON.parse(data?.mapFinalResponse[0])
  // const cameraRef = useRef<MapboxGL.Camera>(null);
  const cameraRef = useRef<any>(null);
  const handleFitBounds = () => {
    if (cameraRef.current && traveledPath[0] && traveledPath[traveledPath.length - 1]) {
      cameraRef.current.fitBounds(
        traveledPath[0],
        traveledPath[traveledPath.length - 1],
        [50, 50, 50, 50], // Padding: [top, right, bottom, left]
        1000 // Animation duration in milliseconds
      );
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.black }} automaticallyAdjustContentInsets showsVerticalScrollIndicator={false}>
        
        {
          Platform.OS == 'ios' || Platform.OS == 'android' ? (
            <MapboxGL.MapView
              style={styles.mapBox}
              scrollEnabled
            >
              {
                traveledPath[0] && (
                  <>
                    <MapboxGL.Camera
                      zoomLevel={14}
                      centerCoordinate={traveledPath[0]}
                      ref={cameraRef}
                    />
                    <MapboxGL.PointAnnotation
                      id="userLocation"
                      coordinate={traveledPath[0]}
                    >

                      <NewGreenOriginIcon />
                      {/* </View> */}
                    </MapboxGL.PointAnnotation>
                  </>
                )
              }
              {
                traveledPath[0] && traveledPath[traveledPath.length - 1] && (
                  <>

                    <MapboxGL.PointAnnotation
                      id="userLocation"
                      coordinate={traveledPath[traveledPath.length - 1]}
                    >

                      <DestinationLogo />

                    </MapboxGL.PointAnnotation>
                  </>
                )
              }
              {traveledPath.length > 1 && (
                <MapboxGL.ShapeSource
                  id="traveledPathSource"
                  shape={{
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: traveledPath,
                    },
                  }}
                >
                  <MapboxGL.LineLayer
                    id="traveledPathFill"
                    style={{
                      lineColor: COLORS.black,
                      lineWidth: 6,
                      lineOpacity: 1,
                    }}
                  />
                  <MapboxGL.LineLayer
                    id="traveledPathFill2"
                    style={{
                      lineColor: COLORS.blue,
                      lineWidth: 4,
                      lineOpacity: 1,
                    }}
                  />
                </MapboxGL.ShapeSource>
              )}

            </MapboxGL.MapView>
          ) : (
            null
          )
        }

        <View style={{ flex: 1, backgroundColor: COLORS.black131, paddingBottom: 25, marginTop: -35 }}>
          <View style={styles.arrivalContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>

              <AppText size={16} color={COLORS.white} family='PoppinsMedium'  >{data?.rideKm} km</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular' >Distance</AppText>
            </View>
            <View style={{ height: "100%", width: 2, marginVertical: 5, backgroundColor: COLORS.black }} />
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <AppText size={16} color={COLORS.white} family='PoppinsMedium' >{`${hours} h ${minutes} min`}</AppText>
              <AppText size={14} color={COLORS.mediumgray} family='PoppinsRegular'>Time</AppText>
            </View>
           
          </View>
          <View style={{ width: "100%", paddingHorizontal: ms(3) }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <AppText size={16} color={COLORS.white} family='PoppinsRegular'>Date</AppText>
              <AppText size={16} color={COLORS.lightBlue} family='PoppinsRegular'>{dateFetch(data?.updatedAt)}</AppText>
            </View>
            

            <View style={{}} />
            <AppText size={15} color={COLORS.white} family='PoppinsBold'>Start address</AppText>
            <View style={{ height: 5 }} />
            <AppText size={12} color={COLORS.white} family='PoppinsRegular'>{data?.startAddress}</AppText>

            <View style={{ marginTop: 20 }} />
            <AppText size={15} color={COLORS.white} family='PoppinsBold'>End address</AppText>
            <View style={{ height: 5 }} />
            <AppText size={12} color={COLORS.white} family='PoppinsRegular'>{data?.endAddress}</AppText>
          </View>
        </View>
        <View style={{ paddingHorizontal: ms(0), backgroundColor: COLORS.black, paddingVertical: 10 }}>
          <View style={{ borderBottomWidth: 2, borderBottomColor: COLORS.blue, paddingBottom: 10, marginBottom: 20 }} >
            <View style={{ paddingVertical: 10, paddingHorizontal: 5, alignSelf: "flex-start" }}>
              <AppText size={15} color={COLORS.white} family='PoppinsMedium'>Gallery</AppText>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: "wrap", width: "100%", }}>

            {data?.images.length > 0 ? (
              data?.images.map((ite: any, index: number) => {
                return (
                  <TouchableOpacity key={ite?._id} style={{ width: "33%" }}>
                    <FastImage
                      style={{ height: 110, width: '95%', borderRadius: 10 }}
                      source={{ uri: ite?.path }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={{ alignItems: 'center', flex: 1 }}>
                <AppText size={16} color={COLORS.white} family='PoppinsMedium'>No image found</AppText>
              </View>
            )}
          </View>
        </View>
        <View style={{ height: 25 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black
  },
  mapBox: {
    height: 300,
    width: '100%'

  },
  map: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  locationIcon: {
    backgroundColor: COLORS.black,
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,

  },
  arrivalContainer: {
    paddingVertical: 5,
    backgroundColor: COLORS.black21,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: ms(0),
    marginVertical: ms(0)
  },

});

export default MapPath;

