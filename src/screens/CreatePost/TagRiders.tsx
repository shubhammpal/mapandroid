import React, {useState, useEffect, useContext, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MAP_KEY} from '../../services/api_helper';
import {COLORS, ms} from '../../style';
import AppText from '../../component/AppText/AppText';
import {fonts} from '../../utils/misc';
import {ArrowBAckIcon, CheckBoxIcon} from '../../assets/svgImg/SvgImg';
import {AuthContext} from '../../component/auth/AuthContext';
import {styles} from './styles';
import {requestGetTagUserList} from '../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';

const TagRiders = ({navigation,route}: any) => {
  const { setTagUsers, userToken,userDetails } : any = useContext(AuthContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [text, setText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectedTagUsers, setSelectedTagUsers] = useState<any[]>([]);

  useEffect(() => {
    
    setSelectedTagUsers(route.params.tags);
  }, []);

  useEffect(() => {
    GetUserList(text);
  }, [text]);

  const GetUserList = async (text:any) => {
    const apiData = { token: userToken, searchText: text };
    setLoader(true);
    try {
      const res = await requestGetTagUserList(apiData);
      if (res?.status) {
        const result = res.payload; 
          const filteredResult = result.filter((user:any) => user.id !== userDetails.id);
          setSelectedUsers(filteredResult);
         
      }
    } catch (error) {
      console.error('GET user list response: ', error);
    } finally {
      setLoader(false);
    }
  };

  const handleSelectUser = (user:any, index:any) => {
    const updatedUsers = [...selectedUsers];
    const currentUser = updatedUsers[index];
    const newStatus = !currentUser.status; 
    updatedUsers[index] = { ...currentUser, status: newStatus };
    setSelectedUsers(updatedUsers);

    if (newStatus) {
      setSelectedTagUsers(prev => {
        const userExists = prev.some(u => u.id === user.id);
        if (!userExists) {
          return [...prev, updatedUsers[index]];
        }
        return prev;
      });
    } else {
      setSelectedTagUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  

  const handleRemoveUser = (userId:any) => {
    const updatedTagUsers = selectedTagUsers.filter(user => user.id !== userId);
    setSelectedTagUsers(updatedTagUsers);
    const updatedSelectedUsers = selectedUsers.map(user =>
      user.id === userId ? { ...user, status: false } : user
    );
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleTextChange = (newText:any) => {
    setText(newText);
    GetUserList(newText);
  };

  const onGoBack = () => {
    navigation.goBack();
  };

  const renderUserItem = ({item, index}: {item: any; index: any}) => {
    const isChecked = item.status || selectedTagUsers.some(user => user.id === item.id);
    return (
      <TouchableOpacity
        key={item?.id}
        style={{
          flexDirection: 'row',
          width: '90%',
          justifyContent: 'space-between',
          marginVertical: 5,
          borderBottomWidth: 1,
          alignItems: 'center',
          borderBottomColor: COLORS.black3030,
          paddingBottom: 20,
          alignSelf: 'center',
        }}
        onPress={() => {
          handleSelectUser(item, index);
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '94%'}}>
            <Image
              source={
                item?.profile_picture == null
                  ? require('../../assets/img/profilepic.jpg')
                  : {uri: item?.profile_picture}
              }
              style={{height: 50, width: 50, borderRadius: 50}}
            />
            <AppText
              size={16}
              color={COLORS.whiteFBFB}
              family={fonts.QuicksandSemi}
              horizontal={15}
              width={'80%'}>
              {item?.full_name}
            </AppText>
          </View>
          <View style={{}}>{isChecked && <CheckBoxIcon />}</View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSelectedUser = ({item, index}: {item: any; index: any}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => handleRemoveUser(item.id)}>
        <View style={styles.mentionContainer}>
          <Image
            source={
              item.profile_picture
                ? {uri: item.profile_picture}
                : require('../../assets/img/profilepic.jpg')
            }
            style={styles.avatar}
          />
          <Text style={styles.mention}>{`@${item.full_name}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.black}}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: Platform.OS=='android'?25:ms(7)}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => onGoBack()}
            style={{
              paddingLeft: 16,
              height: 40,
              width: 40,
              justifyContent: 'center',
            }}>
            <ArrowBAckIcon />
          </TouchableOpacity>
          <AppText
            size={20}
            color={COLORS.whiteFBFB}
            family={fonts.QuicksandBold}
            horizontal={15}
            width={'78%'}>
            {'Tag people'}
          </AppText>
        </View>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            setTagUsers(selectedTagUsers), navigation.goBack();
          }}>
          <CheckBoxIcon />
        </TouchableOpacity>
      </View>

      <View style={[styles.SearchBox]}>
        <View style={styles.inputBox}>
          <TextInput
            style={{
              width: '100%',
              color: COLORS.white,
              fontFamily: fonts.PoppinsMedium,
              fontSize: 15,
              height: 51,
            }}
            placeholder="Search for a user"
            placeholderTextColor={COLORS.grey999}
            value={text}
            onChangeText={handleTextChange}
          />
        </View>
      </View>
      <View>
      {selectedTagUsers.length > 0 && (
        <FlatList
          data={selectedTagUsers}
          renderItem={renderSelectedUser}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 15,height:66}}
        />
      )}
      </View>
      <FlatList
        data={selectedUsers}
        renderItem={renderUserItem}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 20,paddingTop:10}}
      />
      
    </View>
  );
};

export default TagRiders;

