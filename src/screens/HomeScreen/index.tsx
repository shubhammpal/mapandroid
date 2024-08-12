import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Modal,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, ms } from '../../style';
import AppText from '../../component/AppText/AppText';
import { AddSOSIcon, CrossRedIcon } from '../../assets/svgImg/SvgImg';
import SliderCorusel from '../../component/SliderCorusel/SliderCorusel';
import PostView from './PostView';
import CustomHeader from './Tabbar';
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { strings } from '../../utils/strings';
import TopRootsScreen from '../Tabbarscreens/TopRoots/TopRootsScreen';
import EventsScreen from '../Tabbarscreens/Events/EventsScreen';
import ClubScreen from '../Tabbarscreens/Club/Club';
import { AuthContext } from '../../component/auth/AuthContext';
import GetLocation from 'react-native-get-location';
import { PERMISSIONS, RESULTS, request, check } from 'react-native-permissions';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import Geocoder from 'react-native-geocoding';
import { MAP_KEY } from '../../services/api_helper';
import axios from 'axios';
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import { requestClubFetchWITHLINK, requestClubstatusCheck, requestGetClubList } from '../../services/api_Services';
import FastImage from 'react-native-fast-image';
import ImgView from '../../component/ImgView/ImgView';
import TopRoutes from '../Tabbarscreens/TopRoots/TopRoutes';

