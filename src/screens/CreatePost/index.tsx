import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput as RNTextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Modal,
  FlatList,
  ImageBackground,
  BackHandler,
  Platform
} from 'react-native';
import React, { useMemo, useRef, useState, useEffect, useContext, useCallback } from 'react';
import { styles } from './styles';
import {
  ArrowBAckIcon,
  BackgroundIcon,
  CreateCameraIcon,
  CreateLocation,
  CrossBorderIcon,
  CrossIcon,
  GlobalIcon,
  SmallArrowDownIcon,
  TagRidersicon,
  VideoImageIcon,
} from '../../assets/svgImg/SvgImg';
import AppText from '../../component/AppText/AppText';
import { COLORS, ms } from '../../style';
import { strings } from '../../utils/strings';
import BottomSheet from '@gorhom/bottom-sheet';
import { height, width } from '../../style/typography';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from '../../component/auth/AuthContext';
import { requestCreatePost, requestNotificationSend } from '../../services/api_Services';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import CreateSearchtextinput from '../Tabbarscreens/Events/CreateSearchtextinput';
import axios from 'axios';
import Textinput from '../../component/BottomSheetConatiner/Textinput';

import Video from 'react-native-video';
import { tags } from 'react-native-svg/lib/typescript/xml';
import { fonts } from '../../utils/misc';
import { useFocusEffect } from '@react-navigation/native';

const backgroundColorArr = [
  {
    id: 0,
    backgroundColor: '#C4A484',
    status: false,
  },
  {
    id: 1,
    backgroundColor: '#9F6BF3',
    status: false,
  },
  {
    id: 2,
    backgroundColor: '#448361',
    status: false,
  },
  {
    id: 3,
    backgroundColor: '#FFFFFF',
    status: false,
  },
  {
    id: 4,
    backgroundColor: '#D9730D',
    status: false,
  },
  {
    id: 5,
    backgroundColor: '#CC8899',
    status: true,
  },
  {
    id: 6,
    backgroundColor: '#FF0000',
    status: false,
  },

  {
    id: 7,
    backgroundColor: '#0000FF',
    status: false,
  },
  {
    id: 8,
    backgroundColor: '#964B00',
    status: false,
  },

];

type CreatePostProps = {
  navigation: any;
};

type MediaType = {
  type: 'image' | 'video';
  path: string;
};

