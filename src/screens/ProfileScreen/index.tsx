


import { View, ScrollView, TouchableOpacity, SafeAreaView, Modal, PermissionsAndroid, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { ArrowBAckIcon, CameraIcon, CamerasIcon, EditIcon, PhotosIcon, SilverMedal } from '../../assets/svgImg/SvgImg';
import AppText from '../../component/AppText/AppText';
import { COLORS } from '../../style';
import StackProfile from './StackProfile';
import { requestFollowUser, requestGetDetails, requestProfileImage } from '../../services/api_Services';
import { AuthContext } from '../../component/auth/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import { strings } from '../../utils/strings';
import Skeleton from '../../component/Skeleton/Skeleton';
import emitter from '../../component/Emitter/emitter';
import Video from 'react-native-video';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';

type profileProps = {
  navigation: any,
  route: any
  loading: any
  setStatus: any
  status: any
  UserFollowApi: any
  modalVisible: any
  setModalVisible: any
  setPic: any
  pic: any
  userdata: any
  getCamera: any
  takePhotoFromLibray: any
}

const headers = [
  { id: 1, title: 'My Activities' },
  { id: 2, title: 'Club' },
  { id: 3, title: 'Group' }
];

const ProfileScreen = ({ navigation, route, loading, setStatus, status, UserFollowApi, modalVisible, setModalVisible, pic, setPic, userdata, getCamera, takePhotoFromLibray }: profileProps) => {
  const { userProfilePic, userDetails, userToken, authprofile }: any = useContext(AuthContext);
  const [cardData] = useState(new Array(1).fill(0));
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} bounces={false}>
      <View style={styles.container}>
        <View>
          {
            !loading ? (
              <>
                <View style={{ height: 200, width: '100%', flex: 1 }}>
                  <Video
                    source={require('../../assets/videos/routeVideo.mp4')} // Local MP4 file
                    style={{ height: '100%', width: '100%' }}
                    resizeMode="cover"
                    repeat
                    muted
                  >
                  </Video>
                  <View style={{ position: 'absolute', width: "100%" }}>
                    <SafeAreaView />
                    <View style={styles.arrow}>
                      <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 10 }}>
                        <ArrowBAckIcon active={COLORS.white} />
                        <AppText size={20} color={COLORS.white} family='PoppinsBold' horizontal={25}>
                          {'Profile'}
                        </AppText>
                      </TouchableOpacity>
                      {
                        route?.params?.id && route.params.id !== userDetails?.id && (
                          <TouchableOpacity style={[styles.join]} onPress={() => {
                            setStatus(!status)
                            UserFollowApi()
                          }}>
                            <AppText size={14} color={COLORS.white} family='PoppinsSemiB'>
                              {status == true ? "Following" : "Follow"}
                            </AppText>
                          </TouchableOpacity>
                        )
                      }
                    </View>
                  </View>
                </View>

                

                <View style={styles.imageView}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: '80%' }}>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                      <TouchableOpacity style={styles.profileConatiner}
                        onPress={() => {
                          !route?.params?.id && setModalVisible(true);
                        }}
                        onLongPress={() => {
                          if (userdata?.data?.profile_picture) {
                            navigation.push("ImageDetails", {
                              item: {
                                id: 1
                              }, url: userdata?.data?.profile_picture
                            })
                          }
                        }}>
                        <SharedElement id={`item.${1}.logo`}>
                          <Image
                            style={styles.image}
                            source={pic ?
                              { uri: pic } :
                              userdata ?
                                userdata?.data?.profile_picture ?
                                  { uri: userdata?.data?.profile_picture } :
                                  require('../../assets/img/profilepic.jpg') :
                                authprofile ?
                                  { uri: authprofile } :
                                  require('../../assets/img/profilepic.jpg')
                            }
                          />
                        </SharedElement>

                        {
                          !route?.params?.id && (
                            <TouchableOpacity style={styles.editContainer}
                              onPress={() => {
                                setModalVisible(true);
                              }}>
                              <CameraIcon />
                            </TouchableOpacity>
                          )
                        }
                      </TouchableOpacity>
                    </View>
                    {
                      !route?.params?.id && (
                        <TouchableOpacity style={styles.edit} onPress={() => {
                          navigation.navigate(strings.UPDATE_PRO)
                        }}>
                          <EditIcon />
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  <View style={[styles.nameConatiner]}>
                    <AppText size={24} color={COLORS.white} family='PoppinsMedium' align='center'>{userdata ? userdata?.data?.full_name : userDetails?.full_name}</AppText>
                  </View>
              
                  <View style={styles.totalContainer}>
                    <TouchableOpacity style={styles.totalrides} onPress={() => navigation.push('FollowerList', {
                      title: 'Following',
                      id: userdata?.data?.user_id
                    })}>
                      <AppText size={16} color={COLORS.white} family='PoppinsMedium' >{userdata?.following_count}</AppText>
                      <AppText size={11} color={COLORS.greyBBBB} family='PoppinsRegular'>Following</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.totalrides} onPress={() => navigation.push('FollowerList', {
                      title: 'Followers',
                      id: userdata?.data?.user_id
                    })}>
                      <AppText size={16} color={COLORS.white} family='PoppinsMedium' >{userdata?.follower_count}</AppText>
                      <AppText size={11} color={COLORS.greyBBBB} family='PoppinsRegular'>Followers</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.totalrides}
                      onPress={() =>
                        navigation.push('TopRootsScreen', {
                          data: userdata?.data?.user_id,
                        })
                      }>
                      <AppText
                        size={16}
                        color={COLORS.white}
                        family="PoppinsMedium">
                        {userdata?.totalBikeRides}
                      </AppText>
                      <AppText
                        size={11}
                        color={COLORS.greyBBBB}
                        family="PoppinsRegular">
                        Total Rides
                      </AppText>
                    </TouchableOpacity>
                    <View style={styles.totalrides}>
                      <AppText size={16} color={COLORS.white} family='PoppinsMedium' >{userdata?.totalKM} kms</AppText>
                      <AppText size={11} color={COLORS.greyBBBB} family='PoppinsRegular'>Total Travels</AppText>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 70 }} />
               
              </>
            ) : (
              <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
                {cardData.map((_, index) => (
                  <View style={{}}>
                    <Skeleton type="box" height={240} width={'100%'} />
                    <View style={{ marginTop: -50, alignItems: 'center' }}>
                      <Skeleton type="circle" height={120} width={120} borderRadius={100} />
                      <Skeleton type="box" height={20} width={'30%'} style={{ marginVertical: 20 }} />
                      <Skeleton type="box" height={20} width={'50%'} />
                    </View>
                  </View>
                ))}
              </ScrollView>
            )
          }
        </View>

      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                getCamera();
              }}
              style={styles.camera}>
              <CamerasIcon />
              <AppText
                size={16}
                color={COLORS.black}
                family="PoppinsMedium"
                horizontal={15}>
                Camera
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                takePhotoFromLibray();
              }}
              style={styles.camera}>
              <PhotosIcon />
              <AppText
                size={16}
                color={COLORS.black}
                family="PoppinsMedium"
                horizontal={15}>
                Gallery
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ alignItems: 'flex-end' }}>
              <AppText
                size={18}
                color={COLORS.fadeRrrorRed}
                family="PoppinsMedium">
                Cancel
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;