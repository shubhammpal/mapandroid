import * as React from "react";
import { Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapboxNavigation from "@homee/react-native-mapbox-navigation";
import { getEventRideData, requestGetDetails, requstImageUploadInSoloRIde } from "../../services/api_Services";
import { AuthContext } from "../../component/auth/AuthContext";
import AddLocation from "../CreatePost/AddLocation";
import { COLORS, ms } from "../../style";
import socketServcies from '../../services/socket_Services'
import Geolocation from "@react-native-community/geolocation";
import GetLocation from "react-native-get-location";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import BottomSheet, { BottomSheetHandle, BottomSheetModalProvider, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { styles } from "./styles";
import AppText from "../../component/AppText/AppText";
import { strings } from "../../utils/strings";
import StopContainer from "../../component/BottomSheetConatiner/StopContainer";
import ImagePicker from 'react-native-image-crop-picker';
import axios from "axios";
import RideCompleteBox from "../../component/RideCompleteBox/RideCompleteBox";
import { fonts } from "../../utils/misc";
import SubmitButton from "../../component/ButtonCotainer/SubmitButton";


export const GroupRide = ({ navigation, route }: any) => {
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const data = route?.params
  const { userDetails, userToken }: any = React.useContext(AuthContext);
  const [imageAnnotations, setImageAnnotations] = React.useState<any[]>([])
  const [rideDetails, setRideDetails] = React.useState<any>()
  const [userAnnotaion, setUserAnnotaion] = React.useState<any>([])
  const [currentLocation, setCurrentLocation] = React.useState<any[] | null>(null);
  const [location, setLocation] = React.useState<any>();
  const sheetRef = React.useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['30%'], []);
  const [screenData, setScreenData] = React.useState(0);
  const [getCurrentLocation, setGetCurrentLocation] = React.useState<any>(location);
  const origin: any = [route?.params?.fromLocation?.longitude, route?.params?.fromLocation?.latitude]
  const destination: any = [route?.params?.toLocation?.longitude, route?.params?.toLocation?.latitude]
  const [addressHeight, setAddressHeight] = React.useState(0);
  const [finalLoad, setFinalLoad] = React.useState(false);
  const [traveledPath, setTraveledPath] = React.useState<any>([]);
  const [directionRouteDetails, setDirectionRouteDetails] = React.useState<any>();
  const [rideUserData, setRideUserData] = React.useState<any>();

  const handleSubmitPress = async () => {
    setFinalLoad(true)
    if (data?.owner_id == userDetails?.id) {
      mainApi(traveledPath, "press")
    } else {
      navigation.goBack()
    }
    // setTraveledPath(snappedPath);
  };

  const handleSubmit = async () => {
    setFinalLoad(true)
    if (data?.owner_id == userDetails?.id) {
      mainApi(traveledPath)
    } else {
      navigation.goBack()
    }
    // setTraveledPath(snappedPath);
  };
  React.useEffect(() => {
    getEventRideDetailsStartCheck()
    // GetUserDetails()
  }, [])



  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    socketServcies.initializeSocket()
  }, [socketServcies])

  const getEventRideDetailsStartCheck = async () => {
    const apiData = { token: userToken, eventId: data?._id };
    try {
      await getEventRideData(apiData).then(async (res: any) => {

        if (res) {
          if (res.length > 0) {
            setRideDetails(res)
          }
        }
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };

  React.useEffect(() => {
    socketServcies.on('event_details', (msg) => {
     
      if (msg?.status == true) {
        const filteredData = msg?.payload.filter((item: any) => item?.user_id != userDetails?.id);
        // setAllRiderLocationData(msg?.payload)
        setUserAnnotaion(filteredData)
      }
    })
  }, [socketServcies])

  const handleSheetChange = (index: any) => {
    if (index >= 0 && index < snapPoints.length) {
      
    } else {
      console.warn(
        `Invalid index: ${index}. Expected between 0 and ${snapPoints.length - 1
        }`,
      );
    }
  };

  const handleImagePick = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {

        const newAnnotation = {
          coords: [traveledPath[traveledPath.length - 1][0], traveledPath[traveledPath.length - 1][1]], // Replace with the desired coordinates
          imagePath: image?.path,
        };
        
        setImageAnnotations([...imageAnnotations, newAnnotation]);
        imageUploadOnRide(image?.path, traveledPath[traveledPath.length - 1][1], traveledPath[traveledPath.length - 1][0])
      }).catch(error => {
        console.log("Image pick error: ", error);
      });
    }, 500);
  }

  const mainApi = async (resData: any, press?: any) => {
    const formatedistance = `${(directionRouteDetails?.distanceTraveled / 1000).toFixed(4)}`;
    const lastAdress = press ? await fetchAddress(traveledPath[traveledPath.length - 1]) : route?.params?.toLocation?.name;

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
          rideId: rideDetails[0]?._id,
          rideKm: formatedistance,
          startAddress: route?.params?.fromLocation?.name,
          endAddress: press ? lastAdress : route?.params?.toLocation?.name,
          ride_point: 4 * parseFloat(formatedistance)
        }),
      });
      const data = await response.json();
      console.log('API response data:');

      setFinalLoad(false)

      if (!press) {
        actionSheetRef.current?.show();
      } else {

        navigation.goBack()
      }

    } catch (error) {
      console.error('Error calling API:', error);
      if (!press) {
        actionSheetRef.current?.show();
      } else {
        navigation.goBack()
      }
      setFinalLoad(false)

    }

  };

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

  const imageUploadOnRide = async (imageData: any, lat: any, lng: any) => {
    const apiData = {
      image: imageData,
      lat: lat,
      lng: lng,
      rideId: rideDetails[0]?._id
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
  const [pointStack, setPointStack] = React.useState(0)
  let dataPoint = 0
  return (
    <BottomSheetModalProvider>
      <View style={styles.mapGroupContainer}>
        <StatusBar barStyle={'dark-content'} />
        {
          location ? (

            <MapboxNavigation
              origin={location}
              destination={destination}
              imageAnnotations={imageAnnotations}
              userPositions={userAnnotaion}
              // shouldSimulateRoute={true}
              // showsEndOfRouteFeedback
              hideStatusView
              onLocationChange={(event) => {
                const { latitude, longitude }: any = event.nativeEvent;


                if (pointStack > 8) {
                  // console.log(latitude, longitude, 'iiiiiii')
                  const dataSocket = [{ user_id: userDetails?.id, event_id: data?._id, lat: latitude, lng: longitude, ride_id: rideDetails[0]?._id, user_name: userDetails?.full_name }]
                  
                  socketServcies.emit('save_events', dataSocket)
                  setPointStack(0)
                } else {
                  
                  setPointStack(pointStack + 1)
                }
                setTraveledPath((prevPath: any) => [...prevPath, [longitude, latitude]]);
              }}
              onRouteProgressChange={(event) => {
                const {
                  distanceTraveled,
                  durationRemaining,
                  fractionTraveled,
                  distanceRemaining,
                }: any = event.nativeEvent;
                // console.log(event.nativeEvent)

                setDirectionRouteDetails(event?.nativeEvent)

              }}
              onError={(event) => {
                const { message }: any = event.nativeEvent;
              }}
              onCancelNavigation={() => {
                
                
                setScreenData(1)
                // User tapped the "X" cancel button in the nav UI
                // or canceled via the OS system tray on android.
                // Do whatever you need to here.
              }}
              onArrive={() => {

                handleSubmit()

                // Called when you arrive at the destination.
              }}
            />
          ) : (
            <></>
          )
        }
       
        {screenData === 1 && (
          <BottomSheet
            ref={sheetRef}
            index={0}
            style={{ paddingHorizontal: 15 }}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: COLORS.whiteOFF }}
            handleIndicatorStyle={styles.handleIndicator}
            onChange={handleSheetChange}>
            <StopContainer
              setScreenData={setScreenData}
              setAddressHeight={setAddressHeight}
              finalLoad={finalLoad}
              takePhotoFromCamera={handleImagePick}
              groupRide={'group'}
              handleApicall2={() => { handleSubmitPress() }}
            />
          </BottomSheet>
        )}
        <ActionSheet ref={actionSheetRef} containerStyle={{ height: "45%", }}>
          <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }}>
            <View style={{ backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
              <View style={{
                width: "90%", backgroundColor: COLORS.white, paddingHorizontal: ms(0),
                borderRadius: 21, justifyContent: 'center', alignItems: 'center',
              }}>
                <Image source={require('../../assets/img/bikeimage.png')} style={{
                  width: 100,
                  height: 100,
                  tintColor: 'black'
                }} resizeMode={'contain'} />
                <View style={{ borderWidth: 2, borderColor: COLORS.black, width: 150 }} />
                <View style={{ height: 20 }} />

                <Text style={{ fontSize: 15, color: COLORS.black, fontFamily: fonts.PoppinsBold }}>Earned point-  <Text style={{ fontSize: 15, color: COLORS.blue, fontFamily: fonts.PoppinsBold }}>{4 * parseFloat((directionRouteDetails?.distanceTraveled / 1000).toFixed(4))}</Text> </Text>
                <View style={{ height: 20 }} />
                <Text style={{ fontSize: 20, color: COLORS.black, fontFamily: fonts.PoppinsBold }}>Ride complete</Text>
                <View style={{ height: 10 }} />
                <Text style={{ fontSize: 15, color: COLORS.black, fontFamily: fonts.PoppinsSemiB, textAlign: 'center' }}>
                  You've arrived. Time to kick back and relax!</Text>
                <View style={{ height: 20 }} />
                <SubmitButton title={'Go Back'} pressing={() => { navigation.goBack(), actionSheetRef.current?.hide() }} widthOf={'50%'} />
                <View style={{ height: 40 }} />
              </View>
            </View>
          </View>
        </ActionSheet>
      </View>
    </BottomSheetModalProvider>
  );
};



