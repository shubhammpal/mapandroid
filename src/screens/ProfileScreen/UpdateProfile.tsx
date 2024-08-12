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
import React, { useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import AppText from '../../component/AppText/AppText';
import { COLORS } from '../../style';
import { strings } from '../../utils/strings';
import {
  ArrowBAckIcon,
  ArrowDownIcon,
  CalendarIcon,
  CameraIcon,
} from '../../assets/svgImg/SvgImg';
import { Formik } from 'formik';
import {
  profileValidationSchema,
  updateprofileValidationSchema,
} from '../../utils/Schema';
import InputField from '../../component/CustomInput/InputField';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import {
  requestCompleteProfile,
  requestProfileImage,
  requestUsernameapi,
} from '../../services/api_Services';
import { AuthContext } from '../../component/auth/AuthContext';
import DatePicker from 'react-native-date-picker';
import { MAP_KEY } from '../../services/api_helper';
import { formatDate } from '../../style/typography';
import { setUserData } from '../../services/auth_helper';
import emitter from '../../component/Emitter/emitter';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
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
const UpdateProfile = ({ navigation }: ProfileScreenProps) => {
  const { userDetails, userToken, setUserDetails }: any = useContext(AuthContext);
  const [email, setEmail] = React.useState<any>(userDetails?.email);
  const [license, setLicense] = React.useState<any>(
    userDetails?.driving_licence,
  );
  const [bikeRegistration, setBikeRegistration] = React.useState<any>(
    userDetails?.registration_no,
  );
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loader, setloader] = useState<boolean>(false);
  const [licenseError, setLicenseError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bikeRegistrationError, setBikeRegistrationError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(userDetails?.gender);
  const [textInputHeight] = useState(new Animated.Value(40));


  const [currenCity, setCurrentCity] = React.useState<any>(userDetails?.current_city);
  const [userName, setUserName] = React.useState<any>(userDetails?.user_name);
  
  
  const toggleDropdown = () => {
    Animated.timing(textInputHeight, {
      toValue: isDropdownOpen ? 50 : 120,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setIsDropdownOpen(!isDropdownOpen));
  };

  const CompleteProfile = async (value: any) => {
    const data: any = {
      full_name: value?.fullName,
      email: email,
      user_id: userDetails?.id,
      dob: value?.dob,
      gender: value?.gender,
      driving_licence: value?.license,
      user_name: userName,
      current_city: currenCity,
    };
    
    setloader(true);
    try {
      await requestCompleteProfile(data).then(async (res: any) => {
      
        if (res?.success == true) {
          const data = { heading: 'login', message: res?.message };
          emitter.emit('alert', data);
          await setUserData(res?.user);
          setUserDetails(res?.user);
          navigation.goBack();
        } else {
          const data = {
            heading: 'failed',
            message: res?.message ? res?.message : 'Something went wrong',
          };
          emitter.emit('alert', data);
        }
        setloader(false);
      });
    } catch (error) {
      console.log('Update response: ', error);
      setloader(false);
    }
  };

  const handleLicenseChange = (text: any, setData: any, setDataError: any) => {
    const licenseRegex = /^[A-Z]{2}[0-9]{2}\s?[0-9]{4}\s?[0-9]{7}$/;
   
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

  const formattedDates = (date: any) => {
    let tempDate = new Date(date);
    let formattedDate =
      ('0' + tempDate.getDate()).slice(-2) +
      '-' +
      ('0' + (tempDate.getMonth() + 1)).slice(-2) +
      '-' +
      tempDate.getFullYear();
    return formattedDate;
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

  return (
    <View style={[styles.container, {flex: 1,}]}>
      <KeyboardAvoidingScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <SafeAreaView />
        <View style={[styles.container]}>
          <View style={styles.mainContainer}>
            {Platform.OS == 'android' && (
              <View style={styles.completeView}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginTop: -5 }}>
                  <ArrowBAckIcon active={COLORS.white} />
                </TouchableOpacity>
                <AppText
                  size={20}
                  color={COLORS.white}
                  family="PoppinsBold"
                  horizontal={20}>
                  {strings.UPDATE_PROFILE}
                </AppText>
              </View>
            )}
            <Formik
              validationSchema={updateprofileValidationSchema}
              initialValues={{
                fullName: userDetails?.full_name ?? '',
                dob: userDetails?.dob?.includes('T')
                  ? formattedDates(userDetails.dob)
                  : userDetails?.dob ?? '',
                gender: userDetails?.gender ?? '',
                
                license: userDetails?.driving_licence ?? '',
              }}
              enableReinitialize={true}
              onSubmit={async values => {
                CompleteProfile(values);
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
                        value={userName}
                       
                        setValue={(text: any) => {
                          setUserName( text);
                        }}
                        onSubmit={(text: any) =>{
                         
                          setUserName( text);
                        }}
                        secure={false}
                        
                        name={'User Name'}
                      />
                      
                      <InputField
                        value={userDetails?.mobile}
                        setValue={() =>{}}
                        secure={false}
                        valid={'*'}
                        editable={false}
                        name={'Mobile Number'}
                      />
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
                        mode="date"
                        onConfirm={date => {
                          setShow(false);
                          setDate(date);
                          if (validateAge(date)) {
                            setDate(date);

                            setFieldValue('dob', formattedDates(date));
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
                        setValue={(text: any) =>
                          validateAndSetEmail(text, setEmail, setEmailError)
                        }
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
                            
                            setValue={(text: any) =>
                              setSelectedValue(text)
                            }
                            secure={false}
                           
                            editable={false}
                            icon={
                              <TouchableOpacity
                                onPress={() => toggleDropdown()}>
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
                     
                      <InputField
                        value={currenCity}
                        setValue={(text: any) =>
                          setCurrentCity(text)
                        }
                       
                        secure={false}
                        iconLeft={null}
                        
                        name={'Current City'}
                        onSubmit={(text: any) =>{
                          setCurrentCity(text);
                        }}
                      />
                      
                      <InputField
                        value={values.license}
                        
                        setValue={handleChange('license')}
                        secure={false}
                        maxLength={15}
                        autoCapitalize="characters"
                        name={'Driving License'}

                        formikValue={touched.license}
                        formikError={errors.license}
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

                     

                      <View style={styles.button}>
                        <SubmitButton
                          title={'Update Profile'}
                          pressing={handleSubmit}
                          widthOf={'98%'}
                          loader={loader}
                        />
                      </View>
                    </View>
                  </>
                );
              }}
            </Formik>
          </View>
          <View style={{ height: 40 }} />
        </View>
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default UpdateProfile;
