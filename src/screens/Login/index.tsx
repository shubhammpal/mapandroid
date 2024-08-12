import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {styles} from './styles';
import AppText from '../../component/AppText/AppText';
import {COLORS, ms} from '../../style';
import {strings} from '../../utils/strings';
import {
  AppleIcon,
  CrossRedIcon,
  GoogleIcon,
  InstagramIcon,
  MobileIcon,
} from '../../assets/svgImg/SvgImg';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import {Formik} from 'formik';
import {LoginValidationSchema, ModalValidationSchema} from '../../utils/Schema';
import {
  requestLoginOTP,
  requestLoginSocial,
  requestSocialRegisterApi,
} from '../../services/api_Services';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import InputField from '../../component/CustomInput/InputField';
import emitter from '../../component/Emitter/emitter';
import {setUserData} from '../../services/auth_helper';
import {AuthContext} from '../../component/auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { requestUserPermission } from '../../services/pushnotification_helper';

type LoginProps = {
  navigation: any;
};
const Login = ({navigation}: LoginProps) => {
  const [loader, setloader] = useState(false);
  const [addModal, setAddModal] = useState<any>(false);
  const [userInfo, setUserInfo] = React.useState<any>('');
  const [appleloader, setAppleloader] = useState(false);
  const {loginPress, socialloginPress}: any = useContext(AuthContext);

  useEffect(() => {
    GoogleSignin.configure();
    requestUserPermission()
  }, []);
  const LoginSubmit = async (value: any) => {
    try {
      await requestLoginOTP(value).then(async (res: any) => {
        
        if (res?.success == true) {
          navigation.navigate(strings.OTP, {
            mobile: value?.mobile,
            otp: res?.OTP,
            page:'login'
          });
        }
        setloader(false);
      });
    } catch (error) {
      console.log('Login response: ', error);
      setloader(false);
    }
  };

  const SocialApi = async (value: any) => {
    const data = {
      google_id: value,
    };
    try {
      await requestLoginSocial(data).then(async (res: any) => {
        
        if (res?.success == true) {
          await setUserData(res?.user);
          socialloginPress(res);
          const data = {heading: 'login', message: res?.message};
          emitter.emit('alert', data);
        } else {
          setAddModal(true);
        }
        setloader(false);
      });
    } catch (error) {
      console.log('Login response: ', error);
      setloader(false);
    }
  };
  const GooglePress = async () => {
    await GoogleSignin.signOut();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      setUserInfo(userInfo);

      SocialApi(userInfo?.user?.id);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancel');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not avaiable');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  };
  const SocialLoginApi = async (mobile: any) => {
    const data = {
      full_name: userInfo?.user?.givenName + ' ' + userInfo?.user?.familyName,
      email: userInfo?.user?.email,
      google_id: userInfo?.user?.id,
      profile_picture: userInfo?.user?.photo,
      country_code: '+91',
      mobile: mobile,
    };
    setAppleloader(true);
    try {
      await requestSocialRegisterApi(data).then(async (res: any) => {
        
        if (res?.success == true) {
          await setUserData(res?.user);
          socialloginPress(res);
          const data = {heading: 'login', message: 'Login successfully'};
          emitter.emit('alert', data);
        } else if (res?.message == 'User mobile already exists') {
          if (userInfo?.user?.id) {
            const data = {google_id: userInfo?.user?.id};
            console.log(data, 'google_id');
            const datas = {
              heading: 'failed',
              message: 'User mobile already exists',
            };
            emitter.emit('alert', datas);
          } else {
            
          }
        }
        setAppleloader(false);
        setAddModal(false);
      });
    } catch (error) {
      console.log('Login response: ', error);
      setAppleloader(false);
      setAddModal(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.sharedView}>
            <Image
              source={require('../../assets/img/bikelogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          <Formik
            initialValues={{mobileNumber: ''}}
            validationSchema={LoginValidationSchema}
            onSubmit={async values => {
              const fcmToken = await AsyncStorage.getItem('fcmToken');
              setloader(true);
              let formattedMobileNumber = values?.mobileNumber.replace(
                /\s/g,
                '',
              );
              const apiData = {mobile: formattedMobileNumber, device_token: fcmToken };
              LoginSubmit(apiData);
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <View style={{marginTop: ms(12)}}>
                <View style={styles.textContainer}>
                  <AppText
                    size={14}
                    color={COLORS.greyCD}
                    family="PoppinsMedium">
                    {strings.MOBILE_NUMBER}
                  </AppText>
                  <View
                    style={[
                      styles.textinputContainer,
                      {
                        borderColor:
                          errors.mobileNumber && touched.mobileNumber
                            ? COLORS.fadeRrrorRed
                            : '#434344',
                      },
                    ]}>
                    <TextInput
                      style={styles.mobile}
                      onChangeText={text => {
                        const formattedText = text.replace(/\D/g, '');
                        let formattedMobileNumber = '';
                        if (formattedText.length > 5) {
                          formattedMobileNumber =
                            formattedText.slice(0, 5) +
                            ' ' +
                            formattedText.slice(5, 10);
                        } else {
                          formattedMobileNumber = formattedText;
                        }
                        handleChange('mobileNumber')(formattedMobileNumber);
                      }}
                      onBlur={handleBlur('mobileNumber')}
                      value={values.mobileNumber}
                      maxLength={11}
                      keyboardType="number-pad"
                      placeholderTextColor={COLORS.semiAAA}
                      placeholder="+91 99260 12345"
                    />
                    <TouchableOpacity>
                      <MobileIcon />
                    </TouchableOpacity>
                  </View>
                  {errors.mobileNumber && touched.mobileNumber && (
                    <AppText
                      size={12}
                      color={COLORS.fadeRrrorRed}
                      family="PoppinsMedium"
                      align="right">
                      {errors.mobileNumber}*
                    </AppText>
                  )}
                </View>
                <SubmitButton
                  title={'Send OTP'}
                  pressing={handleSubmit}
                  widthOf={'100%'}
                  loader={loader}
                />
              </View>
            )}
          </Formik>
          <View style={styles.terms}>
            <Text style={[styles.register, {color: COLORS.grey90}]}>
              {strings.REGISTER}
              <TouchableOpacity
                onPress={() => navigation.navigate(strings.TERMS_CONDITION)}
                style={{}}>
                <Text
                  style={[
                    styles.register,
                    {
                      color: COLORS.blueoff,
                      textDecorationLine: 'underline',
                      textDecorationColor: COLORS.blueoff,
                    },
                  ]}>
                  {strings.TERMS}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.row}>
            
          </View>
          <View style={styles.sociallogin}>
            
          </View>
        </View>
        <Modal transparent visible={addModal}>
          <View style={[styles.sosmodalContent]}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.closeButton2}
                onPress={() => {
                  setAddModal(false);
                }}>
                <CrossRedIcon />
              </TouchableOpacity>

              <AppText
                size={18}
                family="PoppinsSemiB"
                color={COLORS.white}
                align="center">
                Add a contact
              </AppText>
              <View style={styles.textinputConatiner}>
                <Formik
                  initialValues={{mobileNumber: ''}}
                  validationSchema={ModalValidationSchema}
                  onSubmit={values => {
                    
                    SocialLoginApi(values?.mobileNumber);
                  }}>
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                  }) => (
                    <>
                      <InputField
                        keyboard="numeric"
                        maxLength={10}
                        name={'Contact Number'}
                        value={values.mobileNumber}
                        setValue={handleChange('mobileNumber')}
                        secure={false}
                        iconLeft={null}
                        formikValue={touched.mobileNumber}
                        formikError={errors.mobileNumber}
                      />
                      {errors.mobileNumber && touched.mobileNumber && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.mobileNumber}*
                        </AppText>
                      )}
                      <SubmitButton
                        title={'Add Now'}
                        loader={appleloader}
                        pressing={handleSubmit}
                        widthOf={'85%'}
                      />
                    </>
                  )}
                </Formik>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
Login.sharedElements = (route: any) => {
  const {item} = route.params;
  return [`item.${item?.id}.logo`];
};
export default Login;
