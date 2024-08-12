import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import AppText from '../../component/AppText/AppText';
import { COLORS, ms } from '../../style';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import {
  ArrowBAckIcon,
  CameraIcon,
  CamerasIcon,
  CreateCameraIcon,
  PhotosIcon,
} from '../../assets/svgImg/SvgImg';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { width } from '../../style/typography';
import { strings } from '../../utils/strings';
import { AuthContext } from '../../component/auth/AuthContext';
import { requestCreateGroup } from '../../services/api_Services';

type DescriptionProps = {
  navigation: any;
  route: any;
};
const data = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1622185134994-3e87da0f1bb6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1611429532458-f8bf8f6121fe?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1606907568152-58fcb0a0a4e5?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1592766845554-f2b181f8ed7c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1572452571879-3d67d5b2a39f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1608566048741-c07a7c3c03fa?q=80&w=1947&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 7,
    img: 'https://images.unsplash.com/photo-1591637305338-647472624b6c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJpa2UlMjByaWRlcnxlbnwwfHwwfHx8MA%3D%3D'
  }
];
const Description = ({ navigation, route }: DescriptionProps) => {
  const [selectedImage, setSelectedImage] = useState<any>(data[0]?.img);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%'], []);
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [loader, setLoader] = useState<boolean>(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    
  }, []);

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
        bottomSheetModalRef.current?.close();
      } else {
        console.log('Android camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
    }
  };

  const takePhotoFromLibray = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: false,
        height: 300,
        width: width,
        mediaType: 'photo'
      }).then(image => {
        setSelectedImage(image?.path);
        bottomSheetModalRef.current?.close();
      });
    }, 500);
  };
  const takePhotoFromCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        cropping: false,
        height: 300,
        width: width,
        mediaType: 'photo'
      }).then(image => {
        setSelectedImage(image?.path);
      });
    }, 500);
  };
  const CreateGroup = async () => {
    const data: any = {
      owner_id: userDetails?.id,
      token: userToken,
      description: route.params.description,
      name: route.params.name,
      image: selectedImage,
    };
    setLoader(true);
    try {
      await requestCreateGroup(data).then(async (res: any) => {
        // console.log(res, 'sssResult0000000');
        if (res?.status == true) {
          navigation.replace(strings.INVITE_FRIENDS, {
            groupId: res?.payload?.id,
            groupName: res?.payload?.name
          });
          setLoader(false);
        }
      });
    } catch (error) {
      console.log('Create group response: ', error);
      setLoader(false);
    }
  };
  
  return (
    <BottomSheetModalProvider>
      <View style={[styles.container]}>
        <View style={styles.container}>

          <ImageBackground
            resizeMode="cover"
            source={{
              uri:
                selectedImage
                && selectedImage

            }}
            style={{ height: Platform.OS == 'ios' ? 450 : 300, width: width / 1 }}>
            <SafeAreaView />
            <View style={styles.coverarrow}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 15, paddingRight: 15 }}>
                <ArrowBAckIcon active={COLORS.white} />
              </TouchableOpacity>
              <AppText
                size={20}
                color={COLORS.white}
                family="PoppinsSemiB"
                horizontal={10}>
                Add a cover photo
              </AppText>
            </View>
            <View style={styles.editView}>
              <TouchableOpacity
                onPress={handlePresentModalPress}
                style={styles.edit}>
                <Image
                  source={require('../../assets/img/edit.png')}
                  style={[{ width: 18, height: 18 }]}
                />
                <AppText
                  size={18}
                  color={COLORS.white}
                  family="PoppinsSemiB"
                  horizontal={10}>
                  Edit
                </AppText>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <AppText size={14} color={COLORS.white} family="PoppinsLight">
              You can select from below images
            </AppText>
            <ScrollView horizontal={true} style={{ marginBottom: 20 }}>
              {data.map(item => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedImage(item.img)}>
                  <Image
                    source={{ uri: item.img }}
                    dummy={false}
                    style={[
                      {
                        width: 100,
                        height: 100,
                        margin: 10,
                        borderWidth: selectedImage == item.img ? 2 : 0,
                        borderColor: COLORS.blue,
                      },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
        <View style={{ marginHorizontal: ms(2), marginVertical: ms(5) }}>
          <SubmitButton
            title={'Next'}
            pressing={() => CreateGroup()}
            widthOf={'98%'}
            loader={loader}
          />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={styles.bottomSheetContainer}
          handleIndicatorStyle={styles.handleIndicator}>
          <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.row} onPress={getCamera}>
              <View style={styles.icon}>
                <CreateCameraIcon />
              </View>
              <AppText
                size={16}
                color={COLORS.white}
                family="PoppinsMedium"
                horizontal={20}>
                Camera
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.row} onPress={takePhotoFromLibray}>
              <View style={styles.icon}>
                <Image
                  source={require('../../assets/img/photo.png')}
                  style={[{ width: 18, height: 18 }]}
                />
              </View>
              <AppText
                size={16}
                color={COLORS.white}
                family="PoppinsMedium"
                horizontal={20}>
                Gallery
              </AppText>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default Description;
