import React, { useContext, useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { strings } from '../../utils/strings';
import Login from '../../screens/Login';
import BikeModalScreen from '../../screens/BikeModel';
import InnerBikeModalScreen from '../../screens/BikeModel/Innerbikemodel';
import MapScreen from '../../screens/MapScreen';
import OTPScreen from '../../screens/Login/VerifyOtp';
import BottomTab from './BottomTab';
import CreatePost from '../../screens/CreatePost';
import CreateGroup from '../../screens/CreateGroup';
import Description from '../../screens/CreateGroup/Description';
import CoverImage from '../../screens/CreateGroup/CoverImage';
import ClubDetails from '../../screens/Tabbarscreens/Club/ClubDetails';
import { AuthContext } from '../auth/AuthContext';
import Registration from '../../screens/Registration';
import InviteFriendsScreen from '../../screens/CreateGroup/InviteFriend';
import CreateEvent from '../../screens/Tabbarscreens/Events/CreateEvent';
import EventPage from '../../screens/Tabbarscreens/Events/EventPage';
import UpdateEvent from '../../screens/Tabbarscreens/Events/UpdateEvent';
import ChatScreen from '../../screens/ChatScreen/ChatScreen';
import AddEventMembersScreen from '../../screens/Tabbarscreens/Members/AddEventMembers';
import { fonts } from '../../utils/misc';
import { COLORS, ms } from '../../style';
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowBAckIcon, CrossRedIcon } from '../../assets/svgImg/SvgImg';
import MapPath from '../../screens/MapScreen/MapPath';
import FollowerList from '../../screens/ProfileScreen/FollowerList';
import GroupDetails from '../../screens/Tabbarscreens/Group/GroupDetails';
import UpdateProfile from '../../screens/ProfileScreen/UpdateProfile';
import SettingScreen from '../../screens/SettingScreens';
import UserMapScreen from '../../screens/MapScreen/UserMap';
import Clubonboarding from '../../screens/SettingScreens/Clubonboarding';
import SOSScreen from '../../screens/SOSScreen';
import UpdateMobile from '../../screens/SettingScreens/UpdateMobile';
import FeedbackScreen from '../../screens/SettingScreens/Feedback';
import HelpScreen from '../../screens/SettingScreens/Feedback/Help';
import PrivacyPolicyScreens from '../../screens/PrivacyPolicy';
import AboutusScreen from '../../screens/PrivacyPolicy/AboutusScreen';
import PrivacyPolicy from '../../screens/PrivacyPolicy/PrivacyPolicy';
import TermsConditions from '../../screens/PrivacyPolicy/Terms&Conditions';
import ReturnPolicy from '../../screens/PrivacyPolicy/ReturnPolicy';
import BikerideScreen from '../../screens/BikerideScreen';
import BlockView from '../../screens/HomeScreen/PostScreen/BlockView';
import { enableScreens } from 'react-native-screens';
import CartScreen from '../../screens/Market/Cart/cart';
import CheckoutScreen from '../../screens/Market/Checkout/Checkout';
import FavouritesScreen from '../../screens/Market/Favourites/Favourites';
import NotificationScreen from '../../screens/Market/Notification/Notification';
import OrdersScreen from '../../screens/Market/Orders/Orders';
import OrderCompeleted from '../../screens/Market/Orders/OrderCompleted';
import TrackOrder from '../../screens/Market/Orders/TrackOrder';
import RequestOrderCancel from '../../screens/Market/Orders/RequestOrderCancel';
import ReviewProduct from '../../screens/Market/Orders/ReviewProduct';
import TopRootsScreen from '../../screens/Tabbarscreens/TopRoots/TopRootsScreen';
import { MapBox } from '../../screens/MapScreen/MapBox';
import BikeUpdateScreen from '../../screens/BikeModel/BikeUpdateScreen';
import InnerBikeUpdate from '../../screens/BikeModel/InnerBikeUpdate';
import TopTabScreen from '../../screens/ProfileScreen/TopTabScreen';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import AppText from '../AppText/AppText';
import ImgView from '../ImgView/ImgView';
import { shadowStyle } from '../../style/typography';
import { requestAddMembertoGroup, requestClubFetchWITHLINK, requestClubstatusCheck, requestEventUserRegister, requestGetClubList, requestGetgroupdetails, requestRideDetails } from '../../services/api_Services';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import emitter from '../Emitter/emitter';
import PostView from '../../screens/HomeScreen/PostView';
import { useNavigation } from '@react-navigation/native';
import ViewRideMap from '../../screens/MapScreen/ViewRideMap';
import Attendance from '../../screens/Tabbarscreens/Events/Attendance';
import DetailScreen from '../../screens/Market/Detail/Detail_screen';
import ImageDetails from '../../screens/HomeScreen/ImageDetails';
import NotificationList from '../../screens/HomeScreen/NotificationList';
import ClubInvite from '../../screens/CreateGroup/ClubInvite';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import AddLocation from '../../screens/CreatePost/AddLocation';
import TagRiders from '../../screens/CreatePost/TagRiders';
import TopRouteDetails from '../../screens/Tabbarscreens/TopRoots/TopRouteDetails';
import { GroupRide } from '../../screens/MapScreen/GroupRide';
import UpdatePost from '../../screens/CreatePost/UpdatePost';
import BlockedFriends from '../../screens/SettingScreens/BlockedFriends/BlockedFriends';


