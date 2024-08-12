import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Modal,
  PermissionsAndroid,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { styles } from './styles';
import {
  ArrowBAckIcon,
  ArrowDownIcon,
  CalendarIcon,
  CamerasIcon,
  CopyIcon,
  CreateCameraIcon,
  PhotosIcon,
} from '../../../assets/svgImg/SvgImg';
import { COLORS, ms } from '../../../style';
import AppText from '../../../component/AppText/AppText';
import InputField from '../../../component/CustomInput/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import DropDownInputField from '../../../component/CustomInput/CustomDropdowm';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import DatePicker from 'react-native-date-picker';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestCreateEvent, requestGeteventlistDetails, requestUpdateEvent } from '../../../services/api_Services';
import { strings } from '../../../utils/strings';
import CreateSearchtextinput from './CreateSearchtextinput';
import { Formik } from 'formik';
import { createRideValidation, groupRideValidation } from '../../../utils/Schema';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useFocusEffect } from '@react-navigation/native';

const riderGroup = [
  {
    id: 1,
    title: 'Individual Led Ride',
  },

];

const bikeCC = [
  {
    id: 1,
    title: '300 + CC',
  },
  {
    id: 2,
    title: '600 + CC',
  },
  {
    id: 3,
    title: '10000 + CC',
  },
  {
    id: 4,
    title: 'Any',
  },
];
const ridingSkills = [
  {
    id: 1,
    title: 'Medium',
  },
  {
    id: 2,
    title: 'Intermediate',
  },
  {
    id: 3,
    title: 'High',
  },
];
const CreateEvent = ({ navigation, route }: any) => {
  const [rideTitle, setRideTitle] = React.useState<any>('');
  const [eventlistdetailsData, setEventlistdetailsData] = useState<any>();
  const [description, setDescription] = React.useState<any>('');
  const [startDate, setStartDate] = React.useState<any>();
  const [meetingTime, setMeetingTime] = React.useState<any>('');
  const [rideDuration, setRideDuration] = React.useState<any>('');
  const [address, setAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [totalkms, setTotalkms] = React.useState<any>('');
  const [startPoint, setStartPoint] = React.useState<any>('');
  const [startPointLink, setStartPointLink] = React.useState<any>('');
  const [destination, setDestination] = React.useState<any>('');
  const [destinationlink, setDestinationlink] = React.useState<any>('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const [isDropdownOpenRiding, setIsDropdownOpenRiding] = useState(false);
  const [selectedValueRiding, setSelectedValueRiding] = useState('');
  const [isDropdownOpenBike, setIsDropdownOpenBike] = useState(false);
  const [selectedValueBike, setSelectedValueBike] = useState('');
  const [whatsApp, setWhatsapp] = React.useState<any>('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(0);
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [pic, setPic] = useState<any>();
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [searchText, setSearchText] = useState<any>();
  const [startLocation, setStartLocation] = useState<any>(null);
  const [destinationLocation, setDestinationLocation] = useState<any>(null);
  const [addressDestination, setAddressDestination] = useState('');
  const [maxRiders, setMaxRiders] = React.useState<any>('');
  const [eventPrice, setEventPrice] = React.useState<any>('');

  const [endDate, setEndDate] = React.useState<any>();
  const today = new Date();
  const toDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const toTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());

  const toggleExpand = () => {
    setExpanded(!expanded);
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
        takePhotoFromCamera();
        setModalVisible(false);
      } else {
        console.log('Android camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      GetEventListDetails();
    }, []),
  );

  const GetEventListDetails = async () => {
    const apiData = { id: route?.params?.rideId, token: userToken };

    try {
      await requestGeteventlistDetails(apiData).then(async (res: any) => {
        if (res?.success == true) {
          setEventlistdetailsData(res?.data);
          setRideTitle(res?.data?.title)
          setDescription(res?.data?.description)
          setStartDate((res?.data?.startTime))
          setEndDate((res?.data?.endTime))
          setMeetingTime((res?.data?.reportingTime))
          setRideDuration(res?.data?.rideDuration)
          setTotalkms(res?.data?.totalKms)
          setStartLocation(res?.data?.fromLocation)
          setStartPoint(res?.data?.startingPoint)
          setStartPointLink(res?.data?.startPointMapLink)
          setDestination(res?.data?.destination)
          setWhatsapp(res?.data?.whatsAppLink)
          setPic(res?.data?.files[0]?.url)
          setDestinationLocation(res?.data?.toLocation)
          setAddress(res?.data?.fromLocation?.name)
          setAddressDestination(res?.data?.toLocation?.name)
          setMaxRiders(res?.data?.maxRiders)
          setSelectedValueRiding(res?.data?.ridingSkills)
          setSelectedValueBike(res?.data?.bikeCC)
          setSelectedValue(res?.data?.rideGroup)
        }
      });
    } catch (error) {
      console.log('Event deatils response: ', error);
    }
  };

  const takePhotoFromLibray = () => {
    setModalVisible(false)
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo'
      }).then(image => {
        setPic(image?.path);

      }).catch((error) => {
        console.log(error, 'from gallery')
      });
    }, 1000);
  };
  const takePhotoFromCamera = () => {
    setModalVisible(false)
    setTimeout(() => {
      ImagePicker.openCamera({
        cropping: false,
        mediaType: 'photo'
      }).then(image => {
        setPic(image?.path);
        setModalVisible(false)
      });
    }, 1000);
  };
  const CreateEvent = async (values: any) => {
    const groupId = route?.params?.id;
    const clubId = route?.params?.clubId;

    const commonData = {
      title: values?.rideTitle,
      token: userToken,
      description: description,
      startTime: values?.date,
      endTime: values?.endDate,
      reportingTime: values?.meetingTime,
      totalKms: values?.km,
      startingPoint: startPoint,
      destination: destination,
      // whatsAppLink: whatsApp,
      files: pic,
      fromLocation_name: address,
      fromLocation_lat: startLocation?.latitude,
      fromLocation_long: startLocation?.longitude,
      toLocation_name: addressDestination,
      toLocation_lat: destinationLocation?.latitude,
      toLocation_long: destinationLocation?.longitude,
      owner_id: userDetails?.id,
      rideDuration: rideDuration,
    };
    
    
    let data: any;
    if (clubId) {
      data = {
        ...commonData,
        clubId: clubId,
        ridingSkills: selectedValueRiding,
        bikeCC: selectedValueBike,
        rideGroup: selectedValue,
        maxRiders: maxRiders,
      };
    } else if (groupId) {
      data = {
        ...commonData,
        groupId: groupId,
      };
    }


    setLoader(true);
    if (route.params?.update) {
      try {
        await requestUpdateEvent(data, route?.params?.rideId).then(async (res: any) => {
          
          if (res?.success == true) {
            navigation.navigate(strings.EVENT_PAGE)
          }
          setLoader(false)
        });
      } catch (error) {
        console.log('Update group response: ', error);
        setLoader(false);
      }
    } else {
      try {
        const res = await requestCreateEvent(data);
        
        if (res?.status == true) {
          navigation.navigate(strings.PROFILE_SCREEN);
        }
        setLoader(false);
      } catch (error) {
        console.log('Create group response: ', error);
        setLoader(false);
      }
    }
  };

  const getDirections = (address: any) => {
   
    setAddress(address);
  };
  const getDirections1 = (address: any) => {
    
    setAddressDestination(address);

  };
  
  const startRef = useRef(null);
  const DestinationRef = useRef(null);
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <KeyboardAvoidingScrollView style={{ flex: 1, backgroundColor: COLORS.black }} keyboardShouldPersistTaps='always' keyboardDismissMode='interactive' bounces={false} showsVerticalScrollIndicator={false} automaticallyAdjustContentInsets contentInsetAdjustmentBehavior='automatic'>
      
        <View style={styles.container}>
          {/* <SafeAreaView /> */}
          <Formik
            validationSchema={route?.params?.clubId ? createRideValidation : groupRideValidation}
            initialValues={{
              rideTitle: rideTitle,
              date: startDate,
              endDate: endDate,
              km: totalkms.toString(),
              ridingSkills: selectedValueRiding,
              meetingTime: meetingTime,
              bikecc: selectedValueBike,
            }}
            enableReinitialize={true}
            onSubmit={async values => {
              if(!startLocation){
                Alert.alert("Please add start location")
                return
              }
              if(!destinationLocation){
                Alert.alert("Please add end location")
                return
              }
              
              CreateEvent(values);
            }}
          >
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
            }) => (
              <>
                <View style={styles.mainContainerCreate}>
                  <View style={styles.coverarrow}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <ArrowBAckIcon active={COLORS.white} />
                    </TouchableOpacity>
                    <AppText
                      size={20}
                      color={COLORS.white}
                      family="PoppinsSemiB"
                      horizontal={20}
                    >
                      {route.params?.update ? "Update ride" : "Create Ride"}
                    </AppText>
                  </View>

                  {pic ? (
                    <TouchableOpacity
                      style={{ marginVertical: 10, marginTop: 14 }}
                      onPress={() => setModalVisible(true)}
                    >
                      <Image
                        resizeMode="cover"
                        source={{ uri: pic }}
                        style={{ height: 200, borderRadius: 10 }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <View style={styles.eventPhotoContainer}>
                        <TouchableOpacity
                          style={styles.upload}
                          onPress={() => setModalVisible(true)}
                        >
                          <CreateCameraIcon />
                          <AppText
                            size={16}
                            color={COLORS.white}
                            family="PoppinsRegular"
                            horizontal={15}
                          >
                            Upload Image
                          </AppText>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                  <InputField
                    value={values.rideTitle}
                    setValue={handleChange('rideTitle')}
                    secure={false}
                    valid={'*'}
                    formikValue={touched.rideTitle}
                    formikError={errors.rideTitle}
                    name={'Ride title'}
                  />
                  {errors.rideTitle && touched.rideTitle && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right"
                    >
                      {errors.rideTitle}*
                    </AppText>
                  )}

                  <View style={[styles.expandableInputContainer, {}]}>
                    <TextInput
                      style={[
                        styles.multilineTextInput,
                        { paddingBottom: expanded ? 150 : 50 },
                      ]}
                      placeholder="Ride details"
                      value={description}
                      onChangeText={text => setDescription(text)}
                      placeholderTextColor="#666"
                      multiline={true}
                    />
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      setStatus(1);
                      setDate(new Date())
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <InputField
                      value={values.date}
                      valid={'*'}
                      setValue={handleChange('date')}
                      secure={false}
                      editable={false}
                      formikValue={touched.date}
                      formikError={errors.date}
                      icon={
                        <TouchableOpacity
                          onPress={() => {
                            setShow(true);
                            setStatus(1);
                          }}
                        >
                          <CalendarIcon />
                        </TouchableOpacity>
                      }
                      name={'Start date (DD/MM/YY)'}
                    />
                  </TouchableOpacity>
                  {errors.date && touched.date && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right"
                    >
                      {errors.date}*
                    </AppText>
                  )}
                  <DatePicker
                    modal
                    open={show}
                    date={date}
                    minimumDate={status === 1 || status === 2 ? toDate : toTime}
                    mode={status === 1 || status === 2 ? 'date' : 'datetime'}
                    onConfirm={date => {
                      setShow(false);
                      setDate(date);
                      let tempDate = new Date(date);
                      let formattedDate =
                        ('0' + tempDate.getDate()).slice(-2) +
                        '-' +
                        ('0' + (tempDate.getMonth() + 1)).slice(-2) +
                        '-' +
                        ('0' + tempDate.getFullYear()).slice(-4);
                      let hours = tempDate.getHours();
                      let minutes = tempDate.getMinutes();
                      let ampm = hours >= 12 ? 'PM' : 'AM';
                      hours = hours % 12;
                      hours = hours ? hours : 12;
                      let formattedTime =
                        ('0' + tempDate.getDate()).slice(-2) +
                        '-' +
                        ('0' + (tempDate.getMonth() + 1)).slice(-2) +
                        '-' +
                        ('0' + tempDate.getFullYear()).slice(-4) +
                        ' ' +
                        ('0' + tempDate.getHours()).slice(-2) +
                        ':' +
                        ('0' + tempDate.getMinutes()).slice(-2) +
                        ' ' +
                        ampm;
                      if (status === 1) {
                        setFieldValue('date', formattedDate);
                      } else if (status === 2) {
                        setFieldValue('endDate', formattedDate);
                      } else {
                        setFieldValue('meetingTime', formattedTime);
                      }
                    }}
                    onCancel={() => {
                      setShow(false);
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      setStatus(2);
                      setDate(new Date())
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <InputField
                      value={values.endDate}
                      valid={'*'}
                      setValue={handleChange('endDate')}
                      secure={false}
                      editable={false}
                      formikValue={touched.endDate}
                      formikError={errors.endDate}
                      icon={
                        <TouchableOpacity
                          onPress={() => {
                            setShow(true);
                            setStatus(2);
                          }}
                        >
                          <CalendarIcon />
                        </TouchableOpacity>
                      }
                      name={'End date (DD/MM/YY)'}
                    />
                  </TouchableOpacity>
                  {errors.endDate && touched.endDate && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right"
                    >
                      {errors.endDate}*
                    </AppText>
                  )}

                  <TouchableOpacity
                    onPress={() => {
                      setShow(true);
                      setStatus(3);
                      setDate(new Date())
                    }}
                  >
                    <InputField
                      value={values.meetingTime}
                      valid={'*'}
                      setValue={handleChange('meetingTime')}
                      editable={false}
                      secure={false}
                      formikValue={touched.meetingTime}
                      formikError={errors.meetingTime}
                      icon={
                        <TouchableOpacity
                          onPress={() => {
                            setShow(true);
                            setStatus(3);
                            setDate(new Date())
                          }}
                        >
                          <CalendarIcon />
                        </TouchableOpacity>
                      }
                      name={'Meeting time'}
                    />
                  </TouchableOpacity>
                  {errors.meetingTime && touched.meetingTime && (
                    <AppText
                      size={12}
                      color={COLORS.orangelight}
                      family="PoppinsMedium"
                      align="right"
                    >
                      {errors.meetingTime}*
                    </AppText>
                  )}

                  <View style={[styles.row, {}]}>
                    <View style={{ width: '48%' }}>
                      <InputField
                        value={rideDuration}
                        setValue={setRideDuration}
                        secure={false}
                        width={'100%'}
                        name={'Ride Duration'}
                      />
                      {errors.km && touched.km && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right"
                        >
                          {''}
                        </AppText>
                      )}
                    </View>
                    <View style={{ width: '48%' }}>
                      <InputField
                        value={values.km}
                        valid={'*'}
                        setValue={handleChange('km')}
                        secure={false}
                        width={'100%'}
                        formikValue={touched.km}
                        formikError={errors.km}
                        keyboard="numeric"
                        name={'Total kms'}
                      />
                      {errors.km && touched.km && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right"
                        >
                          {errors.km}*
                        </AppText>
                      )}
                    </View>
                  </View>

                  {route?.params?.clubId && (
                    <>
                      <View style={[{}]}>
                        <InputField
                          value={maxRiders?.toString()}
                          setValue={setMaxRiders}
                          secure={false}
                          keyboard="numeric"
                          width={'100%'}
                          name={'Max riders'}
                        />
                        <DropDownInputField
                          setValue={setSelectedValueBike}
                          value={values.bikecc}
                          setSelectedValue={(text) => {
                            setFieldValue('bikecc', text);
                            setSelectedValueBike(text)
                          }}
                          editable={false}
                          width={'100%'}
                          width2={'46%'}
                          right={true}
                          name={
                            <>
                              Bike cc
                              <Text style={{ color: COLORS.orangelight, fontSize: 16 }}>{'*'}</Text>
                            </>
                          }
                          secure={false}
                          data={bikeCC}
                          setIsDropdownOpen={setIsDropdownOpenBike}
                          isDropdownOpen={isDropdownOpenBike}
                        />
                        {errors.bikecc && touched.bikecc && (
                          <AppText
                            size={12}
                            color={COLORS.orangelight}
                            family="PoppinsMedium"
                            align="right"
                          >
                            {errors.bikecc}*
                          </AppText>
                        )}
                      </View>
                      <DropDownInputField
                        value={values.ridingSkills}
                        right={true}
                        setSelectedValue={(value) => {
                          setFieldValue('ridingSkills', value);
                          setSelectedValueRiding(value)
                        }}
                        editable={false}
                        name={
                          <>
                            Riding skills
                            <Text style={{ color: COLORS.orangelight, fontSize: 16 }}>{'*'}</Text>
                          </>
                        }
                        secure={false}
                        data={ridingSkills}
                        setIsDropdownOpen={setIsDropdownOpenRiding}
                        isDropdownOpen={isDropdownOpenRiding}
                      />
                      {errors.ridingSkills && touched.ridingSkills && (
                        <AppText
                          size={12}
                          color={COLORS.orangelight}
                          family="PoppinsMedium"
                          align="right"
                        >
                          {errors.ridingSkills}*
                        </AppText>
                      )}
                    </>
                  )}

                  {route.params?.update ? (
                    <CreateSearchtextinput
                      setSearchText={setSearchText}
                      getDirections={getDirections}
                      setStartLocation={setStartLocation}
                      locationStatus={1}
                      searchText={eventlistdetailsData?.fromLocation?.name}
                      ref={startRef}
                      placeholder={'Starting point location search'}
                    />
                  ) : (
                    <CreateSearchtextinput
                      setSearchText={setSearchText}
                      getDirections={getDirections}
                      setStartLocation={setStartLocation}
                      locationStatus={1}
                      data={route?.params?.data}
                      searchText={searchText}
                      placeholder={'Starting point location search'}
                    />
                  )}

                  <InputField
                    value={startPoint}
                    setValue={setStartPoint}
                    secure={false}
                    name={'Starting landmark'}
                  />
                  
                  {route.params?.update ? (
                    <CreateSearchtextinput
                      setSearchText={setSearchText}
                      getDirections1={getDirections1}
                      setDestinationLocation={setDestinationLocation}
                      locationStatus={2}
                      searchText={eventlistdetailsData?.toLocation?.name}
                      placeholder={'Destination point location search'}
                    />
                  ) : (
                    <CreateSearchtextinput
                      setSearchText={setSearchText}
                      getDirections1={getDirections1}
                      setDestinationLocation={setDestinationLocation}
                      locationStatus={2}
                      data={route?.params?.data}
                      searchText={searchText}
                      placeholder={'Destination point location search'}
                    />
                  )}

                  <InputField
                    value={destination}
                    setValue={setDestination}
                    secure={false}
                    name={'Destination landmark'}
                  />

                  <View style={styles.button}>
                    <SubmitButton
                      title={route.params?.update ? "Update Ride" : 'Add Ride'}
                      colorChange={'#153FB2'}
                      pressing={() => {
                       
                        handleSubmit();
                      }}
                      widthOf={'98%'}
                      loader={loader}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>

        </View>
        {/* <View style={{ height: 15 }} /> */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => {
                  if (Platform.OS == 'ios') {
                    takePhotoFromCamera()
                  } else {

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
        {/* </KeyboardAvoidingView> */}
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default CreateEvent;
