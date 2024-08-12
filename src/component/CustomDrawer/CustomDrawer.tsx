import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Linking, Platform, LayoutAnimation, TouchableNativeFeedback } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { COLORS, ms } from '../../style';
import AppText from "../AppText/AppText";
import { CommunityIcon, DeleteIcon, EditIcon, GearIcon, HelpIcon, MobileIcon, MybikesIcon, PointsIcon, RewardsPointIcon, RidesHistoryIcon, SOSIcon, SettingIcon } from '../../assets/svgImg/SvgImg';
import { width } from '../../style/typography';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import ImgView from '../ImgView/ImgView';
import { requestDeleteAccount, requestGetDetails } from '../../services/api_Services';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { strings } from '../../utils/strings';
import emitter from '../Emitter/emitter';
export const drawerMenu = [
  {
    title: "Settings",
    route: 'Settings',
    img: <SettingIcon />,
    menuList: [
      {
        title: "Update Mobile Number",
        route: strings.UPDATE_MOBILE,
        img: <CommunityIcon active={COLORS.white} />,
        menuList: [
          { title: 'Eat' },
          { title: 'Code' },
          { title: 'Sleep' },
        ]
      },
      {
        title: "Club Onboarding",
        route: strings.CLUB_ONBOARDING,
        img: <MobileIcon active={COLORS.white} />,
        menuList: [
          { title: 'Portfolio' },
          { title: 'Note-APP' },
          { title: 'RN-Ui' },
        ]
      },
      {
        title: "Delete Account",
        route: 'Project',
        img: <DeleteIcon active={COLORS.white} />,
        menuList: [
          { title: 'Portfolio' },
          { title: 'Note-APP' },
          { title: 'RN-Ui' },
        ]
      },
      {
        title: strings.BLOCKED_USERS,
        route: strings.BLOCKED_FRIENDS,
        img:  <Image
        source={require('../../assets/img/stop.png')}
        style={{height:15,width:15,tintColor:'#FFFFFF'}}
      />,
        menuList: [
          { title: 'Portfolio' },
          { title: 'Note-APP' },
          { title: 'RN-Ui' },
        ]
      },
    ]
  },



]
const CustomDrawer = ({ props, navigation }: any) => {
  const { logoutPress, userDetails, userToken, drawerPage }: any = useContext(AuthContext)
  const [progress, setProgress] = useState(0);
  const [userdata, setUserdata] = useState<any>();
  const [menuIndex, setMenuIndex] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);

  
  useEffect(() => {
    emitter.addListener("profileUpdate", GetUserDetails);
    return () => {
      emitter.removeAllListeners();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      
      if (userToken && userDetails) {
        GetUserDetails();
      }
    }, [userToken, userDetails]),
  );
  
  
  const GetUserDetails = async () => {
    const apiData = { user_id: userDetails?.id, token: userToken };
    try {
      await requestGetDetails(apiData).then(async (res: any) => {
        
        setProgress(res?.profileScore)
        setUserdata(res?.data);
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };


  const onRating = () => {
    const urlPlayStore = "https://play.google.com/store/apps/details?id=com.thebikerscompany";
    const urlAppStore = "https://apps.apple.com/in/app/mytra/id6526488238";
    Linking.openURL(Platform.OS == 'ios' ? urlAppStore : urlPlayStore)
      .catch(err => console.error('An error occurred', err));
  };

  const Deleteaccountapi = async () => {
    setModalVisible(false)
    const data: any = {
      user_id: userDetails?.id,
      token: userToken
    };
    try {
      await requestDeleteAccount(data).then(async (res: any) => {
        
        logoutPress()
      });
    } catch (error) {
      console.log('Login response: ', error);
    }
  };



  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} style={styles.drawer}>
        <View style={styles.mainContainer}>
          <View style={styles.firstContainer}>
            <View style={[styles.imageContainer,{
    width: "100%"}]}>
              <ImgView
                height={59}
                width={59}
                radius={50}
                dummy={true}
                url={
                  userdata?.profile_picture
                    ? { uri: userdata?.profile_picture }
                    : require('../../assets/img/profilepic.jpg')
                }
              />
              <View style={{ marginHorizontal: 20, flex: 1 ,}}>
                <AppText size={18} color={COLORS.white} family='PoppinsBold'
                >{userdata?.full_name}</AppText>
                <View style={{ flexDirection: 'row' }}>
                  <RewardsPointIcon />
                  <AppText size={16} color={COLORS.greyD9} family='PoppinsBold' horizontal={5}
                  >{parseFloat(userdata?.total_earning_point).toFixed(0)}</AppText>
                  <AppText size={16} color={COLORS.greyAD} family='PoppinsRegular'
                  >{'Points'}</AppText>
                </View>
              </View>
            </View>
           
          </View>
          <View style={styles.progressContainer}>
            <AppText size={16} color={COLORS.greyC4C4} family='PoppinsBold' >Your Profile Progress</AppText>
            <AppText size={14} color={COLORS.greyC4C4} family='PoppinsRegular' >Complete your profile</AppText>
            <View style={styles.imageContainer}>
              <ProgressBar progress={progress / 100} color={COLORS.blue} style={styles.progressbar} />
              <AppText size={16} color={COLORS.lightBlue} family='PoppinsRegular' align='center' horizontal={10}>{Math.round(progress * 100) / 100}%</AppText>

            </View>
          </View>
          <View style={styles.screensContainer}>
            <TouchableOpacity style={styles.screensView} onPress={() => {
              navigation.closeDrawer()
              navigation.navigate('TopRootsScreen', {
                data: 'data'
              })
            }}>
              <RidesHistoryIcon />
              <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>Ride History</AppText>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.screensView}
              onPress={() => {
                navigation.closeDrawer()
                navigation.navigate(strings.SOS_SCREEN)
              }}>
              <SOSIcon />
              <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>Add SOS Contacts</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screensView}
              onPress={() => {
                navigation.closeDrawer()
                navigation.navigate(strings.BIKE_RIDE)
              }}
            >
              <MybikesIcon />
              <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>My Bikes</AppText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.screensView}
              onPress={() => {
                navigation.closeDrawer()
                navigation.navigate(strings.FEED_BACK)
              }}
            >
              <Image
                source={require('../../assets/img/feedback.png')}
                style={{
                  height: 23,
                  width: 23,
                }}
              />
              <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>Contact Us</AppText>
            </TouchableOpacity>


            {drawerPage == true &&
              <TouchableOpacity style={styles.screensView}
                onPress={() => { }}
              >
                <MybikesIcon />
                <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>Orders</AppText>
              </TouchableOpacity>
            }

            {drawerMenu.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  style={[styles.menu]}
                  onPress={() => {
                    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                    LayoutAnimation.configureNext(
                      LayoutAnimation.create(200, 'easeInEaseOut', 'opacity'),
                    );
                    setMenuIndex(menuIndex === index ? -1 : index);
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    
                    <GearIcon />
                    <AppText
                      size={16}
                      color={COLORS.greyC4C4}
                      family="PoppinsRegular"
                      align="center"
                      horizontal={17}>
                      Settings
                    </AppText>
                  </View>
                  {menuIndex === index && (
                    <View style={{ borderRadius: 20 }}>
                      {item.menuList.map((subMenu, subindex) => (
                        <TouchableOpacity key={subindex} onPress={() => {
                          if (subindex != 2) {
                            navigation.closeDrawer()
                            navigation.navigate(subMenu.route)
                          } else {
                            navigation.closeDrawer()
                            setModalVisible(true)
                          }
                        }} >
                          <View style={[styles.subMenu, subindex == 0 && { marginLeft: -4 }]}>
                            <View style={{}}>
                            <AppText>{subMenu?.img}</AppText>
                            </View>
                            <AppText
                              size={16}
                              color={COLORS.greyC4C4}
                              family="PoppinsRegular"
                              align="left"
                              horizontal={17}>
                              {subMenu?.title}
                            </AppText>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity style={styles.screensView}
              onPress={() => {
                navigation.closeDrawer()
                navigation.navigate(strings.PRIVACY_POLICY_SCREENS)
              }}>

              <HelpIcon />
              <AppText size={16} color={COLORS.greyC4C4} family='PoppinsRegular' align='center' horizontal={17}>Policy</AppText>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRating}>
              <Image style={styles.drawerimage} source={
                require('../../assets/img/drawerimage.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.closeDrawer()
              logoutPress()
            }}>
              <AppText size={16} color={COLORS.darkyellow} family='PoppinsBold' align='center'>Log Out</AppText>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalDataContainer}>
                <DeleteIcon active={COLORS.black} width={50} height={50} />
                <View style={{ marginTop: 20 }} />
                <AppText size={18} color={COLORS.black131} family='PoppinsMedium' horizontal={20} align='center'>Are you sure you want to delete account?</AppText>
                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      Deleteaccountapi()
                    }}
                    style={styles.yesButton}
                  >
                    <AppText size={18} color={COLORS.white} family='PoppinsMedium' horizontal={20}>Yes</AppText>

                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.noButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <AppText size={18} color={COLORS.black} family='PoppinsMedium' horizontal={20}>No</AppText>

                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </DrawerContentScrollView >


    </View >
  );
};
export default CustomDrawer;

export const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: COLORS.black222
  },
  drawer: {
    marginTop: -5,
    backgroundColor: COLORS.black222,
    flex: 1
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%"
  },

  firstContainer: {
    marginTop: '15%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "95%"
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%"
  },
  edit: {
    width: 35,
    height: 35,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black3030
  },

  screensContainer: {
    marginTop: 5
  },
  screensView: {
    flexDirection: 'row', alignItems: 'center', marginBottom: '8%'
  },

  drawerimage: {
    height: 120,
    width: "95%",
    borderRadius: 10,
    marginVertical: ms(1),
    alignSelf: 'center',
  },
  progressContainer: {
    backgroundColor: COLORS.black,
    borderRadius: 6,
    paddingHorizontal: ms(1),
    paddingVertical: ms(0),
    marginVertical: ms(1)
  },
  progressbar: {
    backgroundColor: COLORS.black3030,
    borderRadius: 50,

    height: 8,
    width: width / 2
  },
  menu: {
    marginBottom: '8%',
    borderRadius: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 20,
  },
  subMenu: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#021420b3',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalDataContainer: {
    height: 256,
    width: 328,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesButton: {
    width: '45%',
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 8
  },
  modalBtnContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20
  },
  noButton: {
    width: '45%',
    borderWidth: 1,
    borderColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },


})

