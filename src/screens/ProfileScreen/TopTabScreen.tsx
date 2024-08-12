import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, ListRenderItem, SafeAreaView, ScrollView, PermissionsAndroid, Platform } from 'react-native'
import { Tabs } from 'react-native-collapsible-tab-view'
import ProfileScreen from '.'
import { CommunitysIcon, GroupsIcon, MyactivitiesIcon } from '../../assets/svgImg/SvgImg'
import AppText from '../../component/AppText/AppText'
import { COLORS } from '../../style'
import Myactivities from '../Tabbarscreens/Myactivities/Myactivities'
import { AuthContext } from '../../component/auth/AuthContext'
import { requestFollowUser, requestGetDetails, requestProfileImage } from '../../services/api_Services'
import emitter from '../../component/Emitter/emitter'
import ImagePicker from 'react-native-image-crop-picker';
import ClubScreen from '../Tabbarscreens/Club/Club'
import Group from '../Tabbarscreens/Group/Group'

const HEADER_HEIGHT = 250

const DATA = [0, 1, 2, 3, 4]
const identity = (v: unknown): string => v + ''

const Header = ({ dataPass }: any) => {
  
  return <View style={styles.header} />
}




const TopTabScreen = ({ navigation, route }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { userProfilePic, userDetails, userToken, authprofile }: any = useContext(AuthContext);
  const [userdata, setUserdata] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pic, setPic] = useState<any>();

  const getCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Access Camera',
          message: 'Can we access your camera?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('Android camera permission result:', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        takePhotoFromCamera();
        setModalVisible(false);
      } else {
        console.log('Android camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (route?.params?.id) {
        setLoading(true);
        if (route?.params?.id == userDetails?.id) {
          GetUserDetails(userDetails?.id);
        } else {
          GetUserDetails(route.params.id);
        }
      } else {
        GetUserDetails(userDetails?.id);
      }
    });

    return unsubscribe;
  }, [navigation, route, userDetails?.id]);

  const GetUserDetails = async (userId: string) => {
    let apiData
    if (route?.params?.id == userDetails?.id) {
      apiData = { user_id: userId, token: userToken };
    } else {
      apiData = { user_id: userId, token: userToken, loginUserId: userDetails?.id };
    }
    try {
      const res = await requestGetDetails(apiData);
      setUserdata(res);
      setStatus(res?.is_following)
      if (!route?.params?.id) {
        userProfilePic(res?.data?.profile_picture);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('User details response: ', error);
    }
  };

  const UserFollowApi = async () => {
    const data: any = {
      follower_id: userDetails?.id,
      token: userToken,
      following_id: route?.params?.id,
      action: status == true ? 'unfollow' : 'follow',
    };
    try {
      const res = await requestFollowUser(data);
      setStatus(!status);
      setUserdata((prevUserdata: any) => {
        const newFollowerCount = status
          ? prevUserdata.follower_count - 1
          : prevUserdata.follower_count + 1;
        return {
          ...prevUserdata,
          follower_count: newFollowerCount,
        };
      });

    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const takePhotoFromLibray = () => {
    setModalVisible(false)
    setTimeout(() => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      }).then(image => {
        setPic(image?.path);
        ProfileApi(image?.path);
      });
    }, 1000);
  };
  const takePhotoFromCamera = () => {
    setModalVisible(false)
    setTimeout(() => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: true,
      }).then(image => {
        setPic(image?.path);
        ProfileApi(image?.path);
      });
    }, 500);
  };
  const ProfileApi = async (image: any) => {
    const data: any = {
      user_id: userDetails?.id,
      token: userToken,
      profile_picture: image,
    };
    try {
      await requestProfileImage(data).then(async (res: any) => {
        
        const data = { heading: "login", message: res?.message }
        emitter.emit("alert", data)
        emitter.emit("profileUpdate");
      });
    } catch (error) {
      console.log('Profile Image response: ', error);
    }
  };
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    )
  }, [])
  const handleIndexChange = (index: number) => {
    setActiveIndex(index);
    
  }
  const CustomTab = ({ iconName, label, isActive }: any) => {
    
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', width: '100%', }}>
        <MyactivitiesIcon active={activeIndex == 2 ? false : true} />
        <AppText
          size={16}
          color={activeIndex == 2 ? COLORS.white : COLORS.grey54}
          family={'PoppinsMedium'}
          horizontal={10}
          align='center'>
          {label}
        </AppText>
      </View>
    )
  }
  const CustomTab2 = ({ iconName, label, isActive }: any) => {
    
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', }}>
        <CommunitysIcon active={activeIndex == 1 ? true : false} />
        <AppText
          size={16}
          color={activeIndex == 1 ? COLORS.white : COLORS.grey54}
          family={'PoppinsMedium'}
          horizontal={10}>
          {label}
        </AppText>
      </View>
    )
  }
  const CustomTab3 = ({ iconName, label, isActive }: any) => {
    
    return (
      <View style={{ flexDirection: "row", alignItems: 'center', }}>
        <GroupsIcon active={activeIndex == 0 ? true : false} />
        <AppText
          size={16}
          color={activeIndex == 0 ? COLORS.white : COLORS.grey54}
          family={'PoppinsMedium'}
          horizontal={10}>
          {label}
        </AppText>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: COLORS.black }} />
      <Tabs.Container
        renderHeader={() => <ProfileScreen navigation={navigation} route={route} loading={loading} setStatus={setStatus} status={status} UserFollowApi={UserFollowApi} setModalVisible={setModalVisible} modalVisible={modalVisible} pic={pic} setPic={setPic} userdata={userdata} 
        getCamera={()=>{
          if(Platform.OS='ios'){
            takePhotoFromCamera();
          }else{
            getCamera()
          }
        }} 
        takePhotoFromLibray={takePhotoFromLibray} />}
        headerContainerStyle={{ backgroundColor: COLORS.black }}
        onIndexChange={handleIndexChange}
        
      >
       <Tabs.Tab name="My activities" label={() => <CustomTab3 iconName="home" label="Groups" />}>
          <Tabs.ScrollView contentContainerStyle={{ backgroundColor: COLORS.black, flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            <Group navigation={navigation} data={userdata?.data} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Clubs" label={() => <CustomTab2 iconName="home" label="Clubs" />}>
          <Tabs.ScrollView contentContainerStyle={{ backgroundColor: COLORS.black, flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
            <ClubScreen navigation={navigation} data={userdata?.data} />
          </Tabs.ScrollView>
        </Tabs.Tab>
        <Tabs.Tab name="Groups" label={() => <CustomTab iconName="home" label="Gallery" />}>
          <Tabs.ScrollView contentContainerStyle={{ backgroundColor: COLORS.black, flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <Myactivities navigation={navigation} data={userdata?.data} profile={'profile'} />
          </Tabs.ScrollView>
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
    backgroundColor: 'red'
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
})

export default TopTabScreen
