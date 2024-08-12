import React, { useCallback, useContext, useState } from 'react';
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Share,
} from 'react-native';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import {
  AddIcon,
  ThreeDotStraighIcon,
} from '../../../assets/svgImg/SvgImg';
import { styles } from './styles';
import { fonts } from '../../../utils/misc';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestMemberListbyClub, requestMemberListbyGroup } from '../../../services/api_Services';
import { strings } from '../../../utils/strings';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const MembersScreen = ({ navigation, id, data, clubId }: any) => {
  const [searchingText, setSearchingText] = useState<string>('');
  const [memberListData, setMemberListData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const { userToken, userDetails }: any = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      if (data && data?.registeredUsersDetails) {
        
        setMemberListData(data?.registeredUsersDetails);
      } else if (clubId) {
       
        getClubMemberListData(clubId?.id);
      } else {
        
        GetMemebertlistData();
      }
    }, [data, clubId, page, searchingText]),
  );

  const GetMemebertlistData = async () => {
    const apiData = { group_id: id?.group_id, token: userToken };
    try {
      const res = await requestMemberListbyGroup(apiData);
      if (res?.status == true) {
        const filteredData = res?.payload.filter((item) =>
          item.full_name?.toLowerCase().includes(searchingText.toLowerCase())
        );
        setMemberListData(filteredData);
      }
    } catch (error) {
      console.log('Member list response: ', error);
    }
  };
  const getClubMemberListData = async (id: any) => {
    
    const apiData = { clubId: id, token: userToken, search: searchingText, page: page };
    try {
      const res = await requestMemberListbyClub(apiData);
      if (res?.status == true) {
        const filteredData = res?.data.filter((item) =>
          item.full_name?.toLowerCase().includes(searchingText.toLowerCase())
        );
        setMemberListData(filteredData);
      }
    } catch (error) {
      console.log('Club member list response: ', error);
    }
  };


  const shareMessage = async () => {
    const getLink: any = await generateLink()
    const message = `Hi,\n${clubId?.name} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink}\n\n MYTRA`;

    try {
      const result = await Share.share({
        message: message,
        // You can also specify a URL or title here if needed
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // Shared successfully
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://mytraclub.page.link/muUh?productId=${clubId?.id}`,
        domainUriPrefix: 'https://mytraclub.page.link',
        android: {
          packageName: 'com.thebikerscompany',
        },
        ios: {
          appStoreId: '6526488238',
          bundleId: 'com.mytra',
        },
      }, dynamicLinks.ShortLinkType.DEFAULT)
      console.log('link:', link)
      return link
    } catch (error) {
      console.log('Generating Link Error:', error)
    }
  }

  const renderItem = ({ item }: any) => {
    const dataItem = data?.registeredUsersDetails ? item?.userDetails : item
    return (
      <View key={dataItem?.id ?? dataItem?.profile_picture} style={styles.mainContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.7}
            onPress={() => {
              navigation.push('Profile', {
                id: item?.userDetails?.id,
              });
              
            }}>
            <Image
              source={
                dataItem?.profile_picture == null
                  ? require('../../../assets/img/profilepic.jpg')
                  : { uri: dataItem?.profile_picture }
              }
              style={styles.item}
            />
          </TouchableOpacity>
          <View>
            <AppText
              size={16}
              color={COLORS.whiteFBFB}
              family={fonts.QuicksandSemi}
              horizontal={15}>
              {dataItem?.full_name}
            </AppText>
            <AppText
              size={13}
              color={COLORS.greyB0B0}
              family={fonts.QuicksandSemi}
              horizontal={15}>
              {dataItem?.role ? dataItem?.role[0].toUpperCase() + dataItem?.role.slice(1) : ''}
            </AppText>
          </View>
        </View>
       
      </View>
    )
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  
  return (
    <>
      <FlatList
        contentContainerStyle={styles.scrollview}
        data={memberListData}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        scrollEnabled={false}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={[styles.container, { marginBottom: 10, }]}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
              <AppText
                size={22}
                color={COLORS.white}
                family="PoppinsSemiB">{`${memberListData?.length} members`}</AppText>
              {
                id?.owner_id == userDetails?.id || data?.owner_id == userDetails?.id ? (
                  <TouchableOpacity
                    style={[styles.editICon]}
                    onPress={() => {
                      if (data && data.registeredUsers) {
                        navigation.navigate('AddEventMembersScreen', {
                          data: data
                        })
                      } else {
                        navigation.navigate(strings.INVITE_FRIENDS, {
                          groupId: id,
                          data: memberListData
                        })
                      }
                    }}>
                    <AddIcon />
                  </TouchableOpacity>
                ) : null
              }

              {
                clubId?.requested_by == userDetails?.id && (
                  <TouchableOpacity
                    style={[styles.editICon]}
                    onPress={() => {
                      navigation.navigate('ClubInvite', { item: clubId, data: memberListData })
                    }}>
                    <AddIcon />
                   
                  </TouchableOpacity>
                )
              }
            </View>

            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
              <View style={[styles.SearchBox]}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={searchingText}
                    style={styles.input}
                    placeholderTextColor={COLORS.grey92}
                    placeholder="Search"
                    onChangeText={text => {
                      setSearchingText(text);
                      setPage(1);  // Reset the page to 1 whenever a search is performed
                    }}
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>
          </View>
        }
      />
      <View style={{ height: 100 }} />
    </>
  );
};

export default MembersScreen;
