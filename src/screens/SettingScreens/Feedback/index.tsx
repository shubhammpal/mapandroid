import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ArrowBAckIcon } from '../../../assets/svgImg/SvgImg';
import SubmitButton from '../../../component/ButtonCotainer/SubmitButton';
import emitter from '../../../component/Emitter/emitter';
import { AuthContext } from '../../../component/auth/AuthContext';
import AppText from '../../../component/AppText/AppText';
import { COLORS } from '../../../style';
import { styles } from '../Clubonboarding/styles';
import { requestFeedbackcreate } from '../../../services/api_Services';

const FeedbackScreen = ({ navigation }: any) => {
  const [description, setDescription] = React.useState<any>('');
  const [loader, setloader] = useState<boolean>(false);
  const { userDetails, userToken }: any = useContext(AuthContext);

  const Feedbackapi = async () => {
    const data: any = {
      user_id: userDetails?.id,
      feedback_text: description,
      token: userToken
    };
    setloader(true);
    try {
      await requestFeedbackcreate(data).then(async (res: any) => {
        const data = { heading: 'login', message: res?.message };
        emitter.emit('alert', data);
        navigation.goBack();
        setloader(false);
      });
    } catch (error) {
      console.log('Login response: ', error);
      setloader(false);
    }
  };
  return (
    <View style={styles.containerfeedback}>
      <SafeAreaView />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? 'padding' : ''} keyboardVerticalOffset={35}>
        <ScrollView contentContainerStyle={styles.scrollview} bounces={false} showsVerticalScrollIndicator={false}>

          <View style={styles.container}>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingVertical: 15, paddingRight: 15 }}>
                <ArrowBAckIcon />
              </TouchableOpacity>
              <AppText
                size={20}
                color={COLORS.white}
                family="PoppinsSemiB"
                horizontal={10}>
                Contact us
              </AppText>
            </View>
            <View style={styles.sharedView}>
              <Image
                source={require('../../../assets/img/bikelogo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              
            </View>
            <View style={styles.textinputConatiner}>
            <AppText family='PoppinsMedium' color={COLORS.white} size={15}>We love to hear from our club members. Happy to get feedback or answer your queries.
            connect with us by email <AppText family='PoppinsMedium' color={COLORS.blue} size={15} onPress={()=>Linking.openURL('mailto:support@mytra.club')}>support@mytra.club</AppText>.</AppText>
              <View style={[styles.descriptionContainer]}>
                <TextInput
                  value={description}
                  style={styles.input}
                  placeholderTextColor={COLORS.grey92}
                  placeholder='Your feedback'
                  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                />
              </View>

            </View>
          </View>
          <SubmitButton
            title={'Submit'}
            widthOf={'90%'}
            pressing={() => Feedbackapi()}
            loader={loader}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default FeedbackScreen;
