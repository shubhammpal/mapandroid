

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
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import {
  ArrowBAckIcon,
  ArrowDownIcon,
  CalendarIcon,
  CamerasIcon,
  CopyIcon,
  CreateCameraIcon,
  EditIcon,
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
import { useFocusEffect } from '@react-navigation/native';
import { formatStartDate, formattedDate, formattedTime } from '../../../style/typography';
import CreateSearchtextinput from './CreateSearchtextinput';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
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

const UpdateEvent = ({ navigation, route }: any) => {
  const [eventlistdetailsData, setEventlistdetailsData] = useState<any>();
  const [rideTitle, setRideTitle] = React.useState<any>('');
  const [description, setDescription] = React.useState<any>('');
  const [startDate, setStartDate] = React.useState<any>();
  const [endDate, setEndDate] = React.useState<any>();
  const [meetingTime, setMeetingTime] = React.useState<any>('');
  const [rideDuration, setRideDuration] = React.useState<any>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [loader1, setLoader1] = useState<boolean>(false);
  const [totalkms, setTotalkms] = React.useState<number>();
  const [startPoint, setStartPoint] = React.useState<any>('');
  const [startPointLink, setStartPointLink] = React.useState<any>('');
  const [destination, setDestination] = React.useState<any>('');
  const [whatsApp, setWhatsapp] = React.useState<any>('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [pic, setPic] = useState<any>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const [isDropdownOpenRiding, setIsDropdownOpenRiding] = useState(false);
  const [selectedValueRiding, setSelectedValueRiding] = useState('');
  const [isDropdownOpenBike, setIsDropdownOpenBike] = useState(false);
  const [selectedValueBike, setSelectedValueBike] = useState('');
  const startRef = useRef(null);
  const DestinationRef = useRef(null);
  const [maxRiders, setMaxRiders] = React.useState<any>('');
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [searchText, setSearchText] = useState<any>();
  const [startLocation, setStartLocation] = useState<any>(null);
  const [destinationLocation, setDestinationLocation] = useState<any>(null);
  const [addressDestination, setAddressDestination] = useState('');
  const [address, setAddress] = useState('');
  const today = new Date();
  const toDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const toTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes());


  useFocusEffect(
    useCallback(() => {
      GetEventListDetails();
    }, []),
  );
  const GetEventListDetails = async () => {
    const apiData = { id: route?.params?.id, token: userToken };
    setLoader1(true);
    try {
      await requestGeteventlistDetails(apiData).then(async (res: any) => {
        if (res?.success == true) {
          
          setEventlistdetailsData(res?.data);
          setRideTitle(res?.data?.title)
          setDescription(res?.data?.description)
        
          setStartDate((res?.data?.startTime))
          setEndDate((res?.data?.startTime))
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
        setLoader1(false);
      });
    } catch (error) {
      setLoader1(false);
      console.log('Event deatils response: ', error);
    }
  };

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

  const takePhotoFromLibray = () => {
    setTimeout(() => {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo'
      }).then(image => {
        setPic(image?.path);
      });
    }, 500);
  };
  const takePhotoFromCamera = () => {
    setTimeout(() => {
      ImagePicker.openCamera({
        cropping: false,
        mediaType: 'photo'
      }).then(image => {
        setPic(image?.path);
      });
    }, 500);
  };
  
  const UpdateEvent = async () => {
    const commonData = {
      title: rideTitle,
      token: userToken,
      description: description,
      startTime: startDate,
      endTime: endDate,
      reportingTime: meetingTime,
      totalKms: totalkms,
      startingPoint: startPoint,
      destination: destination,
      whatsAppLink: whatsApp,
      files: pic,
      id: route?.params?.id,
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
    if (eventlistdetailsData?.clubId != null) {
      
      data = {
        ...commonData,
        clubId: eventlistdetailsData?.clubId,
        ridingSkills: selectedValueRiding,
        bikeCC: selectedValueBike,
        rideGroup: selectedValue,
        maxRiders: maxRiders,
      };
    } else if (eventlistdetailsData?.groupId) {
      
      data = {
        ...commonData,
        groupId: eventlistdetailsData?.groupId,
      };
    }

    
   
    setLoader(true);
    try {
      await requestUpdateEvent(data).then(async (res: any) => {
        
        if (res?.success == true) {
          navigation.navigate(strings.EVENT_PAGE)
        }
        setLoader(false)
      });
    } catch (error) {
      console.log('Update group response: ', error);
      setLoader(false);
    }
  };

  const getDirections = (address: any) => {

    setAddress(address);

  };
  const getDirections1 = (address: any) => {
    setAddressDestination(address);

  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <KeyboardAvoidingScrollView style={{ flex: 1 }}>
        
          <View style={styles.container}>
            <View style={styles.mainContainerCreate}>
              <View style={styles.coverarrow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowBAckIcon active={COLORS.white} />
                </TouchableOpacity>
                <AppText
                  size={20}
                  color={COLORS.white}
                  family="PoppinsSemiB"
                  horizontal={20}>
                  Update Ride
                </AppText>
              </View>

              {pic ? (
                <View>
                  <Image
                    resizeMode="cover"
                    source={{ uri: pic }}
                    style={{ height: 200, borderRadius: 10, marginVertical: ms(2) }}
                  />
                  <View style={[styles.editICon]}>
                    <TouchableOpacity
                      style={{ flexDirection: 'row' }}
                      onPress={() => setModalVisible(true)}>
                      <EditIcon />
                      <AppText
                        size={16}
                        color={COLORS.white}
                        family="PoppinsRegular"
                        horizontal={5}>
                        Edit Image
                      </AppText>
                    </TouchableOpacity>
                  </View>
                </View>

              ) : (
                <View style={styles.eventPhotoContainer}>
                  <TouchableOpacity
                    style={styles.upload}
                    onPress={() => setModalVisible(true)}>
                    <CreateCameraIcon />
                    <AppText
                      size={16}
                      color={COLORS.white}
                      family="PoppinsRegular"
                      horizontal={15}>
                      Upload Image
                    </AppText>
                  </TouchableOpacity>
                </View>
              )}
              {
                loader1 ? (
                  <View style={{ alignItems: 'center', justifyContent: "center" }}>
                    <ActivityIndicator size={50} color={COLORS.white} />
                  </View>
                ) : (
                  <>

                    <InputField
                      value={rideTitle}
                      setValue={(text: any) => setRideTitle(text)}
                      secure={false}
                      name={'Ride Title'}
                    />
                    <View style={[styles.expandableInputContainer, {}]}>
                      <TextInput
                        style={[
                          styles.multilineTextInput,
                          ,
                          { paddingBottom: expanded ? 150 : 50 },
                        ]}
                        placeholder="Ride Details"
                        value={description}
                        onChangeText={text => setDescription(text)}
                        placeholderTextColor="#666"
                       
                        multiline={true}
                      />

                      
                    </View>


                    <TouchableOpacity style={{ marginTop: 5 }}
                      onPress={() => {
                        setShow(true);
                        setStatus(1);
                      }}>
                      <InputField
                        value={startDate}
                        setValue={(text: any) => setStartDate(text)}
                        secure={false}
                        editable={false}
                        icon={
                          <TouchableOpacity
                            onPress={() => {
                              setShow(true);
                              setStatus(1);
                            }}>
                            <CalendarIcon />
                          </TouchableOpacity>
                        }
                        name={'Start date (DD/MM/YY)'}
                      />
                    </TouchableOpacity>

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
                          ('0' + tempDate.getFullYear()).slice(-2);

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
                          ('0' + tempDate.getFullYear()).slice(-2) +
                          ' ' +
                          ('0' + tempDate.getHours()).slice(-2) +
                          ':' +
                          ('0' + tempDate.getMinutes()).slice(-2) +
                          ' ' +
                          ampm;
                        if (status === 1) {
                          setStartDate(formattedDate)
                        } else if (status === 2) {
                          setEndDate(formattedDate);
                        } else {
                          setMeetingTime(formattedTime);
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
                      }}
                    >
                      <InputField
                        value={startDate}
                        setValue={(text: any) => setStartDate(text)}
                        secure={false}
                        editable={false}
                        icon={
                          <TouchableOpacity
                            onPress={() => {
                              setShow(true);
                              setStatus(2);
                            }}>
                            <CalendarIcon />
                          </TouchableOpacity>
                        }
                        name={'End date (DD/MM/YY)'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setShow(true);
                        setStatus(2);
                      }}
                    >
                      
                      <InputField
                        value={meetingTime}
                        setValue={(text: any) => setMeetingTime(text)}
                        secure={false}
                        icon={
                          <TouchableOpacity
                            onPress={() => {
                              setShow(true);
                              setStatus(3);
                            }}>
                            <CalendarIcon />
                          </TouchableOpacity>
                        }
                        name={'Meeting Time'}
                      />
                    </TouchableOpacity>

                    <View style={styles.row}>
                      <InputField
                        value={rideDuration?.toString()}
                        setValue={(text: any) => setRideDuration(text)}
                        secure={false}
                        width={'48%'}
                        name={'Ride Duration'}
                      />
                      <InputField
                        value={totalkms?.toString()}
                        setValue={(text: any) => setTotalkms(text)}
                        secure={false}
                        width={'48%'}
                        keyboard='numeric'
                        name={'Total Kms'}
                      />
                    </View>
                    {
                      eventlistdetailsData?.clubId == "undefined" || eventlistdetailsData?.clubId == null ? null : (
                        <>
                          <View style={{}}>
                            <InputField
                              value={maxRiders?.toString()}
                              setValue={(text: any) => setMaxRiders(text)}
                              secure={false}
                              keyboard='numeric'
                              width={'100%'}
                              name={'Max Riders'}
                            />
                            <DropDownInputField
                              value={selectedValueBike}
                              setValue={(text: any) => setSelectedValueBike(text)}
                              editable={false}
                              width={'100%'}
                              width2={'46%'}
                              right={true}
                              setSelectedValue={setSelectedValueBike}
                              name={'Bike CC'}
                              secure={false}
                              data={bikeCC}
                              setIsDropdownOpen={setIsDropdownOpenBike}
                              isDropdownOpen={isDropdownOpenBike}
                            />


                          </View>
                          <DropDownInputField
                            value={selectedValueRiding}
                            right={true}
                            setSelectedValue={setSelectedValueRiding}
                            setValue={(text: any) => setSelectedValueRiding(text)}
                            editable={false}

                            name={'Riding Skills'}
                            secure={false}
                            data={ridingSkills}
                            setIsDropdownOpen={setIsDropdownOpenRiding}
                            isDropdownOpen={isDropdownOpenRiding}
                          />
                         


                        </>
                      )
                    }


                    <CreateSearchtextinput setSearchText={setSearchText}
                      getDirections={getDirections}
                      setStartLocation={setStartLocation}
                      locationStatus={1}
                      searchText={eventlistdetailsData?.fromLocation?.name} ref={startRef} placeholder={'Starting point location search'} />

                    <InputField
                      value={startPoint}
                      setValue={(text: any) => setStartPoint(text)}
                      secure={false}
                      name={'Starting Point'}
                    />
                    <CreateSearchtextinput setSearchText={setSearchText}
                      getDirections1={getDirections1}
                      setDestinationLocation={setDestinationLocation}
                      locationStatus={2}
                      searchText={eventlistdetailsData?.toLocation?.name} ref={DestinationRef} placeholder={'Destination point location search'} />
                    <InputField
                      value={destination}
                      setValue={(text: any) => setDestination(text)}
                      secure={false}
                      name={'Destination'}
                      numberOfLines={1}
                    />


                   
                    <View style={styles.button}>
                      <SubmitButton
                        title={'Update Ride'}
                        colorChange={'#153FB2'}
                        pressing={() => UpdateEvent()}
                        widthOf={'98%'}
                        loader={loader}
                      />
                    </View>
                  </>
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
        {/* </KeyboardAvoidingView> */}
      </KeyboardAvoidingScrollView>
    </View>
  );
};

export default UpdateEvent;
