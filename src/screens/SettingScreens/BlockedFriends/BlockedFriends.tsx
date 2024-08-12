import React, { useCallback, useContext, useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Share,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Text
} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import { styles } from '../styles';
import { fonts } from '../../../utils/misc';
import { COLORS, ms } from '../../../style';
import { AddIcon, ArrowBAckIcon, LinkIcon } from '../../../assets/svgImg/SvgImg';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../component/auth/AuthContext';
import { blockedGetUserList, requestFollowUser, requestGetUserList, requestUnblock, } from '../../../services/api_Services';
import emitter from '../../../component/Emitter/emitter';
import { strings } from '../../../utils/strings';

const data = [
  {
    id: 1,
    full_name: 'Devid',
    time: '3 H 45 M',
    distance: '124 K.M',
    image: require('../../../assets/img/MalshejGhat.png'),
    desc: 'Riding from Pune to Malshej Ghat by bike is an enchanting experience, filled with scenic beauty and thrilling curves. The journey offers lush green landscapes, especially vibrant during the monsoon season. As you ascend, the cool mountain breeze and occasional waterfalls add to the charm. The roads are well-maintained, making for a smooth and enjoyable ride. The breathtaking views from the top of the Ghat are the perfect reward for the adventure.'
  },
  {
    id: 2,
    full_name: 'Morris',
    time: '3 H 36 M',
    distance: '121 K.M',
    image: require('../../../assets/img/punemahabaleshwar.png'),
    desc: 'The ride from Pune to Mahabaleshwar by bike is a delightful journey through picturesque landscapes. The route winds through rolling hills and lush greenery, offering stunning views at every turn. The cool breeze and the aroma of fresh mountain air make the ride refreshing. Well-paved roads ensure a smooth ride, enhancing the overall experience. As you approach Mahabaleshwar, the breathtaking vistas of valleys and forests provide a perfect climax to the trip.'
  },
]

const BlockedFriends = ({ navigation, route }: any) => {
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [getuserData, setGetuserData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);


  useEffect(() => {
    GetUserList()
  }, [])

  const GetUserList = async () => {
    const apiData = { token: userToken, user_id: userDetails?.id };
    setLoader(true);
    try {
      await blockedGetUserList(apiData).then(async (res: any) => {
        if (res?.status == true) {
          setGetuserData(res?.blockList);
          setLoader(false);

        }
      });
    } catch (error) {
      console.log('GET user list response: ', error);
      setLoader(false);
    }
  };



  const UblockPeopleApi = async (otherUserId: string) => {
    if (!userDetails?.id || !userToken) return;

    const data = {
      follower_id: userDetails.id,
      token: userToken,
      following_id: otherUserId,
      action: 'unfollow',
    };
    const updatedUserData = getuserData.filter((user: any) => user.id !== otherUserId);
    setGetuserData(updatedUserData);

    try {
      const res = await requestFollowUser(data);
      if (res) {
        const data = {
          heading: 'Notification',
          message: res?.message,
        };
        emitter.emit('alert', data);
      } else {
        console.log('Failed to unblock user');
      }
    } catch (error) {
      console.log('Error during unblock request:', error);
      // Revert state update if API call fails
      setGetuserData(getuserData);
    }
  };



  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ScrollView style={styles.scrollContainer} bounces={false}>
        <SafeAreaView />
        <View style={[styles.container, { marginHorizontal: 8 }]}>
          <View style={{}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 15, paddingRight: 15 }}>
                  <ArrowBAckIcon />
                </TouchableOpacity>
                <AppText
                  size={20}
                  color={COLORS.white}
                  family="PoppinsSemiB"
                  horizontal={10}>
                  {strings.BLOCKED_USERS}
                </AppText>
              </View>

            </View>


            <View style={{ marginVertical: 10 }}>

              {loader ? (
                <View style={{ marginTop: ms(5) }}>
                  <ActivityIndicator size={50} color={COLORS.white} />
                </View>
              ) : (
                getuserData.length > 0 ?
                  <FlatList
                    data={getuserData}
                    bounces={false}
                    style={{ paddingBottom: ms(10) }}
                    contentContainerStyle={{
                      flexGrow: 1, paddingBottom: 30,
                      paddingTop: 16, width: '98%', alignSelf: 'center'
                    }}
                    renderItem={(item: any, index: any) => {

                      return (
                        <TouchableOpacity
                          key={item?.id}
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            marginVertical: 5,
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            borderBottomColor: COLORS.black3030,
                            paddingBottom: 20,
                          }}
                          onPress={() => { }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={
                                item?.item?.profile_picture
                                  ? { uri: item?.item?.profile_picture }
                                  : require('../../../assets/img/profilepic.jpg')
                              }
                              style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50,
                              }}
                            />
                            <View>
                              <AppText
                                size={16}
                                color={COLORS.whiteFBFB}
                                family={fonts.QuicksandSemi}
                                horizontal={15}>
                                {item?.item?.full_name}
                              </AppText>
                              <AppText
                                size={16}
                                color={COLORS.greyB0B0}
                                family={fonts.QuicksandSemi}
                                horizontal={15}>
                                {item?.item?.user_name}
                              </AppText>
                            </View>
                          </View>
                          <TouchableOpacity
                            onPress={() => { UblockPeopleApi(item?.item?.id) }}
                            style={[
                              {
                                backgroundColor: COLORS.blue,
                                paddingVertical: 4,
                                paddingHorizontal: 12,
                                borderRadius: 4,
                              },
                            ]}>
                            <AppText
                              size={16}
                              color={COLORS.white}
                              family={fonts.QuicksandBold}>
                              {'Unblock'}
                            </AppText>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      )
                    }}
                  />
                  :
                  <View style={{ alignItems: 'center', marginTop: ms(15) }}>
                    <AppText
                      size={25}
                      color={COLORS.white}
                      family="PoppinsSemiB"
                      horizontal={10}>
                      {'No user Found'}
                    </AppText>
                  </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default BlockedFriends
  ;
