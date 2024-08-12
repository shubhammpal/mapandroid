
import React, { useCallback, useContext, useState, useEffect } from 'react';
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
import AppText from '../../component/AppText/AppText';
import { styles } from './styles';
import { fonts } from '../../utils/misc';
import { COLORS, ms } from '../../style';
import { AddIcon, ArrowBAckIcon, LinkIcon } from '../../assets/svgImg/SvgImg';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../component/auth/AuthContext';
import {
  requestAddMembertoGroup,
  requestGetTagUserList,
  requestGetUserList,
  requestJoinClubAdd,
  requestNotificationSend,
} from '../../services/api_Services';
import emitter from '../../component/Emitter/emitter';
import { strings } from '../../utils/strings';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SendSMS from 'react-native-sms';
import Contacts from 'react-native-contacts';
import FastImage from 'react-native-fast-image';

const InviteFriendsScreen = ({ navigation, route }: any) => {
  const [searchingText, setSearchingText] = useState('');
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [getuserData, setGetuserData] = useState<any>([]);
  const [filteredUserData, setFilteredUserData] = useState<any>([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [filteredContactData, setFilteredContactData] = useState<any[]>([]);
  const [selectedUsersContact, setSelectedUsersContact] = useState<any[]>([]);
  const [selectedGlobalUser, setSelectedGlobalUser] = useState<any[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useFocusEffect(
    useCallback(() => {
      GetUserList();
      if (Platform.OS == 'android') {
        getCamera();
      } else {
        contactList();
      }
    }, []),
  );

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
        console.log(e, 'Error fetching contacts');
      });
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

  const GetUserList = async () => {
    const apiData = { token: userToken, user_id: userDetails?.id };
    setLoader(true);
    try {
      const res = await requestGetUserList(apiData);
      if (res?.status == true) {
        setGetuserData(res?.payload);
        setFilteredUserData(res?.payload); // Initialize filtered data
        setLoader(false);
      }
    } catch (error) {
      console.log('GET user list response: ', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    const filteredData = getuserData.filter((item) =>
      item?.full_name?.toLowerCase().includes(searchingText.toLowerCase())
    );
    setFilteredUserData(filteredData);
  }, [searchingText, getuserData]);

  const toggleSelectUser = (userId: any) => {
    setSelectedUsers((prevSelected: any) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id: any) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
    NotificationSend(userId);
  };

  const AddMembertoGroup = async () => {
    navigation.navigate(strings.PROFILE_SCREEN);
    if (selectedUsersContact.length > 0) {
      sendBulkMessage();
    }
  };

  const shareMessage = async () => {
    const getLink: any = await generateLink();
    const message = `Hi,\n${route?.params?.groupId?.group_name} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} \n\nMytra`;
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

  const generateLink = async () => {
    try {
      const link = await dynamicLinks().buildShortLink({
        link: `https://mytraclub.page.link/fJc4?groupId=${route?.params?.groupId?.group_id}`,
        domainUriPrefix: 'https://mytraclub.page.link',
        social: {
          title: `${route?.params?.groupId?.group_name}`,
          descriptionText: 'mytra.club',
          imageUrl: `${route?.params?.groupId?.group_image ? route?.params?.groupId?.group_image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'}`
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
      const filteredUserList = getuserData?.filter((item) =>
        item?.full_name?.toLowerCase().includes(lowercasedFilter)
      ).filter(Boolean);
      setFilteredUserData(filteredUserList);

      const filteredContactList = contactData?.filter((item) =>
        (item?.givenName?.toLowerCase().includes(lowercasedFilter) ||
          item?.familyName?.toLowerCase().includes(lowercasedFilter) ||
          item?.phoneNumbers?.some(phone => phone.number.includes(lowercasedFilter)))
      ).filter(Boolean);
      setFilteredContactData(filteredContactList);
    } else {
      setFilteredUserData(getuserData);
      setFilteredContactData(contactData);
    }
  }, [searchingText, getuserData, contactData]);

  const sendBulkMessage = async () => {
    const getLink: any = await generateLink();
    const message = `Hi,\n${route?.params?.groupId?.group_name} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} \n\nMytra`;
    SendSMS.send({
      body: message,
      recipients: selectedUsersContact,
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
    });
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

  const handleTextChange = (newText: string) => {
    setSearchingText(newText);
    Getsearchdata(newText);
  };

  const NotificationSend = async (res: any) => {
    const data: any = {
      userId: res,
      token: userToken,
      notificationType: 'group',
      entityId: route?.params?.groupId?.group_id,
      message: 'New group created!',
      key: 'CustomDataKey',
      is_accept: 'true'
    };
    try {
      await requestNotificationSend(data);
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

  // Pagination for contacts
  const paginatedContacts = filteredContactData.slice(0, currentPage * itemsPerPage);

  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ScrollView style={styles.scrollContainer} bounces={false}>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.mainContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                  Invite People
                </AppText>
              </View>
              <TouchableOpacity
                style={[styles.addButton]}
                onPress={() => AddMembertoGroup()}>
                <AppText
                  size={18}
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
                    onChangeText={(text) => handleTextChange(text)}
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.InviteLink} onPress={shareMessage}>
              <View style={styles.link}>
                <LinkIcon />
              </View>
              <AppText color='white' size={15} family='QuicksandBold'>    Invite to group via link</AppText>
            </TouchableOpacity>
            {
              searchData && searchData.length > 0 && (
                <>
                  {
                    searchData.map((searchItem: any, index: number) => {
                      if (route?.params?.data) {
                        let check = route?.params?.data.some((user: any) => user.user_id === searchItem.id);
                        if (check == true) {
                          return;
                        }
                      }
                      return (
                        <TouchableOpacity
                          key={searchItem?.id}
                          style={styles.inviteContainer}
                          onPress={() => { toggleSelectUserGlobal(searchItem?.id) }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              source={
                                searchItem?.profile_picture == null
                                  ? require('../../assets/img/profilepic.jpg')
                                  : { uri: searchItem?.profile_picture }
                              }
                              style={styles.item}
                            />
                            <AppText
                              size={16}
                              color={COLORS.whiteFBFB}
                              family={fonts.QuicksandSemi}
                              horizontal={15}>
                              {searchItem?.user_name}
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
                      )
                    })
                  }
                </>
              )
            }
            <View style={{ marginVertical: 10 }}>
              {loader ? (
                <View style={{ marginTop: ms(5) }}>
                  <ActivityIndicator size={50} color={COLORS.white} />
                </View>
              ) : (
                !route?.params?.data ? (
                  filteredUserData
                    ?.filter((item) => item.id !== userDetails.id) // Exclude current user
                    .map((item, i) => (
                      <TouchableOpacity
                        key={item?.id}
                        style={styles.inviteContainer}
                        onPress={() => toggleSelectUser(item?.id)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={
                              item?.profile_picture == null
                                ? require('../../assets/img/profilepic.jpg')
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
                            {selectedUsers.includes(item.id) ? 'Cancel' : 'Invite'}
                          </AppText>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))
                ) : (
                  filteredUserData
                    ?.filter(
                      (item) =>
                        item.id !== userDetails.id && // Exclude current user
                        !route?.params?.data.some(
                          (user) => user.user_id === item.id,
                        ),
                    )
                    .map((item, i) => (
                      <TouchableOpacity
                        key={item?.id}
                        style={styles.inviteContainer}
                        onPress={() => toggleSelectUser(item?.id)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={
                              item?.profile_picture == null
                                ? require('../../assets/img/profilepic.jpg')
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
                            {selectedUsers.includes(item.id) ? 'Cancel' : 'Invite'}
                          </AppText>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))
                )
              )}
            </View>
            <View style={{ marginVertical: 5 }}>
              <AppText size={15} color='white' family='PoppinsMedium'>Invite from contacts:</AppText>
              <View style={{ marginVertical: 5 }} />
              
              <FlatList
                data={paginatedContacts}
                keyExtractor={(item) => item?.phoneNumbers[0]?.number + item?.givenName}
                renderItem={({ item }) => {
                  if (!item?.givenName || item?.givenName === '') {
                    return null;
                  }
                  return (
                    <TouchableOpacity key={item?.phoneNumbers[0]?.number + item?.givenName} style={styles.inviteContainer}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 50 }}>
                        <FastImage
                          source={
                            item?.thumbnailPath
                              ? { uri: item?.thumbnailPath }
                              : require('../../assets/img/profilepic.jpg')
                          }
                          style={styles.item}
                        />
                        <AppText
                          size={16}
                          color={COLORS.whiteFBFB}
                          family={fonts.QuicksandSemi}
                          horizontal={15}
                          numLines={1}
                          dotMode="tail">
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
                        <AppText size={16} color={COLORS.white} family={fonts.QuicksandBold}>
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
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default InviteFriendsScreen;
