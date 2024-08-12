import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Image, Share, PermissionsAndroid, Platform, FlatList } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { COLORS, ms } from '../../style'
import { styles } from './styles'
import { ArrowBAckIcon, LinkIcon } from '../../assets/svgImg/SvgImg'
import AppText from '../../component/AppText/AppText'
import { fonts } from '../../utils/misc'
import FastImage from 'react-native-fast-image'
import { useFocusEffect } from '@react-navigation/native'
import { AuthContext } from '../../component/auth/AuthContext'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import SendSMS from 'react-native-sms';
import Contacts from 'react-native-contacts';
import { requestGetTagUserList, requestGetUserList, requestJoinClubAdd, requestNotificationSend } from '../../services/api_Services'
import emitter from '../../component/Emitter/emitter'

const ClubInvite = ({ navigation, route }: any) => {
  const [searchingText, setSearchingText] = useState('');
  const { userToken, userDetails }: any = useContext(AuthContext);
  const [getuserData, setGetuserData] = useState<any>([]);
  const [filteredUserData, setFilteredUserData] = useState<any>([]);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any[]>([]);
  const [filteredContactData, setFilteredContactData] = useState<any[]>([]);
  const [selectedUsersContact, setSelectedUsersContact] = useState<any[]>([]);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [selectedGlobalUser, setSelectedGlobalUser] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const paginatedData = filteredContactData.slice(0, currentPage * itemsPerPage);

  useFocusEffect(
    useCallback(() => {
      if(Platform.OS == 'android'){
        getCamera();
      }else{
        contactList()
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
        console.log(e);
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

  const AddMembertoGroup = async () => {
    if(selectedUsersContact.length > 0){
      sendBulkMessage()
    }
    navigation.goBack();
  };

  const shareMessage = async () => {
    const getLink: any = await generateLink()
    const message = `Hi,\n${route?.params?.item?.name} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} `
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
        link: `https://mytraclub.page.link/fJc4?groupId=${route?.params?.item?.id}`,
        domainUriPrefix: 'https://mytraclub.page.link',
        android: {
          packageName: 'com.thebikerscompany',
        },
        ios: {
          appStoreId: '6526488238',
          bundleId: 'com.mytra',
        },
      }, dynamicLinks.ShortLinkType.DEFAULT)
      return link
    } catch (error) {
      console.log('Generating Link Error:', error)
    }
  }

  useEffect(() => {
    if (searchingText) {
      const lowercasedFilter = searchingText.toLowerCase();
      
      const filteredContactList = contactData?.filter(item =>
      (item?.givenName?.toLowerCase().includes(lowercasedFilter) ||
        item?.familyName?.toLowerCase().includes(lowercasedFilter) ||
        item?.phoneNumbers?.some((phone: any) => phone.number.includes(lowercasedFilter)))
      ).filter(Boolean);
      setFilteredContactData(filteredContactList);
    } else {
      setFilteredContactData(contactData);
    }
  }, [searchingText, getuserData, contactData]);

  const sendBulkMessage = async () => {
    const getLink: any = await generateLink();
    const message = `Hi,\n${route?.params?.item?.name} admin has invited you to join fellow riders on MYTRA. Follow the link to connect: ${getLink} `
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
          setSearchData(result)
        } else {
          setSearchData([])
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
    NotificationSend(userId)
  };

  const handleTextChange = (newText: string) => {
    setSearchingText(newText);
    Getsearchdata(newText);
  };

  const NotificationSend = async (res: any) => {
    const data: any = {
      userId: res,
      token: userToken,
      notificationType: "club",
      entityId: route?.params?.item?.id,
      message: "New club created!",
      key: "CustomDataKey",
      is_accept:"true"
    };
    try {
      const res = await requestNotificationSend(data);
      console.log(res)
     
    } catch (error) {
      console.log('Follow user response: ', error);
    }
  };

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
              onPress={() => {AddMembertoGroup()}}
              >
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
              <AppText color='white' size={15} family='QuicksandBold'>    Invite to club via link</AppText>
            </TouchableOpacity>
            {
              searchData && searchData.length > 0 && (
                <>
                  {
                    searchData.map((searchItem: any, index: number) => {
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
                      )
                    })
                  }
                </>
              )
            }
            <View style={{ marginVertical: 5 }}>
              <AppText size={15} color='white' family='PoppinsMedium'>Invite from contacts:</AppText>
              <View style={{ marginVertical: 5 }} />
             
              <FlatList
                data={paginatedData}
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
                              : require('../../assets/img/profilepic.jpg')
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
                onEndReachedThreshold={0.5} // Adjust as necessary
                onEndReached={() => {
                  if (paginatedData.length < filteredContactData.length) {
                    setCurrentPage((prevPage) => prevPage + 1);
                  }
                }}
                ListFooterComponent={() =>
                  paginatedData.length < filteredContactData.length ? (
                    <ActivityIndicator size="large" color={COLORS.blue} />
                  ) : null
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ClubInvite;
