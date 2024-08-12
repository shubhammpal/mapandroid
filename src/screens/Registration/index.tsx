import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Animated,
  Modal,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import AppText from '../../component/AppText/AppText';
import { COLORS } from '../../style';
import { strings } from '../../utils/strings';
import {
  ArrowDownIcon,
  CalendarIcon,
  CameraIcon,
  CamerasIcon,
  PhotosIcon,
} from '../../assets/svgImg/SvgImg';
import { Formik } from 'formik';
import { profileValidationSchema } from '../../utils/Schema';
import InputField from '../../component/CustomInput/InputField';
import { shadowStyle } from '../../style/typography';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import ImagePicker from 'react-native-image-crop-picker';
import {
  requestCompleteProfile,
  requestProfileImage,
  requestUsernameapi,
} from '../../services/api_Services';
import { AuthContext } from '../../component/auth/AuthContext';
import emitter from '../../component/Emitter/emitter';
import DatePicker from 'react-native-date-picker';
import Geocoder from 'react-native-geocoding';
import { MAP_KEY } from '../../services/api_helper';
import GetLocation from 'react-native-get-location';
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
Geocoder.init(MAP_KEY, {language : "en"});
type ProfileScreenProps = {
  navigation: any;
};
const data = [
  {
    id: 1,
    title: 'Male',
  },
  {
    id: 2,
    title: 'Female',
  },
  {
    id: 3,
    title: 'Other',
  },
  {
    id: 4,
    title: 'I do not want to say',
  },
];
const Registration = ({ navigation }: ProfileScreenProps) => {
  const [email, setEmail] = React.useState<any>('');
  const [license, setLicense] = React.useState<any>('');
  const [bikeRegistration, setBikeRegistration] = React.useState<any>('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setloader] = useState<boolean>(false);
  const [pic, setPic] = useState<any>();
  const [checked, setChecked] = useState(false);
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [licenseError, setLicenseError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [bikeRegistrationError, setBikeRegistrationError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [textInputHeight] = useState(new Animated.Value(40));

  const [city, setCity] = React.useState<any>('');
  const [userName, setUserName] = React.useState<any>('');

  useFocusEffect(
    useCallback(() => {
        setloader(false);
    }, []),
  );
  

  const toggleDropdown = () => {
    Animated.timing(textInputHeight, {
      toValue: isDropdownOpen ? 50 : 120,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsDropdownOpen(!isDropdownOpen));
  };

  const ProfileApi = async (image: any) => {
    const data: any = {
      user_id: userDetails?.id,
      token: userToken,
      profile_picture: image,
    };
    try {
      await requestProfileImage(data).then(async (res: any) => {
        setloader(false);
      });
    } catch (error) {
      console.log('Profile Image response: ', error);
      setloader(false);
    }
  };
 

  const handleLicenseChange = (text: any, setData: any, setDataError: any) => {
    if (/^[a-zA-Z0-9]*$/.test(text)) {
      setData(text);
      setDataError('');
    } else {
      setDataError('Special characters are not allowed');
    }
  };
  const validateAndSetEmail = (email, setEmail, setEmailError) => {
    if (/^[a-z0-9.@]*$/.test(email)) {
      setEmail(email);
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address');

    }
  };

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
        setModalVisible(false);
        takePhotoFromCamera();
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
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        setPic(image?.path);
        ProfileApi(image?.path);
      });
    }, 1000);
  };
  const takePhotoFromCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        setPic(image?.path);
        ProfileApi(image?.path);
      });
    }, 1000);
  };

  const validateAge = (date: any) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 18;
  };
  const Usernameapi = async (value: any, setFieldError: any) => {
    const data: any = {
      user_name: value,
      token: userToken
    };
    try {
      await requestUsernameapi(data).then(async (res: any) => {
        
        setloader(false);
        if (res?.success == false) {
          setFieldError("userName", "The username is not available")
        }
      });
    } catch (error) {
      console.log('User name response: ', error);
      setloader(false);
    }
  }

  const getCurrentLocation = async (setFieldValue: any) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const { latitude, longitude } = location;
        Geocoder.from(latitude, longitude)
          .then(json => {
            const addressComponent =
              json.results[0].address_components.find(component =>
                component.types.includes('locality'),
              );
            if (addressComponent) {
              setFieldValue('city', addressComponent.long_name);
            }
          })
          .catch(error => console.warn(error));
      })
  }
  return (
    <View style={styles.container}>
      <KeyboardAvoidingScrollView
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}>
        <SafeAreaView />
        <View style={[styles.container]}>
          <View style={styles.mainContainer}>
            {
              Platform.OS == 'android' && (
                <View style={styles.completeView}>
                  <AppText size={20} color={COLORS.white} family="PoppinsBold">
                    {strings.COMPLETE_PROFILE}
                  </AppText>
                </View>
              )
            }
            <Formik
              validationSchema={profileValidationSchema}
              initialValues={{
                fullName: '',
                dob: '',
                 gender: '',
                // city: '',
                userName: '',
                license:'',
              }}
              enableReinitialize={true}
              onSubmit={async values => {
                
                if (checked == true) {
                  setloader(true);
                  
                  navigation.navigate(strings.BIKE_MODAL, {
                    res: values,
                    email:email,
                    
                    city:city,
                    userName:values.userName,
                    
                  });
                  
                } else {
                  const data = {
                    heading: 'failed',
                    message: 'Please select privacy policy checkbox',
                  };
                  emitter.emit('alert', data);
                }
              }}>
             {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
                setFieldValue,
                setFieldError,
              }) => {
                useEffect(() => {
                  getCurrentLocation(setFieldValue);
                }, []);

                return (
                  <>
                    <View style={styles.imageView}>
                      <TouchableOpacity
                        style={styles.profileConatiner}
                        onPress={() => {
                          setModalVisible(true);
                        }}>
                        <Image
                          style={styles.image}
                          source={
                            pic
                              ? { uri: pic }
                              : require('../../assets/img/profile.png')
                          }
                        />
                        <View style={styles.editContainer}>
                          <CameraIcon />
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.textinputConatiner}>
                      <InputField
                        value={values.fullName}
                        setValue={handleChange('fullName')}
                        secure={false}
                        valid={'*'}
                        formikValue={touched.fullName}
                        formikError={errors.fullName}
                        name={'Full Name'}
                      />
                      {errors.fullName && touched.fullName && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.fullName}*
                        </AppText>
                      )}

                      <InputField
                        value={values.userName}
                        setValue={(text: any) => {
                          setFieldValue('userName', text)
                          Usernameapi(values.userName, setFieldError)
                        }}
                        
                        secure={false}
                        valid={'*'}
                        formikValue={touched.userName}
                        formikError={errors.userName}
                        name={'User Name'}
                        onSubmit={(text: any) => setUserName(text)}
                      />
                      {errors.userName && touched.userName && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.userName}*
                        </AppText>
                      )}
                        <TouchableOpacity onPress={() => setShow(true)}>
                       
                        <InputField
                          value={values.dob}
                          valid={'*'}
                          setValue={handleChange('dob')}
                          secure={false}
                          editable={false}
                          icon={
                            <TouchableOpacity onPress={() => setShow(true)}>
                              <CalendarIcon />
                            </TouchableOpacity>
                          }
                          keyboard="numeric"
                          formikValue={touched.dob}
                          formikError={errors.dob}
                          name={'Date Of Birth'}
                        />
                      </TouchableOpacity>
                      {errors.dob && touched.dob && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.dob}*
                        </AppText>
                      )}

                      <DatePicker
                        modal
                        open={show}
                        date={date}
                        mode='date'
                        onConfirm={date => {
                          setShow(false);
                          setDate(date);
                          if (validateAge(date)) {
                            setDate(date);
                            let tempDate = new Date(date);
                            let formattedDate =
                              ('0' + tempDate.getDate()).slice(-2) +
                              '-' +
                              ('0' + (tempDate.getMonth() + 1)).slice(-2) +
                              '-' +
                              tempDate.getFullYear();
                            setFieldValue('dob', formattedDate);
                          } else {
                            Alert.alert(
                              'Invalid Date of Birth',
                              'You must be at least 18 years old.',
                            );
                          }
                        }}
                        onCancel={() => {
                          setShow(false);
                        }}
                      />
                      <InputField
                        value={email}
                        setValue={(text: any) => validateAndSetEmail(text, setEmail, setEmailError)}
                        secure={false}
                        autoCapitalize="none"
                        keyboard="email-address"
                        name={'Email Address'}
                      />
                      {emailError && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {emailError}*
                        </AppText>
                      )}

                    
                      <View style={[isDropdownOpen && styles.isDropDown]}>
                        <TouchableOpacity
                          onPress={() => toggleDropdown()}
                          style={{ marginTop: isDropdownOpen ? -18 : 0 }}>
                          <InputField
                            value={selectedValue}
                            setValue={handleChange('gender')}
                            secure={false}
                            
                            editable={false}
                            icon={
                              <TouchableOpacity onPress={() => toggleDropdown()}>
                                <ArrowDownIcon />
                              </TouchableOpacity>
                            }
                            formikValue={touched.gender}
                            formikError={errors.gender}
                            name={'Select Gender'}
                          />
                        </TouchableOpacity>
                        {isDropdownOpen && (
                          <View style={styles.dropDown}>
                            {data?.map((item, index) => {
                              return (
                                <TouchableOpacity
                                  onPress={() => {
                                    setSelectedValue(item?.title);
                                    toggleDropdown();
                                    handleChange('gender')(item?.title);
                                  }}
                                  style={{ marginBottom: 10 }}>
                                  <AppText
                                    size={14}
                                    color={COLORS.semiAAA}
                                    family="PoppinsMedium">
                                    {item?.title}
                                  </AppText>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        )}
                      </View>
                      {errors.gender && touched.gender && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.gender}*
                        </AppText>
                      )}

                      <InputField
                        value={city}
                        
                        setValue={(text: any) => setCity(text)}
                        secure={false}
                        iconLeft={null}
                        
                        name={'Current City'}
                      />
                      
                      <InputField
                        
                        value={values.license}
                        setValue={handleChange('license')}
                        formikValue={touched.license}
                        formikError={errors.license}
                        secure={false}
                        maxLength={15}
                        autoCapitalize="characters"
                        name={'Driving License'}
                      />
                      <AppText
                        size={12}
                        color={COLORS.lightyellow}
                        family="PoppinsMedium"
                        align="right">
                        For example-:DL1420110012345
                      </AppText>
                      {errors.license && touched.license && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                         {"Please enter valid number"}*
                        </AppText>
                      )}

                     

                      <TouchableOpacity
                        onPress={() => setChecked(!checked)}
                        style={styles.row}>
                        <View style={styles.checkBox}>
                          {checked == true && (
                            <Image
                              style={styles.check}
                              source={require('../../assets/img/checkmark.png')}
                            />
                          )}
                        </View>
                        <AppText
                          size={12}
                          color={COLORS.white}
                          family="PoppinsLight"
                          width={'100%'}
                          horizontal={10}>
                          I certify that I am at least 18 years old and I agree to the T&C and privacy policy.
                        </AppText>
                      </TouchableOpacity>

                      <View style={styles.button}>
                        <SubmitButton
                          title={'Continue'}
                          colorChange={checked == false ? '#2B4050' : null}
                          pressing={handleSubmit}
                          widthOf={'98%'}
                          loader={loader}
                        />
                      </View>
                      <AppText
                        size={12}
                        color={COLORS.white}
                        family="PoppinsLight"
                        align="center">
                        Your data is encrypted and safe with us.{' '}
                      </AppText>
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
          <View style={{ height: 40 }} />
        </View>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  if(Platform.OS == 'ios'){
                    takePhotoFromCamera()
                  }else{
                    getCamera();
                  }
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
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default Registration;
