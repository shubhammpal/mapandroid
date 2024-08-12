import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { styles } from './styles'
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { mapStyle1 } from '../../component/data/mapdata'
import { AuthContext } from '../../component/auth/AuthContext'
import { ArrowBAckIcon, BackToLocationIcon } from '../../assets/svgImg/SvgImg'
import GetLocation from 'react-native-get-location'
import AppText from '../../component/AppText/AppText'
import MapViewDirections from 'react-native-maps-directions'
import { MAP_KEY } from '../../services/api_helper'
import { COLORS } from '../../style'
import { decodePolyline, findNearestPointOnRoute, getDistanceFromLatLonInKm, interpolatePolyline, randomColorCode } from '../../utils/misc'
import Geolocation from '@react-native-community/geolocation'
import { getEventRideData, requestRideHistoryApi, requstImageUploadInSoloRIde } from '../../services/api_Services'
import { height } from '../../style/typography'
import BottomSheet, { BottomSheetHandle, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useFocusEffect } from '@react-navigation/native'
import Directionpinpoints from '../../component/BottomSheetConatiner/Directionpinpoints'
import StartRide from '../../component/BottomSheetConatiner/StartRide'
import StopContainer from '../../component/BottomSheetConatiner/StopContainer'
import ImagePicker from 'react-native-image-crop-picker';
import AddReport from '../../component/BottomSheetConatiner/AddReport'
import { reportData } from '.'
import Route from '../../component/BottomSheetConatiner/Route'
import { activateKeepAwake, deactivateKeepAwake } from '@sayem314/react-native-keep-awake';
import socketServcies from '../../services/socket_Services'

