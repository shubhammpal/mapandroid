import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {ms} from 'react-native-size-matters';
import {COLORS} from '../../../style';
import {styles} from '../styles';
import AppText from '../../../component/AppText/AppText';
import ImgView from '../../../component/ImgView/ImgView';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';

const BlockView = ({actionSheetRef, UserFollowApi, userId,setScreenData}: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {actionSheetRef.current?.hide()
          }}>
          <View style={styles.blockContainer}>
            <ImgView
              height={80}
              width={80}
              radius={50}
              dummy={true}
              url={
                userId?.user?.profile_picture
                  ? {uri: userId?.user?.profile_picture}
                  : require('../../../assets/img/profilepic.jpg')
              }
            />
            <View style={{marginVertical: 10}}>
              <AppText
                size={16}
                family="PoppinsBold"
                color={
                  COLORS.white
                }>{`Block  ${userId?.user?.user_name}?`}</AppText>
            </View>
            <AppText
              size={12}
              family="PoppinsLight"
              color={COLORS.grey999}
              align="center">
              This will also lock any other accounts they may have or create in
              the future.
            </AppText>
            <View style={[styles.message, {marginTop: ms(3)}]}>
              <Image
                source={require('../../../assets/img/stop.png')}
                style={styles.reporticon}
              />
              <AppText
                size={14}
                family="PoppinsMedium"
                color={COLORS.whiteFBFB}
                horizontal={15}>
                They won't be able to message you or find your profile or
                content on Mytra.
              </AppText>
            </View>
            <View style={styles.message}>
              <Image
                source={require('../../../assets/img/notification.png')}
                style={styles.reporticon}
              />
              <AppText
                size={14}
                family="PoppinsMedium"
                color={COLORS.whiteFBFB}
                horizontal={15}>
                They won't be notified that you blocked them.
              </AppText>
            </View>
            <View style={styles.message}>
              <Image
                source={require('../../../assets/img/settings.png')}
                style={styles.reporticon}
              />
              <AppText
                size={14}
                family="PoppinsMedium"
                color={COLORS.whiteFBFB}
                horizontal={15}>
                You can unblock them anytime in Settings.
              </AppText>
            </View>
            <View style={{marginVertical: ms(3)}} />
            <SubmitButton
              title={'Block'}
              pressing={() => UserFollowApi('block')}
              widthOf={'98%'}
            />
            <View style={{marginTop: 15}}>
              <AppText
                size={12}
                family="PoppinsLight"
                color={COLORS.grey999}
                align="center">
                
              </AppText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default BlockView;