enableScreens(false);

const Stack = createSharedElementStackNavigator();
// const Stack = createNativeStackNavigator();

const AuthStack = () => {

  const [isHandled, setIsHandled] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const actionSheetRefClubJoin = useRef<ActionSheetRef>(null);
  const actionSheetRefGroup = useRef<ActionSheetRef>(null);
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [clubData, setClubData] = useState<any>();
  const [deeplinkModalOpenData, setDeepLinkModalOpenData] = useState<any>();
  const [getGroupDetails, setGetGroupDetails] = useState<any>();
  const navigation = useNavigation()
  const EventUserRegister = async () => {
    const userIds = [userDetails?.id];
    const apiData = { id: deeplinkModalOpenData?._id, token: userToken, userId: userIds };
    try {
      await requestEventUserRegister(apiData).then(async (res: any) => {
        
        actionSheetRef.current?.hide()
      });
    } catch (error) {
      console.log('Event user register response: ', error);
    }
  };

  const dataDynamicData = (clubIdd: any) => {
    if (clubIdd) {
      fetchClubs(clubIdd)
      fetchClubStatus(clubIdd)
    }
  }

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
            actionSheetRefClubJoin.current?.show()
            // setJoinClubWithLink(true)
          }

        });
    } catch (error) {
      console.log('data: ', error);

    }
  };

  const handleDynamicLinks = async (link: any) => {
    if (link) {
      console.log('Link received:', link);
      if (link?.url && link?.url.includes("rideMemberAdd")) {
        let rideId = link?.url.split('=').pop();
        
        await GetEventList(rideId);
      }
      if (link?.url.includes("productId")) {
        let productId = link?.url.split('=').pop();
        dataDynamicData(productId)
      }
      if (link?.url.includes("groupId")) {
        let grouId = link?.url.split('=').pop();
        Getgroupdetails(grouId)
      }
      if (link?.url.includes("postId")) {
        let postId = link?.url.split('=').pop();
        setTimeout(() => {
          navigation.navigate('PostDetails', { postId: postId })
        }, 2000);
      }
      setIsHandled(false); // Reset isHandled after processing the link
    }
  };

  const GroupJoin = async () => {
    const members = [{
      user_id: userDetails?.id,
      role: 'member',
    }];
    const apiData = {
      group_id: getGroupDetails?.id,
      members: members,
      action: 'add',
    };
    try {
      await requestAddMembertoGroup(apiData, userToken).then(
        async (res: any) => {
         
          if (res?.status == true) {


          }
          actionSheetRefGroup.current?.hide()
        },
      );
    } catch (error) {
      console.log('Create group response: ', error);
    }
  }
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

    return () => {
      unsubscribe();
    };
  }, []);


  const Getgroupdetails = async (groupId: any) => {
    const apiData = { groupId: groupId, token: userToken };
    try {
      await requestGetgroupdetails(apiData).then(async (res: any) => {
        
        if (res?.status == true) {
          actionSheetRefGroup.current?.show()
          setGetGroupDetails(res?.payload);
        }
      });
    } catch (error) {
      console.log('Details response: ', error);
    }
  };
  const GetEventList = async (rideId: any) => {
    const apiData = { rideId: rideId };
    
    try {
      await requestRideDetails(apiData).then(async (res: any) => {
        actionSheetRef.current?.show();
        
        if (res?.success == true) {
          setDeepLinkModalOpenData(res?.data[0])
          // setEventlistData(res?.data);
        }
      });
    } catch (error) {
      console.log('Event list response: ', error);
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
      actionSheetRefClubJoin.current?.hide()

    } catch (error) {
      console.log('Club list response: ', error);
    }
  };
  return (
    <>
      <ActionSheet ref={actionSheetRef} containerStyle={{ position: "absolute", backgroundColor: COLORS.white, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} >
        <View style={[styles.sosmodalContent]}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.closeButton2}
              onPress={() => {
                actionSheetRef.current?.hide();
              }}>
              <CrossRedIcon />
            </TouchableOpacity>
            <View style={[{ borderWidth: 1, height: 80, width: 80, borderRadius: 50 }, shadowStyle]}>
              <ImgView height={80} width={80} url={deeplinkModalOpenData?.files[0]?.url ? deeplinkModalOpenData?.files[0]?.url : require('../../assets/img/profile.png')} radius={50} dummy={deeplinkModalOpenData?.files[0]?.url ? false : true} />
            </View>
            <View style={{ height: 15 }} />
            <AppText
              size={24}
              family="PoppinsSemiB"
              color={COLORS.black}
              numLines={2}
              align="center">
              {deeplinkModalOpenData?.title}
            </AppText>

            <View style={{ marginVertical: 5 }} />
            <AppText color='black' size={18} family='PoppinsSemiB'>Do you want to join this ride?</AppText>
            <View style={{ marginVertical: 10 }} />
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
              <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.red, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, }} onPress={() => { actionSheetRef.current?.hide() }}>
                <AppText color='white' size={18} family='PoppinsMedium' >Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }} onPress={() => { EventUserRegister() }}>
                <AppText color='white' size={18} family='PoppinsMedium' >Accept</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetRefGroup} containerStyle={{ position: "absolute", backgroundColor: COLORS.white, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} >
        <View style={[styles.sosmodalContent]}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.closeButton2}
              onPress={() => {
                actionSheetRefGroup.current?.hide();
              }}>
              <CrossRedIcon />
            </TouchableOpacity>
            <View style={[{ borderWidth: 1, height: 80, width: 80, borderRadius: 50 }, shadowStyle]}>
              <ImgView height={80} width={80} url={getGroupDetails?.image ? getGroupDetails?.image : require('../../assets/img/profile.png')} radius={50} dummy={getGroupDetails?.image ? false : true} />
            </View>
            <View style={{ height: 15 }} />
            <AppText
              size={24}
              family="PoppinsSemiB"
              color={COLORS.black}
              numLines={2}
              align="center">
              {getGroupDetails?.name}
            </AppText>

            <View style={{ marginVertical: 5 }} />
            <AppText color='black' size={18} family='PoppinsSemiB'>Do you want to join this group?</AppText>
            <View style={{ marginVertical: 10 }} />
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 10 }}>
              <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.red, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, }} onPress={() => { actionSheetRefGroup.current?.hide() }}>
                <AppText color='white' size={18} family='PoppinsMedium' >Cancel</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: "33%", backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }} onPress={() => { GroupJoin() }}>
                <AppText color='white' size={18} family='PoppinsMedium' >Accept</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetRefClubJoin} containerStyle={{ position: "absolute", backgroundColor: COLORS.white, borderTopLeftRadius: 10, borderTopRightRadius: 10 }} >
        <View style={[styles.sosmodalContent]}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.closeButton2}
              onPress={() => {
                actionSheetRefClubJoin.current?.hide()
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
      </ActionSheet>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          detachPreviousScreen: false
        }}

        initialRouteName={strings.SPLASH}>

        {userToken && !userDetails?.full_name ? (
          <>
            <Stack.Screen name={strings.REGISTRATION} component={Registration}
              options={{
                headerShown: Platform.OS == 'ios' ? true : false,
               
                title: "Complete Profile",
                
                headerTitleStyle: {
                  fontFamily: fonts.PoppinsBold,
                  fontSize: 15,
                  color: COLORS.white
                },
                headerStyle: {
                  backgroundColor: COLORS.black,
                },
                headerShadowVisible: false
              }} />
            <Stack.Screen name={strings.BIKE_MODAL} component={BikeModalScreen} />
            <Stack.Screen
              name={strings.INNER_BIKE_MODAL}
              component={InnerBikeModalScreen}
            />
          </>
        ) : (
          <>
            {!userToken && !userDetails?.full_name ? (
              <>
                <Stack.Screen name={strings.LOGIN} component={Login} />
                <Stack.Screen name={strings.OTP} component={OTPScreen} />
                <Stack.Screen
                  name={strings.TERMS_CONDITION}
                  component={TermsConditions}
                />
              </>
            ) : (
              <>
                <Stack.Screen name={strings.BOTTOM_TAB} component={BottomTab} />
                <Stack.Screen name={strings.CREATE_POST} component={CreatePost} />
                <Stack.Screen name={'Profile'} component={TopTabScreen} />
                <Stack.Screen name={'FollowerList'} component={FollowerList} />

                <Stack.Screen
                  name={strings.CREATE_GROUP}
                  component={CreateGroup}
                />
                <Stack.Screen name={'Description'} component={Description} />
                <Stack.Screen name={'CoverImage'} component={CoverImage} />
                <Stack.Screen
                  name={strings.CLUB_DETAILS}
                  component={ClubDetails}
                />
                <Stack.Screen
                  name={strings.GROUP_DETAILS}
                  component={GroupDetails}
                />
                <Stack.Screen name={strings.UPDATE_PRO} component={UpdateProfile}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : false,
                    headerLargeTitle: true,
                    title: "Update Profile",
                    headerLargeTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 15,
                      color: COLORS.white
                    },
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,
                    headerStyle: {
                      backgroundColor: COLORS.black,
                    },
                    headerShadowVisible: false
                  })} />
                <Stack.Screen name={strings.MAP} component={MapScreen} />
                <Stack.Screen
                  name={strings.INVITE_FRIENDS}
                  component={InviteFriendsScreen}
                />

                <Stack.Screen
                  name={"ClubInvite"}
                  component={ClubInvite}
                />
                <Stack.Screen name={strings.AddLocation} component={AddLocation} />
                <Stack.Screen name={strings.TagRiders} component={TagRiders} />
                <Stack.Screen name={'TopRootsScreen'} component={TopRootsScreen}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: false,
                    title: "Ride History",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,
                    
                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.black,

                    },
                    headerShadowVisible: false
                  })} />
                <Stack.Screen name={'MapPath'} component={MapPath}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: false,
                    title: "My cover route",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,

                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.black,

                    },
                  })} />
                <Stack.Screen
                  name={strings.CREATE_EVENT}
                  component={CreateEvent}
                />
                <Stack.Screen
                  name={'MapBox'}
                  component={MapBox}
                />
                <Stack.Screen
                  name={'ViewRideMap'}
                  component={ViewRideMap}
                  options={({ navigation }) => ({
                    presentation: 'modal',
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: false,
                    title: "View full map",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,

                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.grey54,

                    },
                  })}
                />
                <Stack.Screen
                  name={strings.PRIVACY_POLICY_SCREENS}
                  component={PrivacyPolicyScreens}
                />

                <Stack.Screen
                  name={strings.BIKE_RIDE}
                  component={BikerideScreen}
                />
                <Stack.Screen
                  name={strings.ABOUT_US}
                  component={AboutusScreen}
                />

                <Stack.Screen
                  name={strings.PRIVACY}
                  component={PrivacyPolicy}
                />
                <Stack.Screen
                  name={strings.TERMS_CONDITION}
                  component={TermsConditions}
                />
                <Stack.Screen
                  name={strings.RETURN_POLICY}
                  component={ReturnPolicy}
                />
                <Stack.Screen
                  name={strings.HELP_SCREEN}
                  component={HelpScreen}
                />
                <Stack.Screen
                  name={strings.BLOCK_SCREEN}
                  component={BlockView}
                />
                <Stack.Screen
                  name={strings.SETTING}
                  component={SettingScreen}
                />
                <Stack.Screen
                  name={strings.UPDATE_MOBILE}
                  component={UpdateMobile}
                />
                
                <Stack.Screen
                  name={"PostDetails"}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: false,
                    title: "Post",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,
                    
                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.black,

                    },
                    headerShadowVisible: false
                  })}
                  component={PostView}
                />
                <Stack.Screen
                  name={strings.USER_MAP}
                  component={UserMapScreen}

                />
                 <Stack.Screen name={strings.UPDATE_POST} component={UpdatePost} />
                <Stack.Screen
                  name={"GroupRide"}
                  component={GroupRide}

                />
                <Stack.Screen
                  name={"Mapscreen"}
                  component={MapScreen}

                />
                <Stack.Screen
                  name={"NotificationList"}
                  component={NotificationList}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: true,
                    title: "Notifications",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,
                    
                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.black,

                    },
                    headerShadowVisible: false
                  })}

                />
                <Stack.Screen
                  name={strings.CLUB_ONBOARDING}
                  component={Clubonboarding}
                />
                <Stack.Screen
                  name={strings.FEED_BACK}
                  component={FeedbackScreen}
                />

                <Stack.Screen
                  name={strings.SOS_SCREEN}
                  component={SOSScreen}
                />

                <Stack.Screen name={strings.EVENT_PAGE} component={EventPage} />
                <Stack.Screen name={strings.UPDATE_EVENT} component={UpdateEvent} />
                <Stack.Screen name={strings.CHAT_SCREEN} component={ChatScreen} />
                <Stack.Screen
                  name={'AddEventMembersScreen'}
                  component={AddEventMembersScreen}
                />
                <Stack.Screen name={'BikeModalUpdate'} component={BikeUpdateScreen} />
                <Stack.Screen name={'InnerBikeUpdate'} component={InnerBikeUpdate} />


                <Stack.Screen
                  name={strings.DETAIL_PAGE}
                  component={DetailScreen}
                />
                <Stack.Screen
                  name={"ImageDetails"}
                  component={ImageDetails}

                />
                <Stack.Screen
                  name={strings.CART_PAGE}
                  component={CartScreen}
                />
                <Stack.Screen
                  name={"Attendance"}
                  component={Attendance}
                  options={{
                    presentation: 'modal'
                  }}
                />
                <Stack.Screen
                  name={strings.CHECKOUT_PAGE}
                  component={CheckoutScreen}
                />
                <Stack.Screen
                  name={strings.FAVOURITES_PAGE}
                  component={FavouritesScreen}
                />
                <Stack.Screen
                  name={strings.NOTIFICATION_PAGE}
                  component={NotificationScreen}
                />
                 

                <Stack.Screen
                  name={strings.BLOCKED_FRIENDS}
                  component={BlockedFriends}
                />
                <Stack.Screen
                  name={strings.ORDERS_SCREEN}
                  component={OrdersScreen}
                />
                <Stack.Screen
                  name={strings.ORDER_COMPLETED_SCREEN}
                  component={OrderCompeleted}
                />
                <Stack.Screen
                  name={strings.TRACK_ORDER_SCREEN}
                  component={TrackOrder}
                />
                <Stack.Screen
                  name={strings.REQUESTCANCELORDER_SCREEN}
                  component={RequestOrderCancel}
                />
                <Stack.Screen
                  name={strings.REVIEW_PRODUCT_SCREEN}
                  component={ReviewProduct}
                />

                <Stack.Screen
                  name={strings.TopRoute_DETAIL}
                  component={TopRouteDetails}
                  options={({ navigation }) => ({
                    headerShown: Platform.OS == 'ios' ? true : true,
                    headerLargeTitle: false,
                    title: "Notifications",
                    headerLeft: () => <TouchableOpacity style={{ marginRight: 20, padding: 15 }} onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon />
                    </TouchableOpacity>,
                    
                    headerTitleStyle: {
                      fontFamily: fonts.PoppinsBold,
                      fontSize: 20,
                      color: COLORS.white
                    },
                    headerStyle: {
                      backgroundColor: COLORS.black,

                    },
                    headerShadowVisible: false
                  })}
                />
              </>
            )}
          </>
        )}

      </Stack.Navigator>

    </>
  );
};

const styles = StyleSheet.create({
  closeButton2: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: ms(1),
    alignItems: 'center',
    width: '90%'
  },
  sosmodalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    flex: 1
  },
});

export default AuthStack;
