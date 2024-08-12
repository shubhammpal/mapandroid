import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  Share,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { AuthContext } from '../../../component/auth/AuthContext';
import { styles } from './styles';
import { ArrowBAckIcon, LinkIcon } from '../../../assets/svgImg/SvgImg';
import AppText from '../../../component/AppText/AppText';
import { COLORS, ms } from '../../../style';
import { fonts } from '../../../utils/misc';
import { requestEventUserRegister, requestGetTagUserList, requestGetUserList, requestJoinClubAdd, requestMemberListbyClub, requestMemberListbyGroup, requestNotificationSend } from '../../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import FastImage from 'react-native-fast-image';
import SendSMS from 'react-native-sms';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import emitter from '../../../component/Emitter/emitter';

const AddEventMembersScreen = ({ navigation, route }: any) => {
  const [searchingText, setSearchingText] = useState<string>('');
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [getuserData, setGetuserData] = useState<any[]>([]);
  const [filteredUserData, setFilteredUserData] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectedUsersContact, setSelectedUsersContact] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any[]>([]);
  const [filteredContactData, setFilteredContactData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [selectedGlobalUser, setSelectedGlobalUser] = useState<any[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const getCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Access contacts',
          message: 'Can we access your contacts?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        contactList();
      } else {
        console.log('Android camera permission denied');
      }
    } catch (error) {
      console.error('Error requesting Android camera permission:', error);
    }
  };

  const contactList = () => {
    Contacts.getAll()
      .then((contacts) => {
        setContactData(contacts);
        setFilteredContactData(contacts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.data?.clubId) {
        getClubMemberListData(route?.params?.data?.clubId);
      } else {
        getClubMemberListData();
        if (Platform.OS === 'android') {
          getCamera();
        } else {
          contactList();
        }
      }
    }, [])
  );

  const getClubMemberListData = async (id?: any) => {
    try {
      let apiData;
      if (id) {
        apiData = { clubId: id, token: userToken, search: '' };
        const res = await requestMemberListbyClub(apiData);
        if (res?.status == true) {
          setGetuserData(res?.data || []);
          setFilteredUserData(res?.data || []);
        }
      } else {
        apiData = { token: userToken, user_id: userDetails?.id };
        const res = await requestGetUserList(apiData);
        if (res?.status == true) {
          setGetuserData(res?.payload || []);
          setFilteredUserData(res?.payload || []);
        }
      }
    } catch (error) {
      console.log('Club member list response: ', error);
    }
  };

  const GetMemebertlistData = async () => {
    const apiData = { group_id: route?.params?.data?.groupId, token: userToken };
    try {
      const res = await requestMemberListbyGroup(apiData);
      if (res?.status == true) {
        setGetuserData(res?.payload || []);
        setFilteredUserData(res?.payload || []);
      }
    } catch (error) {
      console.log('Member list response: ', error);
    }
  };

  const toggleSelectUser = (userId: any) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id: any) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
    NotificationSend(userId);
  };

  const toggleSelectUserContact = (phoneNumber: string) => {
    setSelectedUsersContact((prevSelected) => {
      if (prevSelected.includes(phoneNumber)) {
        return prevSelected.filter((number: any) => number !== phoneNumber);
      } else {
        return [...prevSelected, phoneNumber];
      }
    });
  };

  const EventUserRegister = async () => {
    const userIds = selectedUsers.map(userId => userId);
    const apiData = { id: route?.params?.data?._id, token: userToken, userId: userIds };
    if (selectedUsersContact.length > 0) {
      sendBulkMessage();
    }
    navigation.goBack();
  };

  const sendBulkMessage = async () => {
    const getLink: any = await generateLink();
    const message = `Hi,\n${route?.params?.data?.title} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} \n\nMYTRA `;
    SendSMS.send({
      body: message,
      recipients: selectedUsersContact,
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    });
  };

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://mytraclub.page.link/GMQ7?rideMemberAdd=${route?.params?.data?._id}`,
        domainUriPrefix: 'https://mytraclub.page.link',
        social: {
          title: `${route?.params?.data?.title}`,
          descriptionText: 'mytra.club',
          imageUrl: `${route?.params?.data?.files[0]?.url ? route?.params?.data?.files[0]?.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'}`
        },
        android: {
          packageName: 'com.thebikerscompany',
        },
        ios: {
          appStoreId: '6526488238',
          bundleId: 'com.mytra',
        },
      }, dynamicLinks.ShortLinkType.DEFAULT);
      return link;
    } catch (error) {
      console.log('Generating Link Error:', error);
    }
  };

  useEffect(() => {
    if (searchingText) {
      const lowercasedFilter = searchingText.toLowerCase();
      const filteredUserList = getuserData?.filter(item =>
        item?.full_name?.toLowerCase().includes(lowercasedFilter)
      ).filter(Boolean); // Filter out any undefined or null values
      setFilteredUserData(filteredUserList);

      const filteredContactList = contactData?.filter(item =>
        (item?.givenName?.toLowerCase().includes(lowercasedFilter) ||
          item?.familyName?.toLowerCase().includes(lowercasedFilter) ||
          item?.phoneNumbers?.some(phone => phone.number.includes(lowercasedFilter)))
      ).filter(Boolean); // Filter out any undefined or null values
      setFilteredContactData(filteredContactList);
    } else {
      setFilteredUserData(getuserData);
      setFilteredContactData(contactData);
    }
  }, [searchingText, getuserData, contactData]);

  const shareMessage = async () => {
    const getLink: any = await generateLink();
    const message = `Hi,\n${route?.params?.data?.title} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} \n\nMYTRA `;
    try {
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleTextChange = (newText: string) => {
    setSearchingText(newText);
    Getsearchdata(newText);
  };

  const Getsearchdata = async (text: string) => {
    const apiData = { token: userToken, searchText: text };
    setLoader(true);
    try {
      const res = await requestGetTagUserList(apiData);
      if (res?.status) {
        const result = res?.payload;
        if (text.length > 0) {
          setSearchData(result);
        } else {
          setSearchData([]);
        }
      }
    } catch (error) {
      console.error('GET user list response: ', error);
    } finally {
      setLoader(false);
    }
  };

  const toggleSelectUserGlobal = (userId: any) => {
    setSelectedGlobalUser((prevSelected: any) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id: any) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
    NotificationSend(userId);
  };

  const NotificationSend = async (res: any) => {
    const resData: any = {
      userId: res,
      token: userToken,
      notificationType: "events",
      entityId: route?.params?.data?._id,
      message: "New event created!",
      key: "CustomDataKey",
      is_accept:"true"
    };
    try {
      const res = await requestNotificationSend(resData);
      console.log(res)
    } catch (error) {
      console.log('Notification send response: ', error);
    }
  };

  // Pagination for contacts and users
  const paginatedContacts = filteredContactData.slice(0, currentPage * itemsPerPage);
  const paginatedUsers = filteredUserData.slice(0, currentPage * itemsPerPage);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <ScrollView style={styles.addcontainer} bounces={false}>
        <SafeAreaView />
        <View style={styles.addcontainer}>
          <View style={{ marginHorizontal: ms(2), marginVertical: ms(4) }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowBAckIcon />
                </TouchableOpacity>
                <AppText
                  size={20}
                  color={COLORS.white}
                  family="PoppinsSemiB"
                  horizontal={20}>
                  Add Member
                </AppText>
              </View>
              <TouchableOpacity
                style={[styles.addButton]}
                onPress={() => EventUserRegister()}>
                <AppText
                  size={16}
                  color={COLORS.white}
                  align="center"
                  horizontal={3}
                  family={fonts.QuicksandBold}>
                  {'Done'}
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 20 }}>
              <View style={[styles.SearchBox]}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={searchingText}
                    style={styles.input2}
                    placeholderTextColor={COLORS.grey92}
                    placeholder="Search"
                    onChangeText={text => handleTextChange(text)}
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <TouchableOpacity style={styles.InviteLink} onPress={shareMessage}>
                <View style={styles.link}>
                  <LinkIcon />
                </View>
                <AppText color='white' size={15} family='QuicksandBold'>    Invite to ride via link</AppText>
              </TouchableOpacity>
              {route?.params?.data?.clubId == null && searchData && searchData.length > 0 && (
                <>
                  {searchData.map((searchItem: any, index: number) => (
                    <TouchableOpacity
                      key={searchItem?.id}
                      style={styles.inviteContainer}
                      onPress={() => { toggleSelectUserGlobal(searchItem?.id) }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={
                            searchItem?.profile_picture == null
                              ? require('../../../assets/img/profilepic.jpg')
                              : { uri: searchItem?.profile_picture }
                          }
                          style={styles.item}
                        />
                        <AppText
                          size={16}
                          color={COLORS.whiteFBFB}
                          family={fonts.QuicksandSemi}
                          horizontal={15}>
                          {searchItem?.full_name}
                        </AppText>
                      </View>
                      <TouchableOpacity
                        onPress={() => { toggleSelectUserGlobal(searchItem?.id) }}
                        style={[
                          styles.inviteButton,
                          {
                            backgroundColor: selectedGlobalUser.includes(searchItem?.id)
                              ? COLORS.red
                              : COLORS.blue,
                          },
                        ]}>
                        <AppText
                          size={16}
                          color={COLORS.white}
                          family={fonts.QuicksandBold}>
                          {selectedGlobalUser.includes(searchItem.id) ? 'Cancel' : 'Invite'}
                        </AppText>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </>
              )}
              {route?.params?.data?.groupId ? (
                <>
                  {loader ? (
                    <View style={{ marginTop: ms(5) }}>
                      <ActivityIndicator size={50} color={COLORS.white} />
                    </View>
                  ) : (
                    <FlatList
                      data={paginatedUsers}
                      keyExtractor={(item) => item?.id?.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item?.id}
                          style={styles.inviteContainer}
                          onPress={() => toggleSelectUser(item?.id)}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={
                                item?.profile_picture == null
                                  ? require('../../../assets/img/profilepic.jpg')
                                  : { uri: item?.profile_picture }
                              }
                              style={styles.item}
                            />
                            <AppText
                              size={16}
                              color={COLORS.whiteFBFB}
                              family={fonts.QuicksandSemi}
                              horizontal={15}>
                              {item?.full_name}
                            </AppText>
                          </View>
                          <TouchableOpacity
                            onPress={() => toggleSelectUser(item?.id)}
                            style={[
                              styles.inviteButton,
                              {
                                backgroundColor: selectedUsers.includes(item?.id)
                                  ? COLORS.red
                                  : COLORS.blue,
                              },
                            ]}>
                            <AppText
                              size={16}
                              color={COLORS.white}
                              family={fonts.QuicksandBold}>
                              {selectedUsers.includes(item?.id) ? 'Cancel' : 'Invite'}
                            </AppText>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      )}
                      onEndReachedThreshold={0.5}
                      onEndReached={() => {
                        if (paginatedUsers.length < filteredUserData.length) {
                          setCurrentPage((prevPage) => prevPage + 1);
                        }
                      }}
                      ListFooterComponent={() =>
                        paginatedUsers.length < filteredUserData.length ? (
                          <ActivityIndicator size="large" color={COLORS.blue} />
                        ) : null
                      }
                    />
                  )}
                </>
              ) : (
                <>
                  {loader ? (
                    <View style={{ marginTop: ms(5) }}>
                      <ActivityIndicator size={50} color={COLORS.white} />
                    </View>
                  ) : (
                    <FlatList
                      data={paginatedUsers}
                      keyExtractor={(item) => item?.user_id?.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          key={item?.user_id}
                          style={styles.inviteContainer}
                          onPress={() => toggleSelectUser(item?.user_id)}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={
                                item?.profile_picture == null
                                  ? require('../../../assets/img/profilepic.jpg')
                                  : { uri: item?.profile_picture }
                              }
                              style={styles.item}
                            />
                            <AppText
                              size={16}
                              color={COLORS.whiteFBFB}
                              family={fonts.QuicksandSemi}
                              horizontal={15}>
                              {item?.full_name}
                            </AppText>
                          </View>
                          <TouchableOpacity
                            onPress={() => toggleSelectUser(item?.user_id)}
                            style={[
                              styles.inviteButton,
                              {
                                backgroundColor: selectedUsers.includes(item?.user_id)
                                  ? COLORS.red
                                  : COLORS.blue,
                              },
                            ]}>
                            <AppText
                              size={16}
                              color={COLORS.white}
                              family={fonts.QuicksandBold}>
                              {selectedUsers.includes(item.user_id) ? 'Cancel' : 'Invite'}
                            </AppText>
                          </TouchableOpacity>
                        </TouchableOpacity>
                      )}
                      onEndReachedThreshold={0.5}
                      onEndReached={() => {
                        if (paginatedUsers.length < filteredUserData.length) {
                          setCurrentPage((prevPage) => prevPage + 1);
                        }
                      }}
                      ListFooterComponent={() =>
                        paginatedUsers.length < filteredUserData.length ? (
                          <ActivityIndicator size="large" color={COLORS.blue} />
                        ) : null
                      }
                    />
                  )}
                </>
              )}
            </View>
            <View style={{ marginVertical: 5 }}>
              <AppText size={15} color='white' family='PoppinsMedium'>{route?.params?.data?.clubId ? '' : 'Invite from contacts:'}</AppText>
              <View style={{ marginVertical: 5 }} />
              {filteredContactData && (
                <FlatList
                  data={paginatedContacts}
                  keyExtractor={(item) => item?.phoneNumbers[0]?.number + item?.givenName}
                  renderItem={({ item }) => {
                    if (!item?.givenName || item?.givenName === "") {
                      return null;
                    }
                    return (
                      <TouchableOpacity key={item?.phoneNumbers[0]?.number + item?.givenName} style={styles.inviteContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 50 }}>
                          <FastImage
                            source={
                              item?.thumbnailPath
                                ? { uri: item?.thumbnailPath }
                                : require('../../../assets/img/profilepic.jpg')
                            }
                            style={styles.item}
                          />
                          <AppText
                            size={16}
                            color={COLORS.whiteFBFB}
                            family={fonts.QuicksandSemi}
                            horizontal={15} numLines={1} dotMode='tail'>
                            {item?.givenName} {item?.familyName}
                          </AppText>
                        </View>
                        <TouchableOpacity
                          onPress={() => toggleSelectUserContact(item?.phoneNumbers[0]?.number)}
                          style={[
                            styles.inviteButton,
                            {
                              backgroundColor: selectedUsersContact.includes(item?.phoneNumbers[0]?.number)
                                ? COLORS.red
                                : COLORS.blue,
                            },
                          ]}>
                          <AppText
                            size={16}
                            color={COLORS.white}
                            family={fonts.QuicksandBold}>
                            {selectedUsersContact.includes(item?.phoneNumbers[0]?.number) ? 'Cancel' : 'Invite'}
                          </AppText>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  }}
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    if (paginatedContacts.length < filteredContactData.length) {
                      setCurrentPage((prevPage) => prevPage + 1);
                    }
                  }}
                  ListFooterComponent={() =>
                    paginatedContacts.length < filteredContactData.length ? (
                      <ActivityIndicator size="large" color={COLORS.blue} />
                    ) : null
                  }
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddEventMembersScreen;