Geocoder.init(MAP_KEY, { language: "en" });
const Home = ({ navigation, route }: any) => {
  const { setDrawerPage }: any = useContext(AuthContext)
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const [screenData, setScreenData] = useState(0);
  const [clubData, setClubData] = useState<any>();
  const [clubId, setClubId] = useState<any>();
  const [joinClubWithLink, setJoinClubWithLink] = useState(false);
  const [headerData, setHeaderData] = useState(1);
  const [isHandled, setIsHandled] = useState(false);
  useEffect(() => {
    // ----------FOR DRAWER----------
    setDrawerPage(false)
  }, []);
  const {
    sliderStatus,
    setSliderstatus,
    sosStatus,
    setSosstatus,
    setLocation,
    userDetails,
    userToken
  }: any = useContext(AuthContext);
  const handleSheetChange = (index: any) => {
    if (index >= 0 && index < snapPoints.length) {
      
    } else {
      console.warn(
        `Invalid index: ${index}. Expected between 0 and ${snapPoints.length - 1
        }`,
      );
    }
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <CustomHeader
          scrollY={scrollY}
          navigation={navigation}
          setScreenData={setScreenData}
          setHeaderData={setHeaderData}
        />
      ),
    });
  }, [navigation, scrollY]);

  const handleOpenBottomSheet = () => {
    sheetRef.current?.expand();
  };

  const dismissKeyboard = () => {
    sheetRef.current?.close();
    setScreenData(0);
  };
  useEffect(() => {
    requestLocationPermission();
    // fetchProducts()
  }, []);

  const requestLocationPermission = async () => {
    try {
      const permissionType =
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

      const result = await request(permissionType);
      console.log(result, 'permissionType');
      const res = await check(permissionType);
      console.log('Permission status:', res);

      if (res === RESULTS.GRANTED || res === RESULTS.LIMITED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied or blocked');
      }
    } catch (error) {
      console.warn('Error requesting location permission:', error);
    }
  };
  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    }).then(location => {
      const { latitude, longitude } = location;
      Geocoder.from(latitude, longitude)
        .then(json => {
          const addressComponent = json.results[0].address_components.find(
            component => component.types.includes('locality'),
          );
          if (addressComponent) {
            setLocation(addressComponent.long_name);
          }
        })
        .catch(error => console.warn(error));
    });
  }, []);


  const fetchClubs = async (ClubId: any) => {
    const apiData = { userId: userDetails?.id, token: userToken, page: 1, clubId: ClubId };

    try {
      const res = await requestGetClubList(apiData);
      
      if (res?.status == true) {
        setClubData(res?.data[0])
      }

    } catch (error) {
      console.log('Club list response: ', error);
    }
  };
  const fetchClubAcceptReject = async (status: any) => {
   
    const resData = {
      clubId: clubData?.id,
      userId: userDetails?.id,
      isAccepted: status,
      token: userToken,
      "role": "member"
    }

    try {
      const res = await requestClubFetchWITHLINK(resData);
      
      if (res?.status == true) {
      
      }
      setJoinClubWithLink(false)

    } catch (error) {
      console.log('Club list response: ', error);
    }
  };
  const fetchClubStatus = async (data: any) => {
    const resData = {
      club_id: data,
      user_id: userDetails?.id,
      token: userToken
    }
    try {
      await requestClubstatusCheck(resData)
        .then(async (res: any) => {
          
          if (res?.status == true) {
            setJoinClubWithLink(true)
          }

        });
    } catch (error) {
      console.log('data: ', error);

    }
  };

  const dataDynamicData = (clubIdd) => {
    if (clubIdd) {
      fetchClubs(clubIdd)
      fetchClubStatus(clubIdd)
    }
  }

  const HandleDeepLinking = () => {
    const handleDynamicLinks = async (link: any) => {
      if (link && !isHandled) {
        setIsHandled(true);
        let productId = link?.url.split('=').pop();
        setClubId(productId)
        if (link?.url.includes("productId")) {
          // dataDynamicData(productId)
        }
      }
    };

    useEffect(() => {
      const unsubscribe = dynamicLinks().onLink(handleDynamicLinks);
      // Handle the dynamic link if the app is launched from a killed state
      dynamicLinks()
        .getInitialLink()
        .then((link) => {
          if (link) {
            handleDynamicLinks(link);
          }
        });

      return () => unsubscribe();
    }, [isHandled]);

    return null;
  };

  return (
    <BottomSheetModalProvider>
      <HandleDeepLinking />
      <TouchableWithoutFeedback
        onPress={dismissKeyboard}
        disabled={screenData == 1 ? false : true}>
        <View style={styles.mainHomeContainer}>
          <View style={[styles.linearContainer, { paddingTop: 35 }]}>

            <FlatList
              data={[1]}
              bounces={false}
              renderItem={(itemm: any, index: number) => {
                return (
                  <View style={styles.container}>
                    <LinearGradient
                      colors={[
                        COLORS.black,
                        COLORS.black131,
                        COLORS.black131,
                        COLORS.black131,
                      ]}
                      style={{ flex: 1 }}>
                      {sliderStatus == true && (
                        <>
                          <View style={styles.trendingText}>
                            <View>
                              {headerData === 1 && (
                                <>
                                  <AppText
                                    color="white"
                                    size={20}
                                    family={'PoppinsBold'}>
                                    {'Trending 🔥'}
                                  </AppText>
                                  <AppText
                                    color="white"
                                    size={14}
                                    family={'PoppinsRegular'}>
                                    {`Trending feed, events and news`}
                                  </AppText>
                                </>
                              )}
                              {headerData === 2 && (
                                <AppText
                                  color="white"
                                  size={20}
                                  family={'PoppinsBold'}>
                                  {'Trending Routes  🔥'}
                                </AppText>
                              )}
                              {headerData === 3 && (
                                <AppText
                                  color="white"
                                  size={20}
                                  family={'PoppinsBold'}>
                                  {'Top Community  🔥'}
                                </AppText>
                              )}
                              {headerData === 4 && (
                                <AppText
                                  color="white"
                                  size={20}
                                  family={'PoppinsBold'}>
                                  {'Top Rides  🔥'}
                                </AppText>
                              )}
                              {headerData === 5 && (
                                <AppText
                                  color="white"
                                  size={20}
                                  family={'PoppinsBold'}>
                                  {'Top Events  🔥'}
                                </AppText>
                              )}
                            </View>
                            <TouchableOpacity
                              onPress={() => setSliderstatus(false)}>
                              <CrossRedIcon />
                            </TouchableOpacity>
                          </View>
                          <View style={[styles.sliderView, {
                            marginTop: 0,
                            marginBottom: 0,
                          }]}>
                            <SliderCorusel sheetRef={sheetRef} />
                          </View>
                        </>
                      )}
                    </LinearGradient>
                    {headerData === 1 && (
                      <>
                        <PostView
                          navigation={navigation}
                          route={route}
                          setScreenDat={setScreenData}
                        />
                      </>
                    )}
                    {headerData === 2 && (
                      <TopRoutes navigation={navigation} />
                    )}
                    {headerData === 3 && (
                      <ClubScreen screen={'Home'} navigation={navigation} />
                    )}
                    {headerData === 4 && (
                      <EventsScreen navigation={navigation} screen={'Home'} />
                    )}
                  </View>
                );
              }}
            />
            {/* </Animated.ScrollView> */}
          </View>
          {sosStatus == true && (
            <Modal transparent visible={sosStatus}>
              <View style={[styles.sosmodalContent]}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    style={styles.closeButton2}
                    onPress={() => {
                      setSosstatus(false);
                    }}>
                    <CrossRedIcon />
                  </TouchableOpacity>
                  <AddSOSIcon />
                  <AppText
                    size={24}
                    family="PoppinsSemiB"
                    color={COLORS.white}
                    align="center">
                    Complete setup your emergency contacts
                  </AppText>

                  <View style={{ marginVertical: 20 }} />
                  <SubmitButton
                    title={'Add Now'}
                    pressing={() => navigation.navigate(strings.SOS_SCREEN)}
                    widthOf={'85%'}
                  />
                </View>
              </View>
            </Modal>
          )}
          {joinClubWithLink == true && (
            <Modal transparent visible={joinClubWithLink}>
              <View style={[styles.sosmodalContent]}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    style={styles.closeButton2}
                    onPress={() => {
                      setJoinClubWithLink(false);
                    }}>
                    <CrossRedIcon />
                  </TouchableOpacity>
                  <ImgView height={80} width={80} url={clubData?.club_logo} radius={50} />
                  <View style={{ height: 15 }} />
                  <AppText
                    size={24}
                    family="PoppinsSemiB"
                    color={COLORS.white}
                    numLines={2}
                    align="center">
                    {clubData?.name}
                  </AppText>

                  <View style={{ marginVertical: 5 }} />
                  <AppText color='white' size={18} family='PoppinsSemiB'>Do you want to join this club?</AppText>
                  <View style={{ marginVertical: 10 }} />
                  <View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
                    <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.red, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, }} onPress={() => fetchClubAcceptReject(false)}>
                      <AppText color='white' size={18} family='PoppinsMedium' >Reject</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }} onPress={() => fetchClubAcceptReject(true)}>
                      <AppText color='white' size={18} family='PoppinsMedium' >Accept</AppText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
          {screenData === 1 && (
            <BottomSheet
              ref={sheetRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={styles.bottomSheetContainer}
              handleIndicatorStyle={styles.handleIndicator}
              onChange={handleSheetChange}>
              <View style={styles.contentContainer}>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    navigation.navigate(strings.CREATE_POST);
                    dismissKeyboard();
                  }}>
                  <View style={styles.icons}>
                    <Image
                      source={require('../../assets/img/createpost.png')}
                      style={{ height: 25, width: 50 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <AppText
                      color={COLORS.white}
                      size={16}
                      family={'PoppinsBold'}
                      horizontal={15}>
                      Create a post
                    </AppText>
                    <AppText
                      color={COLORS.grey92}
                      size={12}
                      family={'PoppinsMedium'}
                      horizontal={15}>
                      Seize the moment, create memories
                    </AppText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    navigation.navigate(strings.CREATE_GROUP);
                    dismissKeyboard();
                  }}>
                  <View style={styles.icons}>
                    <Image
                      source={require('../../assets/img/creategroup.png')}
                      style={{ height: 25, width: 50 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View>
                    <AppText
                      color={COLORS.white}
                      size={16}
                      family={'PoppinsBold'}
                      horizontal={15}>
                      Create a group
                    </AppText>
                    <AppText
                      color={COLORS.grey92}
                      size={12}
                      family={'PoppinsMedium'}
                      horizontal={15}>
                      Create a private group.
                    </AppText>
                  </View>
                </TouchableOpacity>
              </View>
            </BottomSheet>
          )}
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModalProvider>
  );
};

export default Home;