const CreatePost = ({ navigation }: CreatePostProps) => {
  const { postLocation, setPostLocation, tagUsers, setTagUsers }: any =
    useContext(AuthContext);
  const [description, setDescription] = useState<any>('');
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['17%', '23%', Platform.OS=='ios'?'38%':'42%', '65%', '95%'], []);
  const [loader, setLoader] = useState<boolean>(false);
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('public');

  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const startRef = useRef(null);
  const [searchText, setSearchText] = useState<any>();
  const [startLocation, setStartLocation] = useState<any>(null);
  const [address, setAddress] = useState('');

  const [screenData, setScreenData] = useState<any>(0);
  const [currentLocation, setCurrentLocation] = useState<any[] | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(false);
  const [videoStatus, setVideoStatus] = useState(true);

  
  const containerBackgroundColor = selectedImage == null ? selectedColor : '#111111';
  const inputBackgroundColor = selectedColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
  const containerHeight = backgroundColor ? 400 : undefined;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = description?.match(urlRegex);
 

  useFocusEffect(
    useCallback(() => {
      setVideoStatus(false)
      return () => {
      };
    }, [])
  );
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setVideoStatus(true)
    });

    return unsubscribe;
  }, [navigation]);

  const handleSheetChange = (index: any) => {
    if (index >= 0 && index < snapPoints.length) {
      
    } else {
      console.warn(
        `Invalid index: ${index}. Expected between 0 and ${snapPoints.length - 1
        }`,
      );
      sheetRef.current?.close();
    }
  };

  const NotificationSend = async (res: any) => {
    const data: any = {
      userId: userDetails?.id,
      token: userToken,
      notificationType: "post",
      entityId: res?._id,
      message: "New post created!",
      key: "CustomDataKey",
      is_accept:"false"
    };
    try {
      const res = await requestNotificationSend(data);
      if (res?.status == true) {
        
      } else {
        
      }
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };


  const handleFocus = () => {
    sheetRef.current?.close();
  };

  const handleBlur = () => {
    
    sheetRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        sheetRef.current?.snapToIndex(2);
      },
    );

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        sheetRef.current?.close();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    
  };

  const takePhotoFromLibrary = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        mediaType: 'any', // Allow picking both images and videos
        multiple: false,
      }).then(media => {
        if (media && media.mime && media.mime.includes('video')) {
          // Handle video selection separately (not cropped)
          setSelectedImage({ type: 'video', path: media.path });
        } else {
          // Handle image selection (cropped)
          ImagePicker.openCropper({
            path: media.path,
            height: 400,
            width: width,
            cropping: true,
            // cropperCircleOverlay: true,
            mediaType: 'photo', // Specify mediaType as 'photo' for image cropping
          }).then(image => {
            setSelectedImage({ type: 'image', path: image.path });
          });
        }
      });
    }, 1000);
  };

  const takePhotoFromCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        mediaType: 'any', // Allow picking both images and videos
        multiple: false,
      }).then(media => {
        if (media && media.mime && media.mime.includes('video')) {
          // Handle video selection separately (not cropped)
          setSelectedImage({ type: 'video', path: media.path });
        } else {
          // Handle image selection (cropped)
          ImagePicker.openCropper({
            path: media.path,
            height: 400,
            width: width,
            cropping: true,
            compressImageQuality: 1,
            // cropperCircleOverlay: true,
            mediaType: 'photo', // Specify mediaType as 'photo' for image cropping
          }).then(image => {
            setSelectedImage({ type: 'image', path: image.path });
          });
        }
      });
    }, 500);
  };

  const tagUserIds = tagUsers.map((user: any) => user.id);
  const CreatePost = async () => {
    if (selectedImage == null && description == '') {
      Alert.alert('Please select image or title');
      return;
    }
    const data: any = {
      user: userDetails?.id,
      token: userToken,
      description: description,
      files: selectedImage,
      visibility: selectedOption,
      color: [selectedColor],
      location: postLocation,
      tags: tagUserIds,
    };
    setLoader(true);
   
    try {
      await requestCreatePost(data).then(async (res: any) => {
        if (res) {
          navigation.goBack();
        }
        setLoader(false);
        setPostLocation('');
        setTagUsers([]);
        setSelectedColor('');
        setDescription('')
      });
    } catch (error) {
      console.log('Create group response: ', error);
      setLoader(false);
    }
  };

  const getDirections = (address: any) => {
    setAddress(address);
    
    setLocationModalVisible(false);
  };

  const onGoBack = () => {
    setPostLocation('');
    setTagUsers([]);
    navigation.navigate(strings.HOME);
    setSelectedColor('');
    setDescription('')
  };

  const handleBackPress = () => {
    setPostLocation('');
    setTagUsers([]);
    setSelectedColor('');
    navigation.navigate(strings.HOME);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);


  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setSelectedColor(item.backgroundColor)}
        style={[
          {
            height: 60,
            width: 60,
            borderRadius: 6,
            backgroundColor: item.backgroundColor,
            marginRight: 10,
            marginLeft: 1,
          },
        ]}
      />
    );
  };

  return (
    <View style={[styles.container]}>
      <SafeAreaView />
      <View style={styles.mainContainer}>
        <View style={styles.arrow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => {
                onGoBack();
              }}>
              <ArrowBAckIcon />
            </TouchableOpacity>
            {selectedImage && selectedImage.type === 'image' && (
              <Image
                source={
                  selectedImage && selectedImage.type === 'image'
                    ? { uri: selectedImage.path }
                    : require('../../assets/img/post.png')
                }
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  marginHorizontal: 25,
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            

            <TouchableOpacity
              style={styles.publishButton}
              onPress={() => CreatePost()}>
              {loader ? (
                <ActivityIndicator size={20} color={COLORS.white} />
              ) : (
                <AppText size={12} color={COLORS.white} family="PoppinsMedium">
                  Publish
                </AppText>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View
            style={[
              styles.descriptionContainer,
              { paddingBottom: selectedImage ? ms(0) : ms(15) },
            ]}>
            <View

              style={[{
                backgroundColor: containerBackgroundColor,
                height: containerHeight,
                width: '100%',
                borderRadius: 20,
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column'
              },
              ]}
            >
              <RNTextInput
                value={description}
                style={[
                  styles.input,
                  {
                    textAlignVertical: backgroundColor ? 'center' : 'top',
                    textAlign: backgroundColor ? 'center' : 'auto',
                    color: inputBackgroundColor,
                    fontFamily: backgroundColor ? fonts.QuicksandBold : fonts.PoppinsSemiB,
                    fontSize: backgroundColor ? 27 : 18,
                  },
                ]}
                placeholderTextColor={COLORS.grey92}
                placeholder="What’s on your mind?"
                onChangeText={text => {setDescription(text)}}
                keyboardType="default"
                onFocus={handleFocus}
                onBlur={handleBlur}
                multiline={true}
                maxLength={300}
              />
            </View>
            {backgroundColor == true && (
              <View style={{ marginTop: 10, height: 120, marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={() => {
                    setBackgroundColor(false), setSelectedColor('#111111'), sheetRef.current?.snapToIndex(2);
                  }}>
                  <AppText
                    size={14}
                    color={COLORS.whiteFBFB}
                    family={fonts.QuicksandBold}
                    horizontal={15}>
                    {'Remove'}
                  </AppText>
                </TouchableOpacity>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={backgroundColorArr}
                  horizontal
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={{
                    paddingVertical: 10,
                  }}
                />
              </View>
            )}

            {selectedImage && selectedImage.type === 'image' && (
              <ImageBackground
                source={{ uri: selectedImage.path }}
                resizeMode="contain"
                style={{
                  height: 420,
                  width: '100%',
                  backgroundColor: COLORS.black1717,
                  borderRadius: 20,
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(null), sheetRef.current?.snapToIndex(2)
                  }}>
                  <CrossIcon />
                </TouchableOpacity>
              </ImageBackground>
            )}
            {selectedImage && selectedImage?.type === 'video' && (
              <View
                style={{
                  width: '100%',
                  height: 445,
                  backgroundColor: COLORS.black1717,
                  borderRadius: 20,
                  alignItems: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(null), sheetRef.current?.snapToIndex(2);
                  }}>
                  <CrossIcon />
                </TouchableOpacity>
                <Video
                  source={{ uri: selectedImage.path }}
                  style={{ height: 400, width: '100%' }}
                  resizeMode="contain"
                   paused={videoStatus}
                  repeat={true}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <BottomSheet
        ref={sheetRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetContainer}
        handleIndicatorStyle={styles.handleIndicator}
        onChange={handleSheetChange}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              takePhotoFromLibrary(),
                setBackgroundColor(false),
                setSelectedColor('#111111'),
                handleBlur();
            }}>
            <View style={styles.icon}>
              <VideoImageIcon />
            </View>
            <AppText
              size={16}
              color={COLORS.white}
              family="PoppinsMedium"
              horizontal={15}>
              Upload a photo or video
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              takePhotoFromCamera(),
                setBackgroundColor(false),
                setSelectedColor('#111111'),
                handleBlur();
            }}>
            <View style={styles.icon}>
              <CreateCameraIcon />
            </View>
            <AppText
              size={16}
              color={COLORS.white}
              family="PoppinsMedium"
              horizontal={15}>
              Camera
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() =>navigation.navigate('AddLocation',{location:postLocation})}>
            <View style={styles.icon}>
              <CreateLocation />
            </View>
            <View>
              <AppText
                size={16}
                color={COLORS.white}
                family="PoppinsMedium"
                horizontal={15}>
                Add Location
              </AppText>
              {postLocation && (
                <AppText
                  size={14}
                  color={COLORS.greyBBBB}
                  family="PoppinsRegular"
                  horizontal={15}>
                  {postLocation}
                </AppText>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('TagRiders',{tags:tagUsers})}>
            <View style={styles.icon}>
              <TagRidersicon />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '88%',
              }}>
              <AppText
                size={16}
                color={COLORS.white}
                family="PoppinsMedium"
                horizontal={15}
                width={'45%'}>
                Tag Riders
              </AppText>
              {tagUsers.length > 0 &&
                (tagUsers.length == 1 ? (
                  <AppText
                    size={16}
                    color={COLORS.grey6262}
                    family="PoppinsMedium"
                    horizontal={15}>
                    {'@'+tagUsers[0].full_name}
                  </AppText>
                ) : (
                  <AppText
                    size={16}
                    color={COLORS.grey6262}
                    family="PoppinsMedium"
                    horizontal={15}>
                    {tagUsers.length + ' People'}
                  </AppText>
                ))}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              setSelectedColor(backgroundColorArr[0].backgroundColor),
              setBackgroundColor(true), handleBlur(), setSelectedImage(null)
            }}>
            <View style={styles.icon}>
              <BackgroundIcon />
            </View>
            <AppText
              size={16}
              color={COLORS.white}
              family="PoppinsMedium"
              horizontal={15}>
              Background Color
            </AppText>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <Modal transparent visible={locationModalVisible}>
        <View style={[styles.container]}>
          <SafeAreaView />
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                setLocationModalVisible(false);
              }}>
              <ArrowBAckIcon />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View>
                <CreateSearchtextinput
                  setSearchText={setSearchText}
                  getDirections={getDirections}
                  setStartLocation={setStartLocation}
                  locationStatus={1}
                  ref={startRef}
                  searchText={address != '' ? address : searchText || ''}
                  placeholder={'search Location'}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

export default CreatePost;
