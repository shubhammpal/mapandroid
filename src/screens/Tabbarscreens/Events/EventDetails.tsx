import { View, Text, ImageBackground, TouchableOpacity, ActivityIndicator, Modal, Image, SafeAreaView, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { styles } from './styles';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import {
  ArrowBAckIcon,
  BikeCCIcon,
  CalendarIcon,
  CommunityIcon,
  CrossRedIcon,
  DestinationICon,
  EditIcon,
  MaxRidersIcon,
  RideDurationIcon,
  RidesrouteIcon,
  RidingskillsIcon,
  StartlocationICon,
  StarttimeIcon,
  ThreeDotStraighIcon,
  TotalkmsIcon,
} from '../../../assets/svgImg/SvgImg';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import { formatDate, formatTime } from '../../../style/typography';
import { strings } from '../../../utils/strings';
import { AuthContext } from '../../../component/auth/AuthContext';
import { fonts } from '../../../utils/misc';
import { getAttendenceList, getEventRideData, requestGeteventlistDetails } from '../../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';

const EventDetails = ({ navigation, data }: any) => {
  
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [saveModal, setSaveModal] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [dataa, setData] = React.useState<any>(data);
  const [checked, setChecked] = useState(false);
  const [rideDetails, setRideDetails] = useState<any[]>([]);
  const [checkedUsers, setCheckedUsers] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      GetEventListDetails();
    }, [data]),
  );
  const GetEventListDetails = async () => {
    const apiData = { id: data?._id, token: userToken };
    try {
      await requestGeteventlistDetails(apiData).then(async (res: any) => {
        
        if (res?.success == true) {
          setData(res?.data);
        }
      });
    } catch (error) {
      console.log('Event deatils response: ', error);
    }
  };
  useEffect(() => {
    getEventRideDetails()
  }, [data])

  const toggleChecked = (userId: any) => {
    let updatedUsers = [...checkedUsers];
    if (updatedUsers.includes(userId)) {
      updatedUsers = updatedUsers.filter(id => id != userId);
    } else {
      updatedUsers.push(userId);
    }
    setCheckedUsers(updatedUsers);
    handleNext()
  };
  const getEventRideDetails = async () => {

    if (dataa) {
      const apiData = { token: userToken, eventId: data?._id };
      try {
        await getEventRideData(apiData).then(async (res: any) => {

          if (res.length > 0) {
            setRideDetails(res)
          }
        });
      } catch (error) {
        console.log('PostList response: ', error);
      }
    }
  };

  const getEventRideDetailsCheck = async () => {

    if (data) {
      const apiData = { token: userToken, eventId: data?._id };
      try {
        const res: any = await getEventRideData(apiData);
        if (res.length > 0) {
          setRideDetails(res)
          return res
        }
      } catch (error) {
        console.log('PostList response: ', error);
        return undefined
      }
    }
    return undefined
  };
  const handleNext = () => {
    // Perform API call for each checked user
    checkedUsers.forEach(userId => {
      const action = checkedUsers.includes(userId) ? 'add' : 'remove';
      
      fetch('http://3.111.234.55:6004/group/events/mark-attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'connect.sid=s%3AD5Ev5KQwLGU4fMCZZ9Li9f8P8KffqywP.1h7rbwvgTYonk6uKEPlTFnZgFSGNhXMFicuYfb0dUow; connect.sid=s%3AD9SUaFCgc0q07QVRJmpqPLeC7t2U74ED.%2BYav4PG3J1zWlNlKsVRKYpulJkaAddVs9zgTWQlSeME',
        },
        body: JSON.stringify({
          eventId: dataa?._id,
          userId: userId,
          action: action,
        }),
      })
        .then(response => response.json())
        .then(data => {
          // Handle API response
          
        })
        .catch(error => {
          // Handle error
          console.error('Error:', error);
        });
    });

    // Close the modal after processing
    // setSaveModal(false);
  };

  const getAttendenceListRider = async () => {
    if (data) {
      const apiData = { token: userToken, eventId: data?._id };
      try {
        const res: any = await getAttendenceList(apiData);

        if (res?.event) {
          const check = res?.event?.attendance.some(
            (rider: any) => rider?.userId?.id == userDetails?.id
          );
          return check;
        }

        return false; // Ensure a return value even if res?.event is undefined
      } catch (error) {
        console.log('attendence response: ', error);
        return false;
      }
    }
    return false;
  };
  return (
    <View>
      {
        !dataa ? (
          <View style={{ marginTop: ms(8) }}>
            <ActivityIndicator size={50} color={COLORS.white} />
          </View>
        ) : (
          <>
            <ImageBackground
              source={dataa?.files?.length != 0 ? { uri: dataa?.files[0]?.url } : require('../../../assets/img/noimage.png')}

              style={{
                height: 250,
              }}>
             
              {
                dataa?.owner_id == userDetails?.id && (
                  <View style={styles.editContainer}>
                    <TouchableOpacity style={[styles.price, { paddingVertical: 10 }]} onPress={() => {
                      if (dataa?.groupId) {
                        navigation.navigate(strings.CREATE_EVENT, {
                          id: dataa?.groupId,
                          data: 'data',
                          update: 'update',
                          rideId: dataa?._id
                        })
                      } else {
                        navigation.navigate(strings.CREATE_EVENT, {
                          data: 'data',
                          clubId: dataa?.clubId,
                          update: 'update',
                          rideId: dataa?._id
                        })
                      }

                    }}>
                      <EditIcon />
                      <AppText
                        size={14}
                        horizontal={10}
                        color={COLORS.whiteF7F7}
                        family="PoppinsMedium">
                        {'Edit Ride'}
                      </AppText>
                    </TouchableOpacity>
                  </View>
                )
              }
            </ImageBackground>
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
              {(dataa?.startingPoint && dataa?.destination) ?
                <AppText size={24} color={COLORS.white} family="PoppinsMedium">
                  {`${dataa?.startingPoint} to ${dataa?.destination}`}
                </AppText>
                : null}

              <View style={{ marginTop: 5 }} />
              <AppText size={14} color={COLORS.white} family="PoppinsLight">
                {dataa?.description}
              </AppText>
              <View style={[styles.row2, {}]}>
                <View style={styles.rowData}>
                  <View style={styles.iconContainer}>
                    <CalendarIcon active={'#7AA2CE'} />
                  </View>
                  <View style={{ marginHorizontal: 20, width: '65%' }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      Start Date
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {(dataa?.startTime)}
                    </AppText>
                  </View>
                </View>
                <View style={styles.rowData}>
                  <View style={styles.iconContainer}>
                    <CalendarIcon active={'#7AA2CE'} />
                  </View>
                  <View style={{ marginHorizontal: 20, width: '65%' }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      End Date
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {(dataa?.endTime)}
                    </AppText>
                  </View>
                </View>

              </View>
              <View style={[styles.row2, {}]}>
                <View style={styles.rowData}>
                  <View style={styles.iconContainer}>
                    <RideDurationIcon />
                  </View>
                  <View style={{ marginHorizontal: 20 }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      Ride Duration
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {dataa?.rideDuration}
                    </AppText>
                  </View>
                </View>
                <View style={styles.rowData}>
                  <View style={styles.iconContainer}>
                    <TotalkmsIcon />
                  </View>
                  <View style={{ marginHorizontal: 20 }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      Total KM
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {dataa?.totalKms} Km
                    </AppText>
                  </View>
                </View>
              </View>
              {
                dataa?.clubId == "undefined" || dataa?.clubId == null ? null : (
                  <>
                    <View style={[styles.row2, {}]}>
                      <View style={styles.rowData}>
                        <View style={styles.iconContainer}>
                          <MaxRidersIcon />
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                          <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                            Max Riders
                          </AppText>
                          <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                            {dataa?.maxRiders}
                          </AppText>
                        </View>
                      </View>
                      <View style={styles.rowData}>
                        <View style={styles.iconContainer}>
                          <RidingskillsIcon />
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                          <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                            Riding Skills
                          </AppText>
                          <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                            {dataa?.ridingSkills}
                          </AppText>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.row2, {}]}>
                      <View style={styles.rowData}>
                        <View style={styles.iconContainer}>
                          <BikeCCIcon />
                        </View>
                        <View style={{ marginHorizontal: 20 }}>
                          <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                            Bike CC
                          </AppText>
                          <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                            {dataa?.bikeCC}
                          </AppText>
                        </View>
                      </View>
                      <View style={styles.rowData}>
                        <View style={styles.iconContainer}>
                          <StarttimeIcon />
                        </View>
                        <View style={{ marginHorizontal: 20, width: '78%' }}>
                          <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                            Start Time
                          </AppText>
                          <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                            {(dataa?.reportingTime)}
                          </AppText>
                        </View>
                      </View>
                   
                    </View>
                  </>
                )
              }
              <View style={{ marginVertical: 15 }}>
                <AppText size={20} color={COLORS.white} family="PoppinsMedium">
                  Ride Map
                </AppText>
                <View style={styles.row2}>
                  <View style={styles.iconContainer}>
                    <StartlocationICon />
                  </View>
                  <View style={{ marginHorizontal: 15, width: '88%' }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      Start
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {dataa?.fromLocation?.name}
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {dataa?.startPointMapLink}
                    </AppText>
                  </View>
                </View>
                <View style={styles.row2}>
                  <View style={styles.iconContainer}>
                    <DestinationICon />
                  </View>
                  <View style={{ marginHorizontal: 15, width: '88%' }}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      Destination
                    </AppText>
                    <AppText size={14} color={COLORS.semiAAA} family="PoppinsRegular">
                      {dataa?.toLocation?.name}
                    </AppText>
                  </View>
                </View>
                <View style={[styles.row2, { alignItems: "center" }]}>
                  <View style={styles.iconContainer}>
                    <RidesrouteIcon />
                  </View>
                  <TouchableOpacity style={{ marginHorizontal: 15, width: '88%' }} onPress={() => navigation.navigate('ViewRideMap', { data: dataa })}>
                    <AppText size={15} color={COLORS.white} family="PoppinsMedium">
                      View Full Map
                    </AppText>
                  </TouchableOpacity>
                </View>
              </View>
              
              {
                dataa?.owner_id == userDetails?.id ? (
                  <View style={styles.button}>
                    <SubmitButton
                      title={rideDetails.length == 0 ? 'Start Ride' : "View ride"}
                      pressing={async () => {
                        const rideData: any = await getEventRideDetailsCheck()
                        if (rideData) {

                          if (rideData[0]?.stop == 1) {
                            Alert.alert("ride is already completed")
                          } else {
                            navigation.navigate('Attendance', { data: dataa })
                          }
                        } else {
                          navigation.navigate('Attendance', { data: dataa })
                        }
                        
                      }}
                    
                      widthOf={'98%'}
                      height={46}
                    />
                  </View>
                ) : (
                  <View style={styles.button}>
                    <SubmitButton
                      title={rideDetails.length == 0 ? rideDetails[0]?.stop == 1 ? "View" : "View ride" : 'View ride'}
                      pressing={async () => {
                        setLoader(true)
                        const rideData: any = await getEventRideDetailsCheck()
                        
                        if (rideData) {
                          const attendanceCheck = await getAttendenceListRider()
                          if (attendanceCheck == false) {
                            Alert.alert("The ride has already started, and you're late. Please contact the admin regarding this.")
                          } else {
                            if (rideData[0]?.stop == 1) {
                              Alert.alert("Ride is already completed")
                            } else {
                              navigation.navigate("GroupRide", dataa)
                            }
                          }

                        } else {
                          Alert.alert("Ride is not started yet")
                        }
                        setLoader(false)
                      }}
                      widthOf={'98%'}
                      height={46}
                      loader={loader}
                    />
                  </View>
                )
              }
            </View>

          </>
        )
      }
      
    </View>
  );
};

export default EventDetails;
