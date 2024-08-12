import {
  View,
  Text,
  Image,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { styles } from './styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { COLORS, ms } from '../../style';
import AppText from '../../component/AppText/AppText';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {  requestLoginOTP, requestVerifyOtp } from '../../services/api_Services';
import emitter from '../../component/Emitter/emitter';
import { AuthContext } from '../../component/auth/AuthContext';
import { setShipTokenAsyncStorage, setUserData } from '../../services/auth_helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

type VerifyOtpProps = {
  navigation: any;
  route: any;
};

const CELL_COUNT = 4;
const OTPScreen = ({ navigation, route }: VerifyOtpProps) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };
  const [loader, setLoader] = useState(false);
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [time, setTime] = useState(60);
  const [resendOtp, setResendOtp] = useState(false);
  const [sending, setSending] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { userDetails, setUserDetails }: any = useContext(AuthContext);


  useEffect(() => {
    let interval = setInterval(() => {
      setTime(lastTimerCount => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setResendOtp(true);
        }
        return lastTimerCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sending]);

  const handleShakeError = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
    Vibration.vibrate([100, 200, 300, 400]);
  };
  const { loginPress }: any = useContext(AuthContext);

  const VerifyOtpPress = async (apiData: any, resetForm: any) => {
    try {
      await requestVerifyOtp(apiData).then(async (res: any) => {

        if (res?.success == true) {
          await setUserData(res?.payload);
          loginPress(res);
          const data = { heading: 'login', message: res?.message };
          emitter.emit('alert', data);
        } else {
          const data = {
            heading: 'failed',
            message: res?.message ? res?.message : 'Something went wrong',
          };
          emitter.emit('alert', data);
        }
        setLoader(false);
      });
    } catch (error) {
      const data = { heading: 'failed', message: 'Something went wrong' };
      emitter.emit('alert', data);
      console.log('OTP response: ', error);
      setLoader(false);
    }
  };
  


  const resendOtpPress = async () => {
    const apiId = { mobile: route?.params?.mobile };
    await requestLoginOTP(apiId)
      .then(async res => {
      
        setLoader(false);
        setValue('')
      })
      .catch(error => {
        console.log('Login Response >>>>  ', error);
        setLoader(false);
      });
  };

  useEffect(() => {
    setTime(60)
    setResendOtp(false);
    setSending(true);
  }, [])
  



  // ----------U{DATE----------}
  const UpdatedVerifyOtpPress = async (apiData: any, formattedMobileNumber: any, resetForm: any) => {
    const api = { mobile: formattedMobileNumber, otp: apiData }
    setLoader(true)
    try {
      await requestVerifyOtp(api)
        .then(async (res: any) => {
          
          if (res?.success == true) {
            await setUserData(res?.payload)
            setUserDetails(res?.payload);
            const data = { heading: "login", message: 'Mobile number update successful' }
            emitter.emit("alert", data)
            navigation.goBack()
          }
          setValue('')
          setLoader(false)
          resetForm()
        })
    } catch (error) {
      const data = { heading: "failed", message: "Something went wrong" }
      emitter.emit("alert", data)
      console.log("OTP response: ", error);
      setLoader(false)
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollsContainer}
        scrollEnabled={false}
        ref={scrollViewRef}>
        <Image
          source={require('../../assets/img/BikeSplash.png')}
          style={{ alignSelf: 'flex-end' }}
        />
      </ScrollView>
      <View style={styles.aboveContainer}>
        <View style={styles.innerView}>
          <View style={styles.logoView}>
            <Image
              source={require('../../assets/img/bikelogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={{ alignSelf: 'center', marginTop: ms(8) }}>
            <AppText
              size={14}
              color={COLORS.mediumgray}
              family="PoppinsLight"
              align="center">
              OTP sent to +91 {route?.params?.mobile}
            </AppText>
          </View>
          <Formik
            validationSchema={Yup.object().shape({
              otp: Yup.string()
                .trim()
                .required('OTP is required')
                .matches(/^\d+$/, 'OTP must contain only digits')
                .length(CELL_COUNT, `Enter ${CELL_COUNT} digits`),
            })}
            enableReinitialize={true}
            initialValues={{ otp: '' }}
            onSubmit={async (values, { resetForm }) => {
              setLoader(true);
              const fcmToken = await AsyncStorage.getItem('fcmToken');
              const apiData = { mobile: route?.params?.mobile, otp: values.otp, device_token: fcmToken};
              // const apiData = { mobile: route?.params?.mobile, otp: values.otp};
              const getData = { otp: values.otp, mobile: route?.params?.mobile }
              {
                route?.params?.page == 'login' ?
                VerifyOtpPress(apiData,resetForm)
                :
                UpdatedVerifyOtpPress(values.otp, route?.params?.mobile, resetForm)
              }
              
              // Generate_ship()
            }}>
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
            }) => (
              <>
                <View>
                  <CodeField
                    ref={ref}
                    {...props}
                    value={values.otp}
                    onChangeText={text => {
                      if (text.length === CELL_COUNT) {
                        handleChange('otp')(text);
                        Keyboard.dismiss();
                        if (errors.otp) {
                          handleShakeError();
                        }
                      } else {
                        handleChange('otp')(text);
                      }
                    }}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    testID="my-code-input"
                    renderCell={({ index, symbol, isFocused }) => (
                      <View
                        key={index}
                        style={[
                          styles.cell,
                          isFocused && styles.focusCell,
                          errors.otp && styles.errorCell,
                        ]}>
                        <Text
                          style={styles.cellText}
                          onLayout={getCellOnLayoutHandler(index)}>
                          {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                      </View>
                    )}
                  />
                  {errors.otp && (
                    <View style={styles.otperror}>
                      <AppText
                        color={COLORS.fadeRrrorRed}
                        size={10}
                        family="PoppinsMedium"
                        align="right">
                        {errors.otp}*
                      </AppText>
                    </View>
                  )}
                </View>
                {resendOtp ? (
                  <View>
                    <View style={styles.bottomSmall}>
                      <AppText
                        color={COLORS.white}
                        size={14}
                        family="PoppinsRegular">
                        Didn’t receive code?
                      </AppText>
                    </View>
                  </View>
                ) : (
                  <View style={styles.bottomSmall}>
                    <Text style={styles.resendCode}>
                      {'Resend :'}{' '}
                      <Text style={styles.resendCode}>{`00:${time}`}</Text>{' '}
                      {'seconds'}
                    </Text>
                  </View>
                )}
                <View style={{ width: '75%' }}>
                  <SubmitButton
                    title={resendOtp ? 'Resend OTP' : (route?.params?.page == 'login' ? 'Submit' : 'Update')}
                    pressing={() => {
                      if (errors.otp || values.otp.length === 0) {
                        handleShakeError();
                      } else if (!resendOtp) {
                        handleSubmit();
                        scrollToBottom();
                      } else {
                        setTime(60);
                        setResendOtp(false);
                        setSending(true);
                        resendOtpPress();
                      }
                    }}
                    colorChange={'#2B4050'}
                    colortext={COLORS.white}
                    widthOf={'100%'}
                    loader={loader}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default OTPScreen;
