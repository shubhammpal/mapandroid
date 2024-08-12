import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { COLORS } from '../../style';
import {
  ArrowBAckIcon,
  CrossRedIcon,
  SOSAddIcon,
  SOSDeleteIcon,
  SOSInfoIcon,
  SOSMobileIcon,
} from '../../assets/svgImg/SvgImg';
import AppText from '../../component/AppText/AppText';
import { styles } from './styles';
import { AuthContext } from '../../component/auth/AuthContext';
import { requestAddSos, requestDeleteSos, requestSOSlist } from '../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';
import SubmitButton from '../../component/ButtonCotainer/SubmitButton';
import InputField from '../../component/CustomInput/InputField';

const SOSScreen = ({ navigation }: any) => {
  const { userDetails, userToken }: any = useContext(AuthContext);
  const [soslistData, setSoslistData] = useState<any>('');
  const [sosStatus, setSosStatus] = useState<any>([]);
  const [addModal, setAddModal] = useState<any>(false);
  const [name, setName] = React.useState<any>('');
  const [mobile, setMobile] = React.useState<any>('');
  const [loader, setloader] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      GetSOSList();
    }, []),
  );
  const GetSOSList = async () => {
    const data: any = {
      user_id: userDetails?.id,
      token: userToken,
    };
    try {
      const res = await requestSOSlist(data);
      if (res?.status == true) {
        setSoslistData(res?.contacts);
        if (res?.contacts?.length == 0) {
          setSosStatus([
            { id: 1, number: 'First' },
            { id: 2, number: 'Second' },
            { id: 3, number: 'Third' },
          ]);
        } else if (res?.contacts?.length == 1) {
          setSosStatus([
            { id: 2, number: 'Second' },
            { id: 3, number: 'Third' },
          ]);
        } else if (res?.contacts?.length == 2) {
          setSosStatus([{ id: 3, number: 'Third' }]);
        } else if (res?.contacts?.length == 3) {
          setSosStatus([]);
        }
      }
    } catch (error) {
      console.log('User details response: ', error);
    }
  };
  const Addsosapi = async () => {
    const data: any = {
      user_id: userDetails?.id,
      name: name,
      phone_number: mobile,
      token: userToken,
    };
    setloader(true);
    try {
      await requestAddSos(data).then(async (res: any) => {
        
        if (res?.status == true) {
          GetSOSList()
          setAddModal(false);
          setName('')
          setMobile('')
        }
        setloader(false);
      });
    } catch (error) {
      console.log('Login response: ', error);
      setloader(false);
    }
  };
  const DeleteSos = async (deleid: any) => {
    const data: any = {
      id: deleid,
      token: userToken,
    };
    try {
      const res = await requestDeleteSos(data);
      if (res?.status == true) {
        GetSOSList()

      }
    } catch (error) {
      console.log('User details response: ', error);
    }
  };
  return (
    <View style={styles.scrollview}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingVertical: 15, paddingRight: 15 }}>
                <ArrowBAckIcon />
              </TouchableOpacity>
              <AppText
                size={20}
                color={COLORS.white}
                family="PoppinsSemiB"
                horizontal={10}>
                SOS
              </AppText>
            </View>
           
          </View>
          <View style={{ marginVertical: 50, marginHorizontal: 10 }}>
            <AppText
              size={26}
              color={COLORS.white}
              family="PoppinsSemiB"
              align="center">
              Setup your emergency contact
            </AppText>
            <View style={styles.mainContainer}>
              {soslistData &&
                soslistData?.map((item: any) => {
                  return (
                    <View
                      style={[
                        styles.row,
                        {
                          paddingHorizontal: 15,
                          paddingVertical: 20,
                          borderBottomWidth: 1,
                          borderBottomColor: COLORS.semigrey,
                        },
                      ]}>
                      <View style={styles.row}>
                        <View style={styles.icon}>
                          <SOSMobileIcon />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                          <AppText
                            size={16}
                            color={COLORS.white}
                            family="PoppinsSemiB">
                            {item?.name}
                          </AppText>
                          <AppText
                            size={14}
                            color={COLORS.offEDED}
                            family="PoppinsRegular">
                            {item?.phone_number}
                          </AppText>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => DeleteSos(item?.id)}>
                        <SOSDeleteIcon />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              {sosStatus?.map((item: any, index: any) => {
                return (
                  <>
                    <View
                      style={[
                        styles.row,
                        {
                          paddingHorizontal: 15,
                          paddingVertical: 20,
                          borderBottomWidth: 1,
                          borderBottomColor: COLORS.semigrey,
                        },
                      ]}>
                      <View style={styles.row}>
                        <View style={styles.icon}>
                          <SOSMobileIcon />
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                          <AppText
                            size={14}
                            color={COLORS.grey92}
                            family="PoppinsRegular">
                            Add {item?.number} Contact
                          </AppText>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => setAddModal(true)}>
                        <SOSAddIcon />
                      </TouchableOpacity>
                    </View>
                  </>
                );
              })}
            </View>
          </View>

          <View style={{}}>
            <View style={styles.contentRow}>
            <SOSInfoIcon /> 
        
            </View>
            <AppText
                size={16}
                color={COLORS.white}
                family="PoppinsRegular"
                horizontal={13}>
                {"By enabling SOS you are volunteering to be available for your group, club and community members in case of any emergencies and your contact will be shared in case of emergency."}
              </AppText>
          </View>
        </View>

        <Modal transparent visible={addModal}>
          <View style={[styles.sosmodalContent]}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={styles.closeButton2}
                onPress={() => {
                  setAddModal(false);
                }}>
                <CrossRedIcon />
              </TouchableOpacity>

              <AppText
                size={18}
                family="PoppinsSemiB"
                color={COLORS.white}
                align="center">
                Add a contact
              </AppText>
              <View style={styles.textinputConatiner}>
                <InputField
                  value={name}
                  setValue={text => setName(text)}
                  secure={false}
                  valid={'*'}
                  name={'Contact Name'}
                />
                <InputField
                  value={mobile}
                  setValue={text => setMobile(text)}
                  secure={false}
                  valid={'*'}
                  keyboard="numeric"
                  maxLength={10}
                  name={'Contact Number'}
                />
              </View>

              <SubmitButton
                title={'Add Now'}
                loader={loader}
                pressing={() => Addsosapi()}
                widthOf={'85%'}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default SOSScreen;
