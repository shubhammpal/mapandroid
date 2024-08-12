import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { styles } from './styles';
import StackProfile from '../../ProfileScreen/StackProfile';
import { COLORS, ms } from '../../../style';
import AppText from '../../../component/AppText/AppText';
import { ArrowBAckIcon } from '../../../assets/svgImg/SvgImg';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestGeteventlistDetails } from '../../../services/api_Services';
const headers = [
  { id: 1, title: 'Details' },
  { id: 2, title: 'Gallery' },
  { id: 3, title: 'Members' },
];
const EventPage = ({ navigation, route }: any) => {
  const [eventlistdetailsData, setEventlistdetailsData] = useState<any>();
  const { userToken }: any = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      GetEventListDetails();
    }, []),
  );
  const GetEventListDetails = async () => {
    const apiData = { id: route?.params?.data, token: userToken };
    try {
      await requestGeteventlistDetails(apiData).then(async (res: any) => {
        
        if (res?.success == true) {
          setEventlistdetailsData(res?.data);
        }
      });
    } catch (error) {
      console.log('Event deatils response: ', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <View style={{ marginHorizontal: ms(2) }}>
            <View style={styles.coverarrow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowBAckIcon />
              </TouchableOpacity>
             
              <Image
                source={eventlistdetailsData?.files[0]?.url ? {uri: eventlistdetailsData?.files[0]?.url} : require('../../../assets/img/noimage.png')}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 50,
                  marginHorizontal: 15,
                }}
              />
              <AppText
                size={20}
                color={COLORS.white}
                family="PoppinsSemiB"
                width={'80%'}
                horizontal={10}>
                {eventlistdetailsData?.title && eventlistdetailsData?.title}
              </AppText>
            </View>
          </View>
          <View
            style={{
              marginTop: 30,
              backgroundColor: COLORS.black,
            }}>
            <StackProfile
              navigation={navigation}
              headers={headers}
              icon={'icon'}
              data={eventlistdetailsData}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventPage;
