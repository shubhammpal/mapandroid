import React, { useCallback, useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import {
  AddIcon,
  CreatedIcon,
  MemberIcon,
  WhiteCalendarIcon,
} from '../../../assets/svgImg/SvgImg';
import { styles } from './styles';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import { useFocusEffect } from '@react-navigation/native';
import { requestGetGroupList } from '../../../services/api_Services';
import { AuthContext } from '../../../component/auth/AuthContext';
import { strings } from '../../../utils/strings';



const Group = ({ screen, navigation, data }: any) => {
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [getGrouplist, setGetGrouplist] = useState<any>();
  
  useFocusEffect(
    useCallback(() => {
      if (data) {
        Getgrouplist(data?.user_id);
      } else {
        Getgrouplist(userDetails?.id);
      }
    }, [data]),
  );
  const Getgrouplist = async (id: any) => {
    const apiData = { user_id: id, token: userToken, logged_in_user_id: userDetails?.id };
    try {
      await requestGetGroupList(apiData).then(async (res: any) => {
        if (res?.status == true) {
          setGetGrouplist(res?.payload);
        }
      });
    } catch (error) {
      console.log('PostList response: ', error);
    }
  };
  return (
    <ScrollView scrollEnabled={false}>
      <View style={[styles.container, { marginBottom: ms(8) }]}>
        {getGrouplist?.map((item, i) => (
          <TouchableOpacity key={item?.id} style={styles.mainContainer} onPress={() => {
            
            navigation.navigate(strings.GROUP_DETAILS, {
              id: item,
            })
          }
          }>
            <ImageBackground
              source={{
                uri: item?.group_image
                  ? item?.group_image
                  : 'https://images.unsplash.com/photo-1592766845554-f2b181f8ed7c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
              }}
              imageStyle={{borderRadius:10}}
              style={styles.item}>

            S
            </ImageBackground>
            <View style={styles.titleView}>
              <AppText
                size={18}
                color={COLORS.white}
                family="PoppinsMedium"
                numLines={2}>
                {item?.group_name}
              </AppText>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  width: '90%',
                  alignItems: 'center',
                }}>
                <CreatedIcon />
                <AppText
                  size={14}
                  color={COLORS.white}
                  family="PoppinsLight"
                  horizontal={10}>{`Created By ${item?.owner_name}`}</AppText>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  width: '90%',
                  alignItems: 'center',
                }}>
                <MemberIcon />
                <AppText
                  size={14}
                  color={COLORS.white}
                  family="PoppinsLight"
                  horizontal={10}>{`${item?.member_count} Members`}</AppText>
              </View>
              <View style={styles.viewConatiner}>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={styles.view}
                    onPress={() =>
                      navigation.navigate(strings.GROUP_DETAILS, {
                        id: item?.group_id,
                      })
                    }>
                    <AppText
                      size={14}
                      color={COLORS.whiteF7F7}
                      family="PoppinsMedium">
                      View
                    </AppText>
                  </TouchableOpacity>
                  {
                    userDetails?.id == item?.owner_id && (
                      screen == undefined && (
                        <TouchableOpacity
                          style={[styles.view, { marginHorizontal: 20 }]}
                          onPress={() =>
                            navigation.navigate(strings.CREATE_EVENT, {
                              id: item?.group_id,
                              data: 'data'
                            })
                          }>
                          <AppText
                            size={14}
                            color={COLORS.whiteF7F7}
                            family="PoppinsMedium">
                            Create Rides
                          </AppText>
                        </TouchableOpacity>
                      )
                    )
                  }

                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {
          userDetails?.id == data?.user_id && (

            <View style={{ marginHorizontal: ms(2) }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  backgroundColor: COLORS.blue,
                  height: 46,
                }} onPress={() => navigation.navigate(strings.CREATE_GROUP)}>
                <AddIcon />
                <AppText
                  size={18}
                  color={COLORS.white}
                  family="PoppinsSemiB"
                  horizontal={20}>
                  Create a Group
                </AppText>
              </TouchableOpacity>
            </View>
          )
        }
      </View>
    </ScrollView>
  );
};
export default Group;
