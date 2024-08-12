import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { styles } from './styles';
import { AddIcon, ArrowBAckIcon, ChatIcon, ShareIcon, SmallArrowDownIcon, ThreeDotStraighIcon } from '../../../assets/svgImg/SvgImg';
import { COLORS, ms } from '../../../style';
import { width } from '../../../style/typography';
import AppText from '../../../component/AppText/AppText';
import StackProfile from '../../ProfileScreen/StackProfile';
import { AuthContext } from '../../../component/auth/AuthContext';
import { requestGetgroupdetails } from '../../../services/api_Services';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { strings } from '../../../utils/strings';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
const headers = [
  { id: 1, title: 'Photos' },
  { id: 2, title: 'Rides' },
  { id: 3, title: 'Members' },
];
const GroupDetails = ({ navigation, route }: any) => {
  const { userToken }: any = useContext(AuthContext);
  const [getGroupDetails, setGetGroupDetails] = useState<any>();
  useFocusEffect(
    useCallback(() => {
      Getgroupdetails();
    }, []),
  );
  const Getgroupdetails = async () => {
    const apiData = { groupId: route?.params?.id?.group_id, token: userToken };
    try {
      await requestGetgroupdetails(apiData).then(async (res: any) => {
    
        if (res?.status == true) {
          setGetGroupDetails(res?.payload);
        }
      });
    } catch (error) {
      console.log('Details response: ', error);
    }
  };
  return (
    <View style={styles.detailscontainer}>
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.scrollview}
        style={styles.detailscontainer}>
        <View style={styles.detailscontainer}>
          <ImageBackground
            source={getGroupDetails?.image ? {
              uri: getGroupDetails?.image
            } : require('../../../assets/img/noimage.png')}
            style={{ height: Platform.OS == 'ios' ? 300 : 250, width: width }}>
            <SafeAreaView />
            <View style={styles.coverarrow}>
              <TouchableOpacity style={{ height: 30, width: 30 }}
                onPress={() => navigation.goBack()}>
                <ArrowBAckIcon active={COLORS.white} />
              </TouchableOpacity>
             
            </View>
          </ImageBackground>
          <View style={styles.detailsmainContainer}>
            <View style={styles.row}>
             
              {
                getGroupDetails?.image ? (
                  <Image
                    source={{ uri: getGroupDetails?.image }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require('../../../assets/img/noimage.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                )
              }
              <AppText
                size={22}
                color={COLORS.white}
                family="PoppinsSemiB"
                width={'70%'}
                horizontal={20}>
                {getGroupDetails?.name}
              </AppText>
            </View>
           
            <View style={{ marginTop: ms(0) }}>
              <AppText size={15} color={COLORS.greyB0B0} family="PoppinsLight">
                {getGroupDetails?.description}
              </AppText>
            </View>
           
          </View>
          <View
            style={{
              marginTop: 30,
              backgroundColor: COLORS.black,
              paddingTop: 10,
            }}>
            <StackProfile
              navigation={navigation}
              headers={headers}
              icon={'icon'}
              id={route?.params?.id}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
     
    </View>
  );
};

export default GroupDetails;
