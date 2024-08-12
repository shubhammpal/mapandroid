import React, { useCallback, useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import {
  AddIcon,
  ClubIcon,
  CommunityIcon,
  CommunitysIcon,
  EventCalendar,
  EventLocation,
  EventsIcon,
  FilterIcon,
  GroupHomeIcon,
  MemberIcon,
  WhiteCalendarIcon,
} from '../../../assets/svgImg/SvgImg';
import { styles } from './styles';
import { strings } from '../../../utils/strings';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestAllEventList, requestClubEventList, requestEventList, requestEventUserRegister, requestNotificationSend } from '../../../services/api_Services';
import { formatStartTime, startISTCheckTime } from '../../../style/typography';
import emitter from '../../../component/Emitter/emitter';
import FastImage from 'react-native-fast-image';

const EventsScreen = ({ navigation, members, id, clubId, screen }: any) => {
  const [searchingText, setSearchingText] = useState<any>('');
  const [eventlistData, setEventlistData] = useState<any>();
  const [check, setCheck] = useState<any>(0);
  const [requestAll, setRequestAll] = useState<any>([]);
  const { userToken, userDetails }: any = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      if (screen) {
        GetAllEventList();
      } else {
        if (clubId) {
          GetClubList(clubId?.id)
        } else {
          GetEventList();
        }
      }
    }, [clubId, screen, check]),
  );
  const GetEventList = async () => {
    const apiData = { id: id?.group_id, token: userToken };
    try {
      await requestEventList(apiData).then(async (res: any) => {
        
        if (res?.success == true) {
          setEventlistData(res?.data);
          setRequestAll(res?.existingNotification)
        }
      });
    } catch (error) {
      console.log('Event list response: ', error);
    }
  };
  const GetAllEventList = async () => {
    const apiData = { token: userToken, user_id: userDetails?.id };
    try {
      await requestAllEventList(apiData).then(async (res: any) => {
       
        if (res?.status == true) {
          setEventlistData(res?.payload);

        }
      });
    } catch (error) {
      console.log('Event list response: ', error);
    }
  };

  const GetClubList = async (id: any) => {
    const apiData = { id: id, token: userToken };
    try {
      await requestClubEventList(apiData).then(async (res: any) => {
        
        if (res?.success == true) {
          setEventlistData(res?.data);
        }
      });
    } catch (error) {
      console.log('Event list response: ', error);
    }
  };
  const EventUserRegister = async (id: any) => {
    const apiData = { userId: [userDetails?.id], token: userToken, id: id };
    if (!userDetails?.driving_licence) {
      const data = {
        heading: 'failed',
        message: 'Please update your bike registration and license details before joining a ride.',
      };
      emitter.emit('alert', data);
      return;
    }
    try {
      await requestEventUserRegister(apiData)
        .then(async (res: any) => {
          
          if (res?.message == 'Users registered successfully') {
            const data = {
              heading: 'login',
              message: res?.message,
            };
            emitter.emit('alert', data);
            navigation.navigate(strings.EVENT_PAGE, {
              data: id
            })
          } else {
            const data = {
              heading: 'failed',
              message: res?.message,
            };
            emitter.emit('alert', data);
          }
        })
    } catch (error) {
      console.log("Event user register response: ", error);
    }
  }

  const NotificationSend = async (res: any) => {
    const responseData: any = {
      userId: res?.owner_id,
      token: userToken,
      notificationType: "events",
      entityId: res?._id,
      message: `Requested to join your ride ` + `"` + `${res?.title}` + `"`,
      key: "CustomDataKey",
      is_accept: "true",
      accepted_by: userDetails?.id
    };
    try {
      const resData = await requestNotificationSend(responseData);
      console.log(resData)
      const notiData = {
        heading: 'login',
        message: 'The request has been sent for this ride.',
      };
      emitter.emit('alert', notiData);
      
      setCheck(check + 1)
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };
  return (
    <ScrollView scrollEnabled={false} >
      <View style={[styles.container, { marginBottom: ms(8) }]}>
        {members && (
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            <View style={[styles.SearchBox]}>
              <View style={styles.inputBox}>
                <TextInput
                  value={searchingText}
                  style={styles.input}
                  placeholderTextColor={COLORS.grey92}
                  placeholder="Search Ride"
                  onChangeText={text => setSearchingText(text)}
                  keyboardType="default"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.filterICon}>
              <FilterIcon />
            </TouchableOpacity>
          </View>
        )}
        <View style={[styles.container, { marginBottom: 10 }]}>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <AppText
              size={22}
              color={COLORS.white}
              family="PoppinsSemiB">{`${eventlistData?.length ? eventlistData?.length : 0} rides`}</AppText>
            {
              id?.owner_id == userDetails?.id ? (
                <TouchableOpacity onPress={() => {
                  navigation.navigate(strings.CREATE_EVENT, {
                    id: id?.group_id,
                    data: 'data'
                  })
                }}
                  style={[styles.editICon1]}
                >
                  <AddIcon />
                </TouchableOpacity>
              ) : null
            }
          </View>

        </View>
        {eventlistData?.map((item, i) => {

          let idExists
          let requestSentType
          if (item?.registeredUsers[0]?.user_name) {
            idExists = item?.registeredUsers?.some(user => user.userId == userDetails?.id);
          } else {
            idExists = item?.registeredUsers?.some(user => user?.userId == userDetails?.id);
          }
          
          
          if (item?.existingNotification && item?.existingNotification.length > 0) {
            requestSentType = item.existingNotification?.some(user => user?.accepted_by == userDetails?.id && item?._id == user?.entity_id);
            
          } 

          
          return (
            <TouchableOpacity
              key={item?.id}
              style={styles.mainContainer}
              onPress={() => navigation.navigate(strings.EVENT_PAGE, {
                data: item?._id
              })}>
              <FastImage
                source={item?.files?.length != 0 ? { uri: item?.files[0]?.url } : require('../../../assets/img/noimage.png')}
                style={styles.item}>
               
              </FastImage>
              <View style={styles.titleView}>
                <AppText
                  size={18}
                  color={COLORS.white}
                  family="PoppinsMedium"
                  numLines={2}>
                  {`${item?.title}`}
                </AppText>
                {item?.clubName != null &&
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <ClubIcon />
                    <AppText
                      size={12}
                      color={COLORS.greyD9}
                      family="PoppinsMedium"
                      horizontal={10}
                      numLines={1}>
                      {`Club: ${item?.clubName}`}
                    </AppText>
                  </View>
                }
                {item?.groupName != null &&
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <GroupHomeIcon />
                    <AppText
                      size={12}
                      color={COLORS.greyD9}
                      family="PoppinsMedium"
                      horizontal={10}
                      numLines={1}>
                      {`Group: ${item?.groupName}`}
                    </AppText>
                  </View>
                }

                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                  <EventCalendar />
                  <AppText
                    size={12}
                    color={COLORS.greyD9}
                    family="PoppinsMedium"
                    horizontal={10}
                    numLines={1}>

                    {/* {formatStartTime(item?.startTime)} */}
                    {startISTCheckTime(item?.reportingTime)}
                  </AppText>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                  <EventLocation />
                  <AppText
                    size={12}
                    color={COLORS.greyD9}
                    family="PoppinsMedium"
                    horizontal={10}
                    numLines={1}>
                    {item?.fromLocation?.name}
                  </AppText>
                </View>

                <View style={styles.photoContainer}>
                  {
                    item?.owner_id == userDetails?.id ? (
                      <View
                        style={{
                          alignItems: 'flex-start',
                        }}>
                        <TouchableOpacity style={[styles.join, { backgroundColor: COLORS.black3030, }]} onPress={() => navigation.navigate(strings.EVENT_PAGE, {
                          data: item?._id
                        })}>
                          <AppText
                            size={14}
                            color={COLORS.whiteF7F7}
                            family="PoppinsMedium">
                            View
                          </AppText>
                        </TouchableOpacity>

                      </View>
                    ) : (
                      <>
                        {
                          idExists == true ? (<View
                            style={{
                              alignItems: 'flex-start',
                            }}>
                            <TouchableOpacity style={[styles.join, { backgroundColor: COLORS.black3030, }]} onPress={() =>
                              navigation.navigate(strings.EVENT_PAGE, {
                                data: item?._id
                              })
                            }>
                              <AppText
                                size={14}
                                color={COLORS.whiteF7F7}
                                family="PoppinsMedium">
                                View
                              </AppText>
                            </TouchableOpacity>

                          </View>) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {
                                requestSentType ? (
                                  <TouchableOpacity style={[styles.join, { backgroundColor: COLORS.blue, }]} onPress={() => {}}>
                                    <AppText
                                      size={14}
                                      color={COLORS.whiteF7F7}
                                      family="PoppinsMedium">
                                      Requested
                                    </AppText>
                                  </TouchableOpacity>
                                ) : (
                                  <TouchableOpacity style={[styles.join, { backgroundColor: COLORS.blue, }]} onPress={() => NotificationSend(item)}>
                                    <AppText
                                      size={14}
                                      color={COLORS.whiteF7F7}
                                      family="PoppinsMedium">
                                      Join
                                    </AppText>
                                  </TouchableOpacity>
                                )
                              }

                            </View>
                          )
                        }
                      </>
                    )
                  }

                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
export default EventsScreen;