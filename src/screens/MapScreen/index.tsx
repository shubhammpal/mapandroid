import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Alert, Platform } from 'react-native';
// const MapboxGL = Platform.OS === 'ios' ? require('@react-native-mapbox-gl/maps') : null;
import MapboxGL from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import { ArrowBAckIcon, BackToLocationIcon, CongestionIcon, CrashIcon, DestinationLogo, GarageIcon, HospitalIcon, LaneClosureIcon, LocationIcon, NewGreenOriginIcon, ObjectRoadIcon, RestaurantIcon, RoadworkIcon, StalledVehicleIcon } from '../../assets/svgImg/SvgImg';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import BottomSheet, { BottomSheetHandle, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { styles } from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { height } from "../../style/typography";
import { COLORS } from '../../style';
import Textinput from '../../component/BottomSheetConatiner/Textinput';
import CategoryList from '../../component/BottomSheetConatiner/CategoryList';
import CategoryConatiner from '../../component/BottomSheetConatiner/CategoryConatiner';
import RecentSearch from '../../component/BottomSheetConatiner/RecentSearch';
import { favRoutesData, recentSearchdata } from '../../component/data/mapdata';
import FavoriteRoutes from '../../component/BottomSheetConatiner/FavoriteRoutes';
import Address from '../../component/BottomSheetConatiner/Address';
import { fetchDirections, requestGetDetails, requestRideHistoryApi, requstImageUploadInSoloRIde } from '../../services/api_Services';
import Directionpinpoints from '../../component/BottomSheetConatiner/Directionpinpoints';
import { MapBox } from './MapBox';
import StartRide from '../../component/BottomSheetConatiner/StartRide';
import StopContainer from '../../component/BottomSheetConatiner/StopContainer';
import { AuthContext } from '../../component/auth/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import RideCompleteBox from '../../component/RideCompleteBox/RideCompleteBox';
import axios from 'axios';
import GetLocation from 'react-native-get-location';


export const data = [
  { id: 1, image: <HospitalIcon />, title: 'Hospital' },
  { id: 2, image: <RestaurantIcon />, title: 'Restaurants' },
  { id: 3, image: <GarageIcon />, title: 'Garage' },
]

export const reportData = [
  { id: 1, image: <CrashIcon />, title: 'Crash' },
  { id: 2, image: <CongestionIcon />, title: 'Congestion' },
  { id: 3, image: <RoadworkIcon />, title: 'Roadworkds' },
  { id: 4, image: <LaneClosureIcon />, title: 'Lane Closure' },
  { id: 5, image: <StalledVehicleIcon />, title: 'Stalled Vehicle' },
  { id: 6, image: <ObjectRoadIcon />, title: 'Object on Road' },

]
MapboxGL.setAccessToken('sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg');

const MapScreen = ({ navigation }: any) => {
  if (Platform.OS == 'ios' || Platform.OS == 'android') {
    
    const [currentLocation, setCurrentLocation] = useState<any[] | null>(null);
    const [location, setLocation] = useState([0, 0]);
    const [snapPoint, setSnapPoint] = useState(0);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const sheetRef = useRef<BottomSheet>(null);
    const [screenData, setScreenData] = useState<any>(0);
    const [addressHeight, setAddressHeight] = useState(0);
    const [categoryDataList, setCategoryDataList] = useState();
    const [searchText, setSearchText] = useState<any>();
    const [address, setAddress] = useState('');
    const [getCurrentLocation, setGetCurrentLocation] = useState<any>(location);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [routeNotAvailable, setrouteNotAvailable] = useState<any>(false);
    const [route, setRoute] = useState<any>(null);
    const [endAddress, setEndAddress] = useState<any>();
    const [startAddress, setStartAddress] = useState();
    const [routeData, setRouteData] = useState<any>(null);
    const [distance, setDistance] = useState<any>(0);
    const [duration, setDuration] = useState<any>(0);
    const [avoidRoute, setAvoidRoute] = useState<any>(null);
    const [cameraKey, setCameraKey] = useState(0);
    const [directionRouteDetails, setDirectionRouteDetails] = useState<any>();
    const [traveledPath, setTraveledPath] = useState<any>([]);
    const [finalLoad, setFinalLoad] = useState<boolean>(false);
    const [rideHistoryStartData, setRideHistoryStartData] = useState<any>();
    const [rideUserData, setRideUserData] = useState<any>();
    const [imageAnnotations, setImageAnnotations] = useState<any[]>([]);
    const [destinationArrivedBox, setDestinationArrivedBox] = useState<any>(false);
    const { userToken, userDetails }: any = useContext(AuthContext);
    const ref = useRef();
    const cameraRef = useRef<MapboxGL.Camera>(null);
    const snapPoints = useMemo(
      () =>
        screenData == 0
          ? [
            height / 4,
            height / 7,
            height / 5,
            height / 3,
            height / 1.5,
            height / 1.2,
          ]
          : screenData == 2 ||
            screenData == 1 ||
            screenData == 4
            ? [addressHeight + 60]
            : screenData == 3 ? [addressHeight + 40] : screenData == 5 ? [height / 2] : [addressHeight + 100],
      [screenData, addressHeight],
    );
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


    const fetchAddress = async (cordin: any) => {
      const [longitude, latitude] = cordin;
      try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg`);
        const address = response.data.features[0]?.place_name;
        return address
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    useEffect(() => {
      GetUserDetails()
    }, [])

    useEffect(() => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          const { latitude, longitude } = location;
          setLocation([longitude, latitude]);
          setGetCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
    }, [])

    useEffect(() => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude, heading } = position.coords;
          setLocation([longitude, latitude]);
          setGetCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });

        },
        error => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }, []);

   

    const snapToRoad = async (coordinates: any) => {
      const MAX_COORDINATES_PER_REQUEST = 100;
      const batches = [];
      for (let i = 0; i < coordinates.length; i += MAX_COORDINATES_PER_REQUEST) {
        const batch = coordinates.slice(i, i + MAX_COORDINATES_PER_REQUEST);
        batches.push(batch);
      }

      const snappedCoordinates = [];
      for (const batch of batches) {
        const pathString = batch.map((coord: any) => coord.join(',')).join(';');
        const response = await fetch(`https://api.mapbox.com/matching/v5/mapbox/driving/${pathString}?access_token=sk.eyJ1IjoiaW5pdHgiLCJhIjoiY2x5cG15cDB2MDJiczJrcXY0NWlrNm9zNiJ9.m6hqEs850sg6Tt0FpERjPg&geometries=geojson`);
        const data = await response.json();
        if (data && data.matchings && data.matchings.length > 0) {
          snappedCoordinates.push(...data.matchings[0].geometry.coordinates);
        }
      }

      return snappedCoordinates;
    };

    const handleSubmitPress = async () => {
      setFinalLoad(true)
      const snappedPath = await snapToRoad(traveledPath);

      mainApi(traveledPath, "press")
    };

    const handleSubmit = async () => {
      setFinalLoad(true)
      const snappedPath = await snapToRoad(traveledPath);

      mainApi(traveledPath)
    };

    const handleFocus = () => {
      sheetRef.current?.snapToIndex(5);
    };
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
      getDirectionsXustom(currentLocation)
    }, [avoidRoute])

    async function checkBikeRestrictions(steps) {

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

    const getDirections = async (desti: any, address?: any) => {
      if (address) {
        setAddress(address);
      }
      if (desti) {
        const origin = [location[0], location[1]];
        const destination = [desti[0], desti[1]];
        const routeData = await fetchDirections(origin, destination, avoidRoute);

        const steps = routeData.legs[0].steps;

        const bikeStatus = await checkBikeRestrictions(steps)
        if (bikeStatus == true) {
          setAvoidRoute("motorway")

        } else {
          if (routeData) {
            setrouteNotAvailable(true)
            setRouteData(routeData);
            setRoute(routeData?.geometry)
            setDistance((routeData?.distance / 1000).toFixed(2)); // distance in km
            setDuration((routeData?.duration / 60).toFixed(2)); // duration in minutes
            handleFitBounds(desti)
          }

        }

      }
    };


    const getDirectionsXustom = async (desti: any, address?: any) => {
      if (address) {
        setAddress(address);
      }
      if (desti) {
        const origin = [location[0], location[1]];
        const destination = [desti[0], desti[1]];
        const routeData = await fetchDirections(origin, destination, avoidRoute);
        if (routeData) {
          setrouteNotAvailable(true)
          setRouteData(routeData);
          setRoute(routeData?.geometry)
          setDistance((routeData?.distance / 1000).toFixed(2)); // distance in km
          setDuration((routeData?.duration / 60).toFixed(2)); // duration in minutes
          handleFitBounds(desti)
        }
      }
    };

    useEffect(() => {
      if (screenData == 0) {
        setCurrentLocation(null)
        setCameraKey(prevKey => prevKey + 1);
        setRouteData(null)
        setRoute(null)
        setDistance(0)
        setDuration(0)
        setAvoidRoute(null)
      }

    }, [screenData == 0])

    const RouteSet = async () => {
      const startAdd = await fetchAddress(location)
      setStartAddress(startAdd)
      handleFitBounds()
      setScreenData(2)
    }

    const handleFitBounds = (desti?: any) => {
      if (cameraRef.current && location && (desti ? desti : currentLocation)) {
        cameraRef.current.fitBounds(
          location,
          desti ? desti : currentLocation,
          desti ? [100, 50, 350, 50] : [240, 50, 300, 50], // Padding: [top, right, bottom, left]
          1000 // Animation duration in milliseconds
        );
      }
    };

    const placesPostData = async () => {
      const apiData = {
        userId: userDetails?.id,
        start: 1
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

    const mainApi = async (resData: any, press?: any) => {
      const formatedistance = `${(directionRouteDetails?.distanceTraveled / 1000).toFixed(4)}`;
      const lastAdress = press ? await fetchAddress(traveledPath[traveledPath.length - 1]) : endAddress;

      try {
        const response = await fetch('http://3.111.234.55:6002/api/map/bike-ride-create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userDetails?.id,
            mapApiResponse: [],
            mapFinalResponse: JSON.stringify(resData),
            stop: 1,
            rideId: rideHistoryStartData?._id,
            rideKm: formatedistance,
            startAddress: startAddress,
            endAddress: press ? lastAdress : endAddress,
            ride_point: parseFloat(rideUserData?.settings?.individual_ride_point) * parseFloat(formatedistance)
          }),
        });
        const data = await response.json();
        console.log('API response data:', data);

        setFinalLoad(false)

        if (!press) {
          setScreenData(5)
        } else {
          setScreenData(0)
        }

      } catch (error) {
        console.error('Error calling API:', error);
        if (!press) {
          setScreenData(5)
        } else {
          setScreenData(0)
        }
        setFinalLoad(false)

      }

    };

    const GetUserDetails = async () => {
      let apiData
      apiData = { user_id: userDetails?.id, token: userToken };

      try {
        const res = await requestGetDetails(apiData);
        
        if (res?.data) {
          setRideUserData(res?.data)
        }
      } catch (error) {

        console.log('User details response: ', error);
      }
    };

    const handleImagePick = () => {
      setTimeout(() => {
        ImagePicker.openCamera({
          width: 300,
          height: 400,
          cropping: true,
        }).then(image => {

          imageUploadOnRide(image?.path)
          const newAnnotation = {
            coords: [traveledPath[traveledPath.length - 1][0], traveledPath[traveledPath.length - 1][1]], // Replace with the desired coordinates
            imagePath: image?.path,
          };
          setImageAnnotations([...imageAnnotations, newAnnotation]);
        }).catch(error => {
          console.log("Image pick error: ", error);
        });
      }, 500);
    }

    const imageUploadOnRide = async (imageData: any) => {
      const apiData = {
        image: imageData,
        lat: getCurrentLocation?.latitude,
        lng: getCurrentLocation?.longitude,
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
    return (
      <View style={[styles.page, (screenData == 3 || screenData == 4 || screenData == 6) ? {} : {
        justifyContent: 'flex-start',
        alignItems: 'center',
      }]}>

        <StatusBar barStyle={'light-content'} />
        
        <>

          {
            screenData == 3 || screenData == 4 || screenData == 6 ? (
              <MapBox setScreenData={setScreenData} origin={location} setDirectionRouteDetails={setDirectionRouteDetails} currentLocation={currentLocation} imageAnnotations={imageAnnotations} setDestinationArrivedBox={setDestinationArrivedBox} handleSubmit={handleSubmit} setTraveledPath={setTraveledPath} />
            ) : (
              <View style={[styles.containerMap, { height: screenData == 2 ? "60%" : "100%" }]}>

                <MapboxGL.MapView
                  style={styles.mapBox}
                >
                  {
                    location && (
                      <>
                        <MapboxGL.Camera
                          zoomLevel={14}
                          centerCoordinate={location}
                          key={cameraKey + 1}
                          ref={cameraRef}
                        />
                        <MapboxGL.PointAnnotation
                          id="userLocation"
                          coordinate={location}
                        >

                          <NewGreenOriginIcon />
                          {/* </View> */}
                        </MapboxGL.PointAnnotation>
                      </>
                    )
                  }
                  {
                    currentLocation && (
                      <>
                       
                        <MapboxGL.PointAnnotation
                          id="userLocation"
                          coordinate={currentLocation}
                        >

                          <DestinationLogo />
                          {/* </View> */}
                        </MapboxGL.PointAnnotation>
                      </>
                    )
                  }
                  {route && (
                    <>
                      <MapboxGL.ShapeSource id="routeBorderSource" shape={route}>
                        <MapboxGL.LineLayer
                          id="routeBorder"
                          style={{
                            lineColor: COLORS.black,
                            lineWidth: 6, // The width includes the border width + line width
                            lineOpacity: 1,
                          }}
                        />
                      </MapboxGL.ShapeSource>
                      <MapboxGL.ShapeSource id="routeSource" shape={route}>
                        <MapboxGL.LineLayer id="routeFill" style={{
                          lineColor: COLORS.blue,
                          lineWidth: 4, // The actual line width
                          lineOpacity: 1,
                        }} />
                      </MapboxGL.ShapeSource>
                    </>
                  )}
                  
                  <View style={styles.drawerTopView}>
                    <TouchableOpacity style={[styles.drawer, { alignSelf: 'flex-start', }]} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.locationIcon, { alignSelf: 'flex-start', }]} onPress={() => { setCameraKey(prevKey => prevKey + 1) }}>
                      <BackToLocationIcon />
                    </TouchableOpacity>
                  </View>
                </MapboxGL.MapView>

              </View>
            )
          }

          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: screenData == 3 || screenData == 4 ? COLORS.whiteOFF : COLORS.black }}
            handleComponent={screenData == 1 || screenData == 3 || screenData == 5 || screenData == 6 ? null : BottomSheetHandle}
            handleIndicatorStyle={styles.handleIndicator}
            onChange={handleSheetChange}
          >
            <View style={[styles.contentContainer, { backgroundColor: screenData == 3 || screenData == 4 ? COLORS.whiteOFF : COLORS.black, }, (screenData == 3) && { borderTopWidth: 2, borderTopColor: COLORS.whiteEB }]}>

              {
                screenData == 0 ? (
                  <BottomSheetScrollView contentContainerStyle={{}} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag' >
                    <View style={{
                      backgroundColor: '#212121',
                      borderWidth: 1,
                      borderRadius: 12,
                      marginVertical: 20,
                      borderColor: COLORS.offblack43,
                    }}>
                      <Textinput setScreenData={setScreenData} setCurrentLocation={setCurrentLocation} categoryDataList={categoryDataList} setCategoryDataList={setCategoryDataList}
                        getDirections={getDirections} setSearchText={setSearchText} handleFocus={handleFocus}
                        destination={getCurrentLocation} searchText={searchText} ref={ref} setEndAddress={setEndAddress} />
                    </View>
                    {
                      categoryDataList ?
                        <CategoryList setScreenData={setScreenData} setCurrentLocation={setCurrentLocation} getDirections={getDirections} categoryDataList={categoryDataList} latitude={getCurrentLocation?.latitude} setEndAddress={setEndAddress}
                          longitude={getCurrentLocation?.longitude} setCategoryDataList={setCategoryDataList} setSearchText={setSearchText} />
                        : (

                          <>

                            <CategoryConatiner data={data} handleFocus={handleFocus} setScreenData={setScreenData} setCategoryDataList={setCategoryDataList} />

                            <RecentSearch
                              recentData={recentSearchdata}
                              handleFocus={handleFocus}
                              pressing={(data: any) => {

                                let details: any = data;

                                if (
                                  details &&
                                  details.geometry &&
                                  details.geometry.location
                                ) {
                                  const { lat, lng } = details.geometry.location;
                                  setScreenData(1);
                                  setCurrentLocation([lng, lat]);
                                  getDirections([lng, lat], details?.formatted_address);
                                  setEndAddress(details?.formatted_address)
                                } else {
                                  console.warn('No location details available');
                                }
                              }}
                            />
                           
                          </>
                        )
                    }
                  </BottomSheetScrollView>
                ) : screenData == 1 ? (
                  <Address
                    address={address}
                    distance={distance}
                    setScreenData={setScreenData}
                    setAddressHeight={setAddressHeight}
                    routeNotAvailable={routeNotAvailable}
                    setrouteNotAvailable={setrouteNotAvailable}
                    RouteSet={RouteSet}
                  />
                ) :
                  screenData == 2 ? (
                    <Directionpinpoints
                      setScreenData={setScreenData}
                      setAddressHeight={setAddressHeight}
                      directionData={routeData}
                      setAvoidRoute={setAvoidRoute}
                      startAddress={startAddress}
                      endAddress={endAddress}
                      handleStartButtonClick={() => { placesPostData() }}
                    />
                  ) : screenData == 3 ? (
                    <StartRide directionRouteDetails={directionRouteDetails} distance={distance} duration={duration} directionData={routeData} setScreenData={setScreenData} setAddressHeight={setAddressHeight} />
                  ) : screenData == 4 ? (
                    <StopContainer
                      setScreenData={setScreenData}
                      setAddressHeight={setAddressHeight}
                      finalLoad={finalLoad}
                      takePhotoFromCamera={handleImagePick}
                      handleApicall2={() => { handleSubmitPress() }}
                    />
                  ) : screenData == 5 ? (
                    <RideCompleteBox setDestinationArrivedBox={setDestinationArrivedBox} setScreenData={setScreenData} point={parseFloat(rideUserData?.settings?.individual_ride_point) * parseFloat(`${(directionRouteDetails?.distanceTraveled / 1000).toFixed(4)}`)} />
                  ) : null
              }
            </View>
          </BottomSheet>
        </>
       


      </View>
    );
  } else {
    <View>
      <Text>dhdjdjjdjdj</Text>
    </View>
  }

};


export default MapScreen;
