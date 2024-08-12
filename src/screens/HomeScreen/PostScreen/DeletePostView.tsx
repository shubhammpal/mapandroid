import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { COLORS } from '../../../style';
import { styles } from '../styles';
import AppText from '../../../component/AppText/AppText';
import ImgView from '../../../component/ImgView/ImgView';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity)

const DeletePostView = ({ actionSheetRef, UserFollowApi, userId, setScreenData }: any) => {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            actionSheetRef.current?.hide()
          }}>
          <View style={styles.blockContainer}>

            <View style={{ marginVertical: 10 }}>
              <AppText
                size={16}
                family="PoppinsBold"
                color={
                  COLORS.white
                }>{"Are you sure you want to delete this post?"}</AppText>
            </View>
            <AppText
              size={12}
              family="PoppinsLight"
              color={COLORS.grey999}
              align="center">
              This action cannot be undone.
            </AppText>

          

            <View style={{ marginVertical: ms(3), flexDirection: 'row',
             alignItems: 'center', 
             width: '90%' ,
             justifyContent:'space-between',
             marginTop:12}} >
            <AnimatedBtn style={[styles.buttonContainerDelete, { width: '45%', borderColor: COLORS.blue, borderWidth: 1, height: 55, }]}
              onPress={() => {setScreenData() }} >
              {<AppText size={18} color={COLORS.blue} align='center' family='PoppinsBold'>{'Cancel'}</AppText>}
            </AnimatedBtn>
            <SubmitButton
              title={'Delete Post'}
              pressing={() => UserFollowApi('deletePost')}
              widthOf={'45%'}
            />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default DeletePostView;
