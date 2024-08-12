import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useContext } from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../../style';
import { styles } from '../styles';
import AppText from '../../../component/AppText/AppText';
import { DeleteIcon, EditIcon } from '../../../assets/svgImg/SvgImg';
import { strings } from '../../../utils/strings';
import { AuthContext } from '../../../component/auth/AuthContext';

const ActionView = ({
  actionSheetRef,
  status,
  UserFollowApi,
  navigation,
  userId,
  setScreenData,
 
}: any) => {
  const { userToken, userDetails }: any = useContext(AuthContext);

  
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => actionSheetRef.current?.hide()}>
          <View
            style={{
              marginVertical: ms(2),
              backgroundColor: COLORS.black,
            }}>
            <View style={styles.actionView}>
              {status == true && (
                <TouchableOpacity
                  style={styles.report}
                  onPress={() => UserFollowApi('unfollow')}>
                  <Image
                    source={require('../../../assets/img/remove-user.png')}
                    style={styles.reporticon}
                  />
                  <AppText
                    size={16}
                    family="PoppinsBold"
                    color={COLORS.greyC4C4}
                    horizontal={15}>
                    {'Unfollow'}
                  </AppText>
                </TouchableOpacity>
              )}
              {userId?.user?.id != userDetails?.id && (
                <TouchableOpacity
                  style={styles.report}
                  onPress={() => {
                    actionSheetRef.current?.hide();
                    navigation.navigate('Profile', { id: userId?.user?.id });
                  }}>
                  <Image
                    source={require('../../../assets/img/user.png')}
                    style={styles.reporticon}
                  />
                  <AppText
                    size={16}
                    family="PoppinsBold"
                    color={COLORS.greyC4C4}
                    horizontal={15}>
                    {'About this account'}
                  </AppText>
                </TouchableOpacity>
              )}
              {userId?.user?.id != userDetails?.id ? (
                <>
                  <TouchableOpacity
                    style={styles.report}
                    onPress={() => {
                      setScreenData(1);
                    }}>
                    <Image
                      source={require('../../../assets/img/block-user.png')}
                      style={styles.reporticon}
                    />
                    <AppText
                      size={16}
                      family="PoppinsBold"
                      color={COLORS.greyC4C4}
                      horizontal={15}>
                      {'Block'}
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.report}
                    onPress={() => {
                      setScreenData(2);
                    }}>
                    <Image
                      source={require('../../../assets/img/postreport.png')}
                      style={styles.reporticon}
                    />
                    <AppText
                      size={16}
                      family="PoppinsBold"
                      color={COLORS.greyC4C4}
                      horizontal={15}>
                      {'Report'}
                    </AppText>
                  </TouchableOpacity>
                </>
              )
                :
                <>
                <TouchableOpacity
                    style={styles.report}
                    onPress={() => {
                      setScreenData(4);
                    }}>
                    
                    <EditIcon />
                    <AppText
                      size={16}
                      family="PoppinsBold"
                      color={COLORS.greyC4C4}
                      horizontal={15}>
                      {'Edit'}
                    </AppText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.report}
                    onPress={() => {
                      setScreenData(3);
                    }}>
                   
              /> */}
                    <DeleteIcon />
                    <AppText
                      size={16}
                      family="PoppinsBold"
                      color={COLORS.greyC4C4}
                      horizontal={15}>
                      {'Delete post'}
                    </AppText>
                  </TouchableOpacity>
                </>
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default ActionView;
