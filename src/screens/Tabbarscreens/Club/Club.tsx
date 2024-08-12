import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ImageBackground,
  FlatList,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from './styles';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import { MemberIcon, WhiteCalendarIcon } from '../../../assets/svgImg/SvgImg';
import { strings } from '../../../utils/strings';
import { formatDate } from '../../../style/typography';
import {
  requestGetAllClubList,
  requestGetClubList,
  requestJoinCommunity,
  requestNotificationSend,
} from '../../../services/api_Services';
import { AuthContext } from '../../../component/auth/AuthContext';
import emitter from '../../../component/Emitter/emitter';
import { useFocusEffect } from '@react-navigation/native';

const ClubScreen = ({ screen, navigation, data }: any) => {
  const [clubData, setClubData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [address, setAddress] = useState<any>();
  const [check, setCheck] = useState<any>(0);
  const { userToken, userDetails, location }: any = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      if (screen) {
        fetchAllClubs(1, location, true,);
      } else {
        if (data) {
          fetchClubs(1, data?.user_id, true);
        }
      }
    }, [screen, data, check])
  )
  
  const fetchClubs = async (page: number, id?: any, refreshing = false) => {
    const apiData = { userId: id, token: userToken, page: page };
    setLoading(true);
    try {
      const res = await requestGetClubList(apiData);
      const newData = res.data || [];
      setClubData(prevData =>
        refreshing ? newData : [...prevData, ...newData],
      );
      setHasMore(newData.length > 0);
      setPage(page);
    } catch (error) {
      console.log('Club list response: ', error);
    } finally {
      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  };
  const fetchAllClubs = async (
    page: number,
    location?: any,
    refreshing = false,
  ) => {
    const apiData = { location: location, token: userToken, page: page, userId: userDetails?.id };

    try {
      const res = await requestGetAllClubList(apiData);
      const newData = res?.payload || [];

      setClubData(prevData =>
        refreshing ? newData : [...prevData, ...newData],
      );
      setHasMore(newData.length > 0);
      setPage(page);
      setLoading(false);
    } catch (error) {
      console.log('Club Alllist response: ', error);
      setLoading(false);
    } finally {
      setLoading(false);
      if (refreshing) {
        setRefreshing(false);
      }
    }
  };
  const handleLoadMore = () => {
    if (screen) {
      fetchAllClubs(page + 1, address, true);
    } else {
      fetchClubs(page + 1, data?.user_id, true);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    if (screen) {
      fetchAllClubs(1, address, true);
    } else {
      fetchClubs(1, data?.user_id, true);
    }
  };

  const JoinComunityApi = async (clubId: any) => {
    if (!userDetails?.driving_licence) {
      const data = {
        heading: 'failed',
        message: 'Please update your bike registration and license details before joining a club.',
      };
      emitter.emit('alert', data);
      return;
    }
    const data: any = {
      userId: userDetails?.id,
      token: userToken,
      clubId: clubId,
      type: 'admin'
    };
    try {
      const res = await requestJoinCommunity(data);
      
      if (res?.status == true) {
        const datas = { heading: 'login', message: res?.message };
        emitter.emit('alert', datas);
      } else {
        const data = {
          heading: 'failed',
          message: res?.message,
        };
        emitter.emit('alert', data);
      }
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const NotificationSend = async (res: any) => {
    const responseData: any = {
      userId: res?.user_id,
      token: userToken,
      notificationType: "club",
      entityId: res?.id,
      message: `Requested to join your ride ` + `"` + `${res?.name}` + `"`,
      key: "CustomDataKey",
      is_accept: "true",
      accepted_by: userDetails?.id
    };
    
    
    try {
      const resData = await requestNotificationSend(responseData);
      
      const notiData = {
        heading: 'login',
        message: 'The request has been sent for this club.',
      };
      emitter.emit('alert', notiData);
     
      setCheck(check + 1)
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  const renderItem = ({ item, index }: any) => {
    let requestSentType
    
    if (item?.existingNotification && item?.existingNotification.length > 0) {
      requestSentType = item.existingNotification?.some(user => user?.accepted_by == userDetails?.id && item?.id == user?.entity_id);
    }
    return (
      <TouchableOpacity
        key={index}
        style={[styles.mainContainer, { marginTop: 40, marginHorizontal: 10 }]}
        onPress={() =>
          navigation.navigate(strings.CLUB_DETAILS, {
            data: item,
          })
        }>

        <ImageBackground
          source={
            item?.club_logo
              ? { uri: item?.club_logo }
              : require('../../../assets/img/noimage.png')
          }
          style={styles.item}>
         
        </ImageBackground>
        <View style={styles.titleView}>
          <AppText
            size={18}
            color={COLORS.white}
            family="PoppinsMedium"
            numLines={screen ? 1 : 2}>
            {item?.name}
          </AppText>
          {screen == undefined && (
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <WhiteCalendarIcon />
              <AppText
                size={14}
                color={COLORS.white}
                family="PoppinsLight"
                horizontal={10}>{`Joined ${formatDate(
                  item?.club_start_date,
                )}`}</AppText>
            </View>
          )}
          <View
            style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
            <MemberIcon />
            <AppText
              size={14}
              color={COLORS.white}
              family="PoppinsLight"
              horizontal={10}>{`${item?.member_count} Members`}</AppText>
          </View>
          {screen && (
            <View style={{ flexDirection: 'row', marginTop: 2 }}>
              <AppText
                size={12}
                color={COLORS.greyB0B0}
                family="PoppinsLight"
                numLines={2}>
                {item?.description}
              </AppText>
            </View>
          )}
          <View style={styles.photoContainer}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(strings.CLUB_DETAILS, {
                    data: item,
                  })
                }
                style={[
                  styles.view,
                  { backgroundColor: screen ? COLORS.blue : COLORS.black3030 },
                ]}>
                <AppText
                  size={14}
                  color={COLORS.whiteF7F7}
                  family="PoppinsMedium">
                  View
                </AppText>
              </TouchableOpacity>
              {userDetails?.id == item?.user_id && (
                <TouchableOpacity
                  style={[
                    styles.view,
                    {
                      backgroundColor: screen ? COLORS.blue : COLORS.black3030,
                      marginHorizontal: 20,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate(strings.CREATE_EVENT, {
                      data: 'data',
                      clubId: item?.id,
                    })
                  }>
                  <AppText
                    size={14}
                    color={COLORS.whiteF7F7}
                    family="PoppinsMedium">
                    Create Rides
                  </AppText>
                </TouchableOpacity>
              )}
              {screen &&
                (userDetails?.id == item?.requested_by ? (
                  null
                ) : (
                  <>
                    
                    {
                      item?.is_added == false && (
                        <>
                          {
                            requestSentType ? (
                              <TouchableOpacity
                                style={[styles.join, { marginHorizontal: 20 }]}
                                onPress={() => { }}>

                                <AppText
                                  size={14}
                                  color={COLORS.whiteF7F7}
                                  family="PoppinsMedium">
                                  Requested
                                </AppText>
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                style={[styles.join, { marginHorizontal: 20 }]}
                                onPress={() => NotificationSend(item)}>

                                <AppText
                                  size={14}
                                  color={COLORS.whiteF7F7}
                                  family="PoppinsMedium">
                                  Join Club
                                </AppText>
                              </TouchableOpacity>
                            )
                          }

                        </>
                      )
                    }

                  </>
                ))}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={{ marginBottom: 80 }}>

      <FlatList
        data={clubData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
       
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      
        nestedScrollEnabled
    
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={
          loading ? (
            <View style={{ marginVertical: 80 }}>
              <ActivityIndicator size={50} color={COLORS.white} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default ClubScreen;
