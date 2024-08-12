import {
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Platform,
  Share,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { styles } from './styles';
import { AddIcon, ArrowBAckIcon, ChatIcon, ShareIcon, SmallArrowDownIcon, SmallArrowUPIcon, ThreeDotStraighIcon } from '../../../assets/svgImg/SvgImg';
import { COLORS, ms } from '../../../style';
import { formatDate, width } from '../../../style/typography';
import AppText from '../../../component/AppText/AppText';
import StackProfile from '../../ProfileScreen/StackProfile';
import { AuthContext } from '../../../component/auth/AuthContext';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
const headers = [
  { id: 1, title: 'Photos' },
  { id: 2, title: 'Rides' },
  { id: 3, title: 'Members' },
];
const ClubDetails = ({ navigation, route }: any) => {
  
  const { userToken }: any = useContext(AuthContext);
  const [hide, setHide] = useState(false)
  let getGroupDetails = route?.params?.data
  

  
  return (
    <View style={styles.detailscontainer}>
      <KeyboardAvoidingScrollView
        contentContainerStyle={styles.scrollContainer}
        style={styles.detailscontainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.detailscontainer}>
          <ImageBackground
           
            source={getGroupDetails?.club_logo? { uri: getGroupDetails?.club_logo } : require('../../../assets/img/noimage.png')}
            style={{ height: Platform.OS == 'ios' ? 250 : 250, width: width }}>
            <SafeAreaView />
            <View style={styles.coverarrow}>
            <TouchableOpacity style={{height:30,width:30}}
              onPress={() => navigation.goBack()}>
                <ArrowBAckIcon active={COLORS.white} />
              </TouchableOpacity>
              
            </View>
            
          </ImageBackground>

          <View style={styles.detailsmainContainer}>
            <View style={styles.row}>
              {
                getGroupDetails?.club_logo ? (
                  <Image
                    source={{ uri: getGroupDetails?.club_logo }}
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
            <View style={styles.stats}>
              <View
                style={[
                  styles.stat,
                  { borderRightWidth: 2, borderRightColor: COLORS.black131 },
                ]}>
                <AppText size={22} color={COLORS.white} family="PoppinsSemiB">
                  0 km
                </AppText>
                <AppText size={14} color={COLORS.grey999} family="PoppinsLight">
                  Total Travels
                </AppText>
              </View>
              <View
                style={[
                  styles.stat2,
                  { borderRightWidth: 2, borderRightColor: COLORS.black131 },
                ]}>
                <AppText size={22} color={COLORS.white} family="PoppinsSemiB">
                  {getGroupDetails?.member_count}
                </AppText>
                <AppText size={14} color={COLORS.grey999} family="PoppinsLight">
                  Total Members
                </AppText>
              </View>
              <View style={styles.stat}>
                <AppText size={22} color={COLORS.white} family="PoppinsSemiB">
                  {getGroupDetails?.eventCount}
                </AppText>
                <AppText size={14} color={COLORS.grey999} family="PoppinsLight">
                  Total Events
                </AppText>
              </View>
            </View>
            <View style={{ marginVertical: ms(0) }}>
              <AppText size={15} color={COLORS.greyB0B0} family="PoppinsLight">
                {getGroupDetails?.description}
              </AppText>
            </View>

            {
              hide == false ? (
                <TouchableOpacity style={styles.row} onPress={() => setHide(!hide)}>
                  <AppText size={15} color={COLORS.blue} family="PoppinsLight">
                    Show More
                  </AppText>
                  <SmallArrowDownIcon style={{ left: 10 }} />
                </TouchableOpacity>
              ) : (
                <>
                 
                  <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                    <AppText size={16} color={COLORS.white} family='PoppinsLight'>Location </AppText>
                    <AppText size={16} color={COLORS.lightBlue} family='PoppinsRegular'>{getGroupDetails?.address ? getGroupDetails?.address +', ' : '' +getGroupDetails?.club_headquarters_name}</AppText>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 }}>
                    <AppText size={16} color={COLORS.white} family='PoppinsLight'>Establish date</AppText>
                    <AppText size={16} color={COLORS.lightBlue} family='PoppinsRegular'>{formatDate(getGroupDetails?.club_start_date)}</AppText>
                  </View>
                  <View
                    style={styles.inviteContainer}>
                    <Image
                      source={
                        getGroupDetails?.user_profile_pic == null
                          ? require('../../../assets/img/profilepic.jpg')
                          : { uri: getGroupDetails?.user_profile_pic }
                      }
                      style={styles.userimage}
                    />
                    <View>
                      <AppText
                        size={16}
                        color={COLORS.white}
                        family='PoppinsRegular'
                        horizontal={15}>
                         {getGroupDetails?.role}
                      </AppText>
                      <AppText
                        size={20}
                        color={COLORS.white}
                        family='PoppinsSemiB'
                        horizontal={15}>
                        {getGroupDetails?.user_name}
                      </AppText>
                    </View>
                  </View>
                  <View>
                    <AppText
                      size={16}
                      color={COLORS.white}
                      family='PoppinsRegular'
                    >
                      Address
                    </AppText>
                    <AppText
                      size={16}
                      color={COLORS.white}
                      family='PoppinsRegular'
                    >
                      {getGroupDetails?.current_city}
                    </AppText>
                  </View>
                  <TouchableOpacity style={styles.row} onPress={() => setHide(!hide)}>
                    <AppText size={15} color={COLORS.blue} family="PoppinsLight">
                      Hide
                    </AppText>
                    <SmallArrowUPIcon style={{ left: 10 }} />
                  </TouchableOpacity>
                </>
              )
            }
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
              clubId={getGroupDetails}

            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
      
    </View>
  );
};

export default ClubDetails;