const UserMap = ({ navigation, route }: any) => {
  const _map: any = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const { location, userDetails, userToken }: any = useContext(AuthContext)
  const data = route.params
  
  const [screenData, setScreenData] = useState<any>(10);
  const [currentLocation, setCurrentLocation] = useState<any>()
  const [rideDetails, setRideDetails] = useState<any>()
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [twoD, setTwoD] = useState<boolean>(true);
  const [interpolatedRouteCoordinates, setInterpolatedRouteCoordinates] = useState<any[]>([]);
  const [rideHistoryStartData, setRideHistoryStartData] = useState<any>();
  const [currentArr, setCurrentArr] = useState<any[]>([]);
  const [addressHeight, setAddressHeight] = useState(0);
  const [directionData, setDirectionData] = useState<any>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMapFocusedOnMarker, setIsMapFocusedOnMarker] = useState<any>(false);
  const [distance, setDistance] = useState<any>(0);
  const [duration, setDuration] = useState<any>(0);
  const [allRiderLocationData, setAllRiderLocationData] = useState<any[]>([]);
  const [pictureOnLastLng, setPictureOnLastLng] = useState<any[]>([]);
  const [waypoints, setWaypoints] = useState<any[]>([]);
  useEffect(() => {
    activateKeepAwake();
    return () => {

      deactivateKeepAwake();
    };
  }, []);
  const snapPoints = useMemo(
    () =>
      screenData == 2 ||
        screenData == 1 ||
        screenData == 4 ||
        screenData == 5
        ? [addressHeight + 60]
        : screenData == 3 ? [addressHeight + 40] : [addressHeight + 100],
    [screenData, addressHeight],
  );
  const [initialPosition, setInitialPosition] = useState({
    "latitude": data?.fromLocation?.latitude,
    "longitude": data?.fromLocation?.longitude,
    "latitudeDelta": 0.01,
    "longitudeDelta": 0.01,
  })
  const [destination, setDestination] = useState({
    "latitude": data?.toLocation?.latitude,
    "longitude": data?.toLocation?.longitude,
    "latitudeDelta": 0.01,
    "longitudeDelta": 0.01,
  })

  useEffect(() => {
    if (screenData == 0) {
      navigation.goBack()
    }
  }, [screenData])


  useEffect(() => {
    socketServcies.initializeSocket()
  }, [])


  useFocusEffect(
    React.useCallback(() => {
      if (screenData == 1) {
        sheetRef.current?.snapToIndex(0);
      } else if (screenData == 2) {
        sheetRef.current?.snapToIndex(0);
      } else if (screenData == 3) {
        sheetRef.current?.snapToIndex(0);
      } else if (screenData == 4 || screenData == 5) {
        sheetRef.current?.snapToIndex(0);
      } else if (screenData == 6) {
        sheetRef.current?.snapToIndex(0);
      }
    }, [screenData]),
  );
  useEffect(() => {
    getEventRideDetails()
  }, [rideHistoryStartData])

  const handleSheetChange = (index: number) => {
    if (index >= 0 && index < snapPoints.length) {
      setCurrentIndex(index);
    } else {
      console.warn(
        `Invalid index: ${index}. Expected between 0 and ${snapPoints.length - 1
        }`,
      );
    }
  };
  useEffect(() => {
    if (_map.current && currentLocation) {
      _map.current.animateToRegion({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        latitudeDelta: 0.00005,
        longitudeDelta: 0.0005,
      });
    }
  }, []);
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setCurrentArr(oldArray => [...oldArray, {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }]);
        _map.current?.animateCamera({
          center: {
            latitude: latitude, // Adjust the offset for keeping the location near the bottom
            longitude: longitude,
          },
          zoom: 18,
        }, { duration: 1000 });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [])

  useEffect(() => {
    if (coordinates) {
      const watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude, heading } = position.coords;
          let newLocation = {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.00005,
            longitudeDelta: 0.0005,
            heading: heading
          }
          if (latitude && longitude) {

            const nearestPoint = findNearestPointOnRoute(latitude, longitude, interpolatedRouteCoordinates);
            if (nearestPoint) {
              const distanceToPolyline = getDistanceFromLatLonInKm(latitude, longitude, nearestPoint?.latitude, nearestPoint?.longitude);

              if (distanceToPolyline >= 0.10) {
                const newWaypoint = { latitude: newLocation.latitude, longitude: newLocation.longitude };
                setWaypoints(prevWaypoints => [...prevWaypoints, newWaypoint]);
              }
            }

            const distanceToPolylineOfendPoint = getDistanceFromLatLonInKm(latitude, longitude, destination?.latitude, destination?.longitude);

            if (distanceToPolylineOfendPoint <= 0.03) {
              handleApicall2("arrive")

            }
          }
          if (rideDetails && rideDetails.length) {

            const dataSocket = [{ user_id: userDetails?.id, event_id: data?._id, lat: latitude, lng: longitude, ride_id: rideDetails[0]?._id, user_name: userDetails?.full_name }]
            
            socketServcies.emit('save_events', dataSocket)
          }
          setCurrentArr(oldArray => [...oldArray, newLocation]);
          setCurrentLocation(newLocation)
        },
        error => console.log('Watch position error:', error),
        { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
      );

      return () => {
        Geolocation.clearWatch(watchId);
      }
    }
  }, [isMapFocusedOnMarker, waypoints]);

  useEffect(() => {
    socketServcies.on('event_details', (msg) => {
      
      if (msg?.status == true) {
        setAllRiderLocationData(msg?.payload)
      }
    })
  }, [socketServcies])

  const fitToCordinate = (interpolatedPoints: any) => {

    
    _map?.current?.fitToCoordinates(interpolatedPoints, {
      edgePadding: {
        right: 50,  // Increased padding for better fit
        bottom: 50, // Increased padding for better fit
        left: 50,   // Increased padding for better fit
        top: 50,    // Increased padding for better fit
      },
    });

  

  }
  const onDirectionReady = (result: any) => {
    if (_map.current) {
      setDirectionData(result);
      setDistance(result.legs[0]?.distance?.text);
      setDuration(result.legs[0]?.duration?.text);
      const steps = result.legs.flatMap((leg: any) => leg.steps.flatMap((step: any) => decodePolyline(step.polyline.points)));
      if (steps.length > 0) {
        setCoordinates(steps);
        const interpolatedPoints = interpolatePolyline(steps, 10); // Adjust 
        setInterpolatedRouteCoordinates(interpolatedPoints);
        if (rideDetails && rideDetails.length) {
          handleStartButtonClick()
        } else {
          // fitToCordinate(interpolatedPoints)
        }
        setIsMapFocusedOnMarker(true)
      }
      handleApiCall(result.legs[0]?.start_location, result.legs[0]?.end_location, result.legs[0]?.end_address, result)


    }
  };

  const handleApiCall = async (startLocation: any, endLocation: any, address: any, mapApiResponse: any) => {
    try {
      const response = await fetch('http://3.111.234.55:6002/api/map/map-line-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startLocation: `${startLocation?.lat},${startLocation?.lng}`,
          endLocation: `${endLocation?.lat},${startLocation?.lng}`,
          address,
          mapApiResponse,
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

    } catch (error) {
      console.error('Error calling API:', error);

    }
  };
  const placesPostData = async () => {
    const apiData = {
      userId: userDetails?.id,
      start: 1,
      eventId: data?._id
    }
    try {
      await requestRideHistoryApi(apiData)
        .then(async (res: any) => {
          
          if (res?.status == true) {
            setRideHistoryStartData(res?.payload)
          }
        })
    } catch (error) {
      console.log("Places api response  response: ", error);
    }
  }

  const getEventRideDetails = async () => {
    const apiData = { token: userToken, eventId: data?._id };
    try {
      await getEventRideData(apiData).then(async (res: any) => {
        
        if (res) {
          
          if (res.length > 0) {
            setScreenData(3)
            setRideDetails(res)
          } else {
            setScreenData(2)
          }
        }
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };
  const handleMapDrag = () => {
    setIsMapFocusedOnMarker(false)
  };
  useEffect(() => {
    if (isMapFocusedOnMarker == true) {
      handleStartButtonClick()
    }
  }, [currentLocation]);
  const handleStartButtonClick = () => {
    if (Platform.OS == 'android') {
      _map.current?.animateCamera({
        center: {
          latitude: currentLocation?.latitude, // Adjust the offset for keeping the location near the bottom
          longitude: currentLocation?.longitude,
        },
        heading: currentLocation?.heading,
        zoom: 18,
      }, { duration: 1000 });
    } else {
      _map.current?.animateCamera({
        center: {
          latitude: currentLocation?.latitude, // Adjust the offset for keeping the location near the bottom
          longitude: currentLocation?.longitude,
        },
        heading: currentLocation?.heading,
        zoom: 18,
      }, { duration: 1000 });
    }

  };

  const imageUploadOnRide = async (imageData: any) => {
    const apiData = {
      image: imageData,
      lat: currentLocation?.latitude,
      lng: currentLocation?.longitude,
      rideId: rideHistoryStartData?._id
    }
    try {
      await requstImageUploadInSoloRIde(apiData)
        .then(async (res: any) => {
          
          if (res?.status == true) {

          }
        })
    } catch (error) {
      console.log("Places api response  response: ", error);
    }
  }

  const takePhotoFromCamera = () => {

    setTimeout(() => {
      ImagePicker.openCamera({
        cropping: false
      }).then(image => {
        
        setPictureOnLastLng(oldPic => [...oldPic, {
          img: image,
          latitude: currentLocation[currentLocation.length - 1].latitude,
          longitude: currentLocation[currentLocation.length - 1].longitude,
        }])
        imageUploadOnRide(image?.path)
        setScreenData(3)
      });
    }, 500);
  }

  const handleApicall2 = async (status?: any) => {
   
    const waypointsStr = waypoints.map(point => `${point?.latitude},${point?.longitude}`).join('|');
    let url
    if (status == "arrive") {
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentArr[0]?.latitude},${currentArr[0]?.longitude}&destination=${destination?.latitude},${destination?.longitude}&waypoints=${waypointsStr}&key=${MAP_KEY}`;
    } else {
      url = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentArr[0]?.latitude},${currentArr[0]?.longitude}&destination=${currentArr[currentArr.length - 1]?.latitude},${currentArr[currentArr.length - 1]?.longitude}&waypoints=${waypointsStr}&key=${MAP_KEY}`;
    }
    

    const response = await fetch(url, {
    });
    const data = await response.json();
    if (data) {
      if (status == "arrive") {
        setTimeout(() => {
          mainApi(data)
        }, 2000);
      } else {
        mainApi(data)
      }
    }

  };
  const mainApi = async (resData: any) => {
    try {
      const response = await fetch('http://3.111.234.55:6002/api/map/bike-ride-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userDetails?.id,
          mapApiResponse: [],
          mapFinalResponse: resData,
          stop: 1,
          rideId: rideHistoryStartData?._id
        }),
      });
      
      const data = await response.json();
      
      navigation.goBack()

    } catch (error) {
      console.error('Error calling API:', error);
      navigation.goBack()

    }
  };
  const getInitials = (name: any) => {
    if (!name) {
      return "0"
    }
    const names = name.trim().split(' ');

    let initials = '';
    if (names.length > 0) {
      initials += names[0][0]; // First letter of the first name
    }
    if (names.length > 1) {
      initials += names[1][0]; // First letter of the last name (if exists)
    }

    return initials.toUpperCase();
  };
  return (
    <View style={styles.container}>
      <MapView
        onPanDrag={handleMapDrag}
        provider={PROVIDER_GOOGLE}
        style={{ height: "100%", width: "100%", flex: 1 }}
        ref={_map}
        followsUserLocation={isMapFocusedOnMarker}
        customMapStyle={mapStyle1}
        userInterfaceStyle="dark"
        initialRegion={initialPosition}
        pitchEnabled={false}
        showsIndoorLevelPicker
        showsIndoors
        rotateEnabled={true}
        showsPointsOfInterest
      >
        {
          currentArr.length > 0 && (
            <MapViewDirections
              origin={currentArr[0]}
              destination={destination}
              strokeWidth={0}
              optimizeWaypoints={true}
              directionsServiceBaseUrl="https://maps.googleapis.com/maps/api/directions/json?"
             
              apikey={MAP_KEY}
              waypoints={waypoints}
              onReady={onDirectionReady}
            />
          )
        }
        {
          destination && (
            <Marker coordinate={destination} />
          )
        }

        {
          allRiderLocationData.length > 0 && (
            <>
              {
                allRiderLocationData.map((latlng: any, index: number) => {
                  if (userDetails?.id == latlng?.user_id) {
                    return
                  }
                  return (
                    <Marker coordinate={{
                      latitude: latlng?.lat,
                      longitude: latlng?.lng
                    }} >
                      <View style={styles.markerPlayer}>
                        <View style={[styles.markerPlayerINNER, { backgroundColor: randomColorCode[2]?.colorCode }]}>
                          <AppText size={12} align='center' color='white' family='PoppinsRegular'>{getInitials(latlng?.user_name)}</AppText>
                        </View>
                      </View>
                    </Marker>
                  )
                })
              }
            </>
          )
        }

        {
          currentLocation && (
            <Marker coordinate={currentLocation} >
              <View style={{ height: 30, width: 30, borderRadius: 50, backgroundColor: 'rgba(3, 169, 252, 0.3)', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: COLORS.blue }}>
                </View>
              </View>

            </Marker>
          )
        }

        {coordinates.length > 0 && (
          <>
            <Polyline
              coordinates={coordinates}
              strokeColor="black" // Border color
              strokeWidth={12} // Border width (4 + 2 + 2)
            />

            <Polyline
              coordinates={coordinates}
              strokeColor={COLORS.green} // Center line color
              strokeWidth={4} // Center line width
            />

          </>
        )}
      </MapView>

      <View style={styles.topMapFunction}>
        <TouchableOpacity style={styles.locationIcon} onPress={() => navigation.goBack()}>
          <ArrowBAckIcon />
        </TouchableOpacity>
        {
          !isMapFocusedOnMarker && (

            <TouchableOpacity style={styles.locationIcon} onPress={() => {
              handleStartButtonClick()
              setIsMapFocusedOnMarker(true)
            }}>
              <BackToLocationIcon />
            </TouchableOpacity>
          )
        }
      </View>
      {
        !rideDetails && userDetails?.id == data?.owner_id && coordinates.length > 0 &&  (
          <TouchableOpacity style={styles.bottomStartButton} onPress={placesPostData}>
            <AppText color='white' size={18} family='PoppinsBold'>Start event</AppText>
          </TouchableOpacity>
        )
      }
      
      {
        rideDetails && rideDetails.length && (
          <>
            <BottomSheet
              ref={sheetRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={styles.bottomSheetContainer}
              handleComponent={screenData == 1 || screenData == 3 || screenData == 5 || screenData == 6 ? null : BottomSheetHandle}
              handleIndicatorStyle={styles.handleIndicator}
              onChange={handleSheetChange}
            >
              <View style={styles.contentContainer}>

                {

                  screenData == 2 ? (


                    <Directionpinpoints
                      setScreenData={setScreenData}
                      setAddressHeight={setAddressHeight}
                      directionData={directionData}
                      handleStartButtonClick={() => { setTwoD(!twoD), setIsMapFocusedOnMarker(true), handleStartButtonClick(), placesPostData() }}
                    />

                  ) : screenData == 3 ? (
                    <>
                      <StartRide distance={distance} duration={duration} directionData={directionData} setScreenData={setScreenData} setAddressHeight={setAddressHeight} userId={userDetails?.id} />
                    </>
                  ) : screenData == 4 ? (
                    <StopContainer
                      setScreenData={setScreenData}
                      setAddressHeight={setAddressHeight}
                      takePhotoFromCamera={takePhotoFromCamera}
                      handleApicall2={handleApicall2}
                      userId={userDetails?.id == data?.owner_id}
                    />
                  ) : screenData == 5 ? (
                    <AddReport setScreenData={setScreenData} data={reportData} setAddressHeight={setAddressHeight} />
                  ) : null
                }


              </View>
            </BottomSheet>
          </>
        )
      }
      {/* </View> */}
    </View>
  )
}

export default UserMap