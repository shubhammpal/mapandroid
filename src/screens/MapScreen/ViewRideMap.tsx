import { View, Text, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapboxGL from '@rnmapbox/maps';
import { styles } from './styles';
import { DestinationICon, DestinationLogo, NewGreenOriginIcon, StartlocationICon } from '../../assets/svgImg/SvgImg';
import { fetchDirections } from '../../services/api_Services';
import { COLORS, ms } from '../../style';
import AppText from '../../component/AppText/AppText';
MapboxGL.setAccessToken('sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg');

const ViewRideMap = ({ navigation, route }: any) => {
  const [cameraKey, setCameraKey] = useState(0);
  const cameraRef = useRef<MapboxGL.Camera>(null);
  const [avoidRoute, setAvoidRoute] = useState<any>(null);
  const [routeData, setRouteData] = useState<any>();

  const rideData = route?.params?.data
  useEffect(() => {
    getDirections(rideData)
  }, [])

  const handleFitBounds = (desti?: any) => {
    if (cameraRef.current && [rideData?.fromLocation?.longitude, rideData?.fromLocation?.latitude] && rideData?.toLocation?.latitude) {
      cameraRef.current.fitBounds(
        [rideData?.fromLocation?.longitude, rideData?.fromLocation?.latitude],
        [rideData?.toLocation?.longitude, rideData?.toLocation?.latitude],
        [100, 50, 100, 50], // Padding: [top, right, bottom, left]
        1000 // Animation duration in milliseconds
      );
    }
  };

  


  const getDirections = async (desti: any, address?: any) => {

    if (rideData) {
      const origin = [rideData?.fromLocation?.longitude, rideData?.fromLocation?.latitude];
      const destination = [rideData?.toLocation?.longitude, rideData?.toLocation?.latitude];
      const routeData = await fetchDirections(origin, destination, avoidRoute);

      const steps = routeData.legs[0].steps;

      
      if (routeData) {
        setRouteData(routeData?.geometry)
        handleFitBounds(rideData)
      }

     

    }
  };

  async function checkBikeRestrictions(steps: any) {

    for (let step of steps) {
      for (let intersection of step.intersections) {
        const classes = intersection.classes || [];
        if (classes.includes('motorway')) {
          return true; // Bike not allowed
        }
      }
    }

    return false; // Bike allowed
  }

  return (
    <View style={{ flex: 1 }}>
      {
        Platform.OS == 'ios' || Platform.OS == 'android' && (
          <MapboxGL.MapView
            style={styles.ViewMap}
            scrollEnabled
          >
            {
              rideData?.fromLocation?.latitude && (
                <>
                  <MapboxGL.Camera
                    zoomLevel={14}
                    centerCoordinate={[rideData?.fromLocation?.longitude, rideData?.fromLocation?.latitude]}
                    ref={cameraRef}
                  />
                  <MapboxGL.PointAnnotation
                    id="userLocation"
                    coordinate={[rideData?.fromLocation?.longitude, rideData?.fromLocation?.latitude]}
                  >

                    <NewGreenOriginIcon />
                    
                  </MapboxGL.PointAnnotation>
                </>
              )
            }

            {
              rideData?.toLocation?.latitude && (
                <>

                  <MapboxGL.PointAnnotation
                    id="userLocation"
                    coordinate={[rideData?.toLocation?.longitude, rideData?.toLocation?.latitude]}
                  >

                    <DestinationLogo />
                   
                  </MapboxGL.PointAnnotation>
                </>
              )
            }
            {routeData && (
              <>
                <MapboxGL.ShapeSource id="routeBorderSource" shape={routeData}>
                  <MapboxGL.LineLayer
                    id="routeBorder"
                    style={{
                      lineColor: COLORS.black,
                      lineWidth: 6, // The width includes the border width + line width
                      lineOpacity: 1,
                    }}
                  />
                </MapboxGL.ShapeSource>
                <MapboxGL.ShapeSource id="routeSource" shape={routeData}>
                  <MapboxGL.LineLayer id="routeFill" style={{
                    lineColor: COLORS.blue,
                    lineWidth: 4, // The actual line width
                    lineOpacity: 1,
                  }} />
                </MapboxGL.ShapeSource>
              </>
            )}

          </MapboxGL.MapView>
        )
      }
      <View style={[styles.rideOverview, {marginTop: -10}]}>
        <View style={{ marginVertical: 15, marginHorizontal: ms(2), paddingBottom:10,  }}>
          <AppText size={20} color={COLORS.white} family="PoppinsMedium">
            Ride Map
          </AppText>
          <View style={styles.row2}>
            <View style={styles.iconContainer}>
              <StartlocationICon />
            </View>
            <View style={{ marginHorizontal: 15, width: '88%' }}>
              <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                Start
              </AppText>
              <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                {rideData?.fromLocation?.name}
              </AppText>
              <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                {rideData?.startPointMapLink}
              </AppText>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={styles.iconContainer}>
              <DestinationICon />
            </View>
            <View style={{ marginHorizontal: 15, width: '88%' }}>
              <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                Destination
              </AppText>
              <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                {rideData?.toLocation?.name}
              </AppText>

            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ViewRideMap