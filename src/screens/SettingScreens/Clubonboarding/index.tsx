import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {styles} from './styles';
import InputField from '../../../component/CustomInput/InputField';
import {
  ArrowBAckIcon,
  CalendarIcon,
  CameraIcon,
  CamerasIcon,
  PhotosIcon,
} from '../../../assets/svgImg/SvgImg';
import DatePicker from 'react-native-date-picker';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import emitter from '../../../component/Emitter/emitter';
import {AuthContext} from '../../../component/auth/AuthContext';
import {requestClubrequest} from '../../../services/api_Services';
import AppText from '../../../component/AppText/AppText';
import {COLORS} from '../../../style';
import {Formik} from 'formik';
import {ClubonboardingSchema} from '../../../utils/Schema';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';

const Clubonboarding = ({navigation}: any) => {
  const [startDate, setStartDate] = React.useState<any>('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const {userDetails, userToken}: any = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setloader] = useState<boolean>(false);
  const [pic, setPic] = useState<any>();
  const [imageData, setImageData] = useState<any>();

  const Clubonboardingapi = async (values: any) => {
    const data: any = {
      userId: userDetails?.id,
      clubName: values?.clubName,
      description: values?.description,
      registrationNumber: values?.registrationNumber,
      headquarterName: values?.headerquatername,
      startDate: values?.startDate,
      chatRestriction: 'Yes',
      token: userToken,
      club_logo:values?.image,
      email:values?.email,
      address: values?.address,
    };
    try {
      await requestClubrequest(data).then(async (res: any) => {
        if (res?.status == true) {
          const data = {heading: 'login', message: res?.message};
          emitter.emit('alert', data);
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
      console.log('Login response: ', error);
      setloader(false);
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
        takePhotoFromCamera(imageData);
        setModalVisible(false);
      } else {
        console.log('Android camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
    }
  };

  const takePhotoFromLibray = (imageData: any) => {
    const {imageValue} = imageData;
    setTimeout(() => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        setPic(image?.path);
        imageValue('image', `${image.path}`);
      });
    }, 1000);
  };
  const takePhotoFromCamera = (imageData: any) => {
    const {imageValue} = imageData;
    
    setTimeout(() => {
      ImagePicker.openCamera({
        mediaType: 'photo',
        cropping: false,
      }).then(image => {
        setPic(image?.path);
        imageValue('image', `${image.path}`);
      });
    }, 500);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.scrollview}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={{}}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingVertical: 15, paddingRight: 15}}>
              <ArrowBAckIcon />
            </TouchableOpacity>
            <AppText
              size={20}
              color={COLORS.white}
              family="PoppinsSemiB"
              horizontal={10}>
              Club onboarding
            </AppText>
          </View>
          <View style={styles.sharedView}>
            <Image
              source={require('../../../assets/img/bikelogo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <View>
            <Formik
              initialValues={{
                clubName: '',
                description: '',
                registrationNumber: '',
                headerquatername: '',
                startDate: '',
                image: '',
                email:'',
                address:'',
              }}
              validationSchema={ClubonboardingSchema}
              onSubmit={values => {
                
                setloader(true)
                Clubonboardingapi(values)
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                touched,
                errors,
              }) => (
                <>
                  <View style={styles.imageView}>
                    <TouchableOpacity
                      style={styles.profileConatiner}
                      onPress={() => {
                        setModalVisible(true);
                        setImageData({imageValue: setFieldValue});
                      }}>
                      <Image
                        style={styles.image}
                        source={
                          pic
                            ? {uri: pic}
                            : require('../../../assets/img/profilepic.jpg')
                        }
                      />
                      <View style={styles.editContainer}>
                        <CameraIcon />
                      </View>
                    </TouchableOpacity>
                  </View>
                  {errors.image && touched.image && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right">
                      {errors.image}*
                    </AppText>
                  )}
                  <View style={styles.textinputConatiner}>
                    <InputField
                      value={values.clubName}
                      setValue={handleChange('clubName')}
                      iconLeft={null}
                      formikValue={touched.clubName}
                      formikError={errors.clubName}
                      secure={false}
                      valid={'*'}
                      name={'Club Name'}
                    />
                    {errors.clubName && touched.clubName && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.clubName}*
                      </AppText>
                    )}
                    <InputField
                      value={values.email}
                      setValue={handleChange('email')}
                      iconLeft={null}
                      formikValue={touched.email}
                      formikError={errors.email}
                      secure={false}
                      keyboard='email-address'
                      valid={'*'}
                      name={'Email'}
                    />
                    {errors.email && touched.email && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.email}*
                      </AppText>
                    )}
                    <InputField
                      value={values.description}
                      setValue={handleChange('description')}
                      iconLeft={null}
                      formikValue={touched.description}
                      formikError={errors.description}
                      secure={false}
                      valid={'*'}
                      name={'Description'}
                    />
                    {errors.description && touched.description && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.description}*
                      </AppText>
                    )}
                    <InputField
                      value={values.registrationNumber}
                      setValue={handleChange('registrationNumber')}
                      iconLeft={null}
                      formikValue={touched.registrationNumber}
                      formikError={errors.registrationNumber}
                      secure={false}
                      valid={'*'}
                      name={'Registration Number'}
                    />
                    {errors.registrationNumber &&
                      touched.registrationNumber && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right">
                          {errors.registrationNumber}*
                        </AppText>
                      )}
                    <InputField
                      value={values.headerquatername}
                      setValue={handleChange('headerquatername')}
                      iconLeft={null}
                      valid={'*'}
                      formikValue={touched.headerquatername}
                      formikError={errors.headerquatername}
                      secure={false}
                      name={'Headquarter Name'}
                    />
                    {errors.headerquatername && touched.headerquatername && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.headerquatername}*
                      </AppText>
                    )}

                    <TouchableOpacity onPress={() => setShow(true)}>
                      <InputField
                        value={values.startDate}
                        valid={'*'}
                        formikValue={touched.startDate}
                        formikError={errors.startDate}
                        setValue={handleChange('startDate')}
                        secure={false}
                        editable={false}
                        icon={
                          <TouchableOpacity
                            onPress={() => {
                              setShow(true);
                            }}>
                            <CalendarIcon />
                          </TouchableOpacity>
                        }
                        keyboard="numeric"
                        name={'Start Date'}
                      />
                    </TouchableOpacity>
                    {errors.startDate && touched.startDate && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.startDate}*
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
                        let tempDate = new Date(date);
                        let formattedDate =
                          ('0' + tempDate.getDate()).slice(-2) +
                          '-' +
                          ('0' + (tempDate.getMonth() + 1)).slice(-2) +
                          '-' +
                          tempDate.getFullYear();
                          setStartDate(formattedDate);
                          setFieldValue('startDate', formattedDate);
                      }}
                      onCancel={() => {
                        setShow(false);
                      }}
                    />

                    
                    <InputField
                      value={values.address}
                      setValue={handleChange('address')}
                      iconLeft={null}
                      valid={'*'}
                      formikValue={touched.address}
                      formikError={errors.address}
                      secure={false}
                      name={'Address'}
                    />
                    {errors.address && touched.address && (
                      <AppText
                        size={12}
                        color={COLORS.orangelight}
                        family="PoppinsMedium"
                        align="right">
                        {errors.address}*
                      </AppText>
                    )}
                  </View>
                  <SubmitButton
                    title={'Submit'}
                    widthOf={'90%'}
                    pressing={handleSubmit}
                    loader={loader}
                  />
                </>
              )}
            </Formik>
          </View>
        </View>
        <View style={{marginBottom: 20}} />
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if(Platform.OS == 'android'){
                    getCamera();
                  }else {
                    setModalVisible(false)
                    setTimeout(() => {
                      
                      takePhotoFromCamera(imageData)
                    }, 1000);
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
                  takePhotoFromLibray(imageData);
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
                style={{alignItems: 'flex-end'}}>
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

export default Clubonboarding;
