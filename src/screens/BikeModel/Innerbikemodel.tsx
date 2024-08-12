import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
  Image,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import AppText from '../../component/AppText/AppText';
import { COLORS, ms } from '../../style';
import { strings } from '../../utils/strings';
import InputField from '../../component/CustomInput/InputField';
import { height, shadowStyle } from '../../style/typography';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import { styles } from './styles';
import { ArrowBAckIcon, CheckBoxIcon, CrossRedIcon } from '../../assets/svgImg/SvgImg';
import { AuthContext } from '../../component/auth/AuthContext';
import { setUserData } from '../../services/auth_helper';
import emitter from '../../component/Emitter/emitter';
import {
  requestBikeModalList,
  requestCompleteProfile,
  requestnewbikeadd,
} from '../../services/api_Services';

type InnerBikeModalScreenProps = {
  navigation: any;
  route: any;
};

const InnerBikeModalScreen = ({
  navigation,
  route,
}: InnerBikeModalScreenProps) => {
  const [searchingText, setSearchingText] = useState('');
  const { userloginPress }: any = useContext(AuthContext);
  const [selectedItemIds, setSelectedItemIds] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { userDetails, userToken }: any = useContext(AuthContext);
  const [bikeModalList, setBikeModalList] = useState<any>();
  const [bikeName, setBikeName] = useState<any>();
  const [bikeNumberModal, setBikeNumberModal] = useState<Boolean>(false);
  const [registrationNumber, setRegistrationNumber] = useState<String>('');
  const [itemData, setItemData] = useState<any>(null);



  useEffect(() => {
    getBikeModalList();
  }, []);

  const getBikeModalList = async () => {
    const apiData = { id: route?.params?.modalData?.id };
    setLoading(true);
    try {
      const res = await requestBikeModalList(apiData);
      
      if (res?.status == true) {
        let result = res?.payload;
        for (let i = 0; i < result.length; i++) {
          result[i]["registration_no"] = "";
        }
        
        setBikeModalList(result);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error fetching bike modal list:', error);
    }
  };

  const completeProfile = async () => {
    const data: any = {
      full_name: route?.params?.res?.res?.fullName,
      email: route?.params?.res?.email,
      user_id: userDetails?.id,
      dob: route?.params?.res?.res?.dob,
      gender: route?.params?.res?.res?.gender,
      current_city: route?.params?.res?.city,
      registration_no: bikeModalList?.find(item => item.id === itemData.id)?.registration_no,
      driving_licence: route?.params?.res?.res?.license,
      bike_image: route?.params?.modalData?.brand_logo,
      bike_model: route?.params?.modalData?.id,
      bike_name: bikeName?.id ? bikeName?.id : bikeName,
      user_name: route?.params?.res?.userName,
    };
    
    try {
      
      const res = await requestCompleteProfile(data);
      
      if (res?.success == true) {
        const alertData = { heading: 'login', message: res?.message };
        emitter.emit('alert', alertData);
        await setUserData(res?.user);
        userloginPress(res?.user);
      } else {
        const alertData = { heading: 'failed', message: res?.error };
        emitter.emit('alert', alertData);
      }
      setLoader(false);
    } catch (error) {
      console.log('Complete Profile Error:', error);
      setLoader(false);
    }
  };

  const handleItemPress = (item: any) => {
    setItemData(item)
    if (route?.params?.screen) {
      const isSelected = selectedItemIds.includes(item.id);
      if (isSelected) {
        setSelectedItemIds(prevState =>
          prevState.filter((id: any) => id !== item.id),
        );
      } else {
        setSelectedItemIds(prevState => [...prevState, item.id]);
        setBikeNumberModal(true);
      }
    } else {
      setBikeName(item);
      setSelectedItemIds([item.id]);
      setBikeNumberModal(true);
    }
  };


  const AddnewBike = async () => {
    const requestData = selectedItemIds?.map((id: any) => ({
      brand_id: route?.params?.modalData?.id,
      model_id: id,
      user_id: userDetails?.id,
      registration_no: bikeModalList?.find(item => item.id === id)?.registration_no || ''
    }));

    try {
      const res = await requestnewbikeadd(requestData, userToken);
      const alertData = { heading: 'Login', message: res?.message };
      emitter.emit('alert', alertData);
      navigation.goBack();
      navigation.goBack(); // Double check if this is necessary
      setLoader(false);
    } catch (error) {
      console.log('Complete Profile Error:', error);
      setLoader(false);
    }
  };


  const onAddBikeNumber = () => {
    // const registrationRegex = /^[A-Z]{1,2}-[0-9]{1,2}-[A-Z]{1,2}-[0-9]{4}$/;
    const registrationRegex = /^[a-zA-Z0-9]*$/;

    if (registrationNumber == '') {
      Alert.alert("Please enter bike registration number")
      return;
    } else if (registrationNumber.length<10) {
      Alert.alert("10 characters must be required.");
      return;
    }else if (!registrationRegex.test(registrationNumber)) {
      Alert.alert("Invalid bike registration number. Please enter a valid number.");
      return;
    }
    setBikeNumberModal(false)
    let result = itemData;
    result.registration_no = registrationNumber;
    setRegistrationNumber('')
    if (route?.params?.screen !== "mybike") {
    completeProfile();
    }
  }


  return (
    <View style={[styles.container, shadowStyle]}>
      <View style={styles.innermainContainer}>
        <View style={styles.margin}>
          <View style={styles.arrow}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 30, height: 15 }}>
              <ArrowBAckIcon />
            </TouchableOpacity>
            <AppText
              size={20}
              color={COLORS.white}
              family="PoppinsBold"
              horizontal={25}>
              {route?.params?.modalData?.brand_name}
            </AppText>
          </View>
          <View style={[styles.SearchBox]}>
            <View style={styles.inputBox}>
              <TextInput
                value={searchingText}
                style={styles.input}
                placeholderTextColor={COLORS.grey92}
                placeholder="Search"
                onChangeText={text => setSearchingText(text)}
                keyboardType="default"
              />
            </View>
          </View>
        </View>
        <View style={styles.inner}>
          {bikeModalList?.length <= 0 ? (
            <View>
              <AppText size={16} color={COLORS.white} align="center">
                No bike models found.
              </AppText>
            </View>
          ) : searchingText.toLowerCase() === 'other' ? (
            <View style={styles.margin}>
              <AppText size={14} color={COLORS.white} family="PoppinsRegular">
                Can't find your bike? Share details with us.
              </AppText>
              <View style={[styles.SearchBox]}>
                <View style={styles.inputBox}>
                  <TextInput
                    value={bikeName}
                    style={styles.input}
                    placeholderTextColor={COLORS.grey92}
                    placeholder="Model Name"
                    onChangeText={text => setBikeName(text)}
                    keyboardType="default"
                  />
                </View>
              </View>
            </View>
          ) : loading ? (
            <View
              style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ActivityIndicator size={50} color={'white'} />
            </View>
          ) : (
            <FlatList
              data={bikeModalList}
              style={{}}
              numColumns={1}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item, index }: { item: any, index: any }) => {
                const isSelected = selectedItemIds.includes(item.id);
                if (
                  item.id
                    .toString()
                    .toLowerCase()
                    .includes(searchingText.toLowerCase()) ||
                  item.model_name
                    .toLowerCase()
                    .includes(searchingText.toLowerCase())
                ) {
                  return (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                        paddingVertical: 10,
                      }}>
                      <AppText
                        size={14}
                        color={COLORS.white}
                        family="PoppinsRegular">
                        {item?.model_name}
                      </AppText>
                      <TouchableOpacity
                        style={[
                          isSelected ? styles.activecheckBox : styles.checkBox,
                        ]}
                        onPress={() => { handleItemPress(item, index) }}>
                        {isSelected && <CheckBoxIcon />}
                      </TouchableOpacity>
                    </View>
                  );
                }
              }}
            />
          )}
        </View>
      </View>
      <View style={{ marginHorizontal: ms(2), marginVertical: ms(5) }}>
        <SubmitButton
          loader={loader}
          title={'Continue'}
          pressing={async () => {
            if (
              selectedItemIds.length === 0 &&
              searchingText.toLowerCase() != 'other'
            ) {
              const data = {
                heading: 'failed',
                message: 'Please select at least one bike model',
              };
              emitter.emit('alert', data);
            } else {
              if (route?.params?.screen) {
                setLoader(true);
                AddnewBike();
              } else {
                completeProfile();
              }
            }
          }}
          widthOf={'98%'}
        />
      </View>


      <Modal transparent visible={bikeNumberModal}>
        <View style={[styles.bikeNumberModalContent]}>
          <View style={styles.bikeNumberModalWrapper}>
            <AppText
              size={24}
              family="PoppinsSemiB"
              color={COLORS.white}
              align="center">
              Registration Number
            </AppText>

            <View style={[styles.bikeNumberContainer, {}]}>
              <TextInput
                value={registrationNumber}
                style={styles.bikeNumberInput}
                placeholderTextColor={COLORS.grey92}
                placeholder='Registration number'
                onChangeText={(text) => setRegistrationNumber(text)}
                keyboardType='default'
                autoCapitalize={"characters"}
                maxLength={10}
              />
            </View>
            <View style={{
              marginBottom: 26, 
            }}>
              <AppText
                size={12}
                color={COLORS.lightyellow}
                family="PoppinsMedium"
                align="right">
                For example-:MP01AB1234
              </AppText>
            </View>

            <SubmitButton
              title={'Add Now'}
              pressing={() => onAddBikeNumber()}
              widthOf={'85%'}
            />

            <TouchableOpacity onPress={() => {
              setBikeNumberModal(false),
                setSelectedItemIds(prevState =>
                  prevState.filter((id: any) => id !== itemData.id),
                );
            }}
              style={{ position: 'absolute', top: -5, right: -5 }}>
              <CrossRedIcon />
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default InnerBikeModalScreen;
