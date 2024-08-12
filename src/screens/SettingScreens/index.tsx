import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { styles } from './styles'
import AppText from '../../component/AppText/AppText'
import { COLORS } from '../../style'
import { ArrowBAckIcon, CommunityIcon, DeleteIcon, MobileIcon } from '../../assets/svgImg/SvgImg'
import { strings } from '../../utils/strings'
import { AuthContext } from '../../component/auth/AuthContext'
import { requestDeleteAccount } from '../../services/api_Services'

const SettingScreen = ({ navigation }: any) => {
  const { userDetails, userToken, logoutPress }: any = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const Deleteaccountapi = async () => {
    setModalVisible(false)
    const data: any = {
      user_id: userDetails?.id,
      token: userToken
    };
    try {
      await requestDeleteAccount(data).then(async (res: any) => {
        
        logoutPress()
      });
    } catch (error) {
      console.log('Login response: ', error);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <SafeAreaView />
      <ScrollView contentContainerStyle={styles.scrollview} >
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
              Settings
            </AppText>
          </View>
          <TouchableOpacity style={[styles.row, { marginVertical: 30 }]} onPress={() => navigation.navigate(strings.UPDATE_MOBILE)}>
            <MobileIcon active={COLORS.white} />
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>Update Mobile Number</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.row]} onPress={() => navigation.navigate(strings.CLUB_ONBOARDING)}>
            <CommunityIcon active={COLORS.white} />
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>Club Onboarding</AppText>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.row,{ marginVertical: 30 }]} onPress={() => setModalVisible(true)}>
            <DeleteIcon active={COLORS.white} />
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>Delete Account</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalDataContainer}>
            <DeleteIcon active={COLORS.black} width={50} height={50}/>
            <View style={{marginTop:20}}/>
            <AppText size={18} color={COLORS.black131} family='PoppinsMedium' horizontal={20} align='center'>Are you sure you want to Delete Account?</AppText>
            <View style={styles.modalBtnContainer}>
              <TouchableOpacity
                onPress={() => {
                  Deleteaccountapi()
                }}
                style={styles.yesButton}
              >
                <AppText size={18} color={COLORS.white} family='PoppinsMedium' horizontal={20}>Yes</AppText>

              </TouchableOpacity>
              <TouchableOpacity
                style={styles.noButton}
                onPress={() => setModalVisible(false)}
              >
            <AppText size={18} color={COLORS.black} family='PoppinsMedium' horizontal={20}>No</AppText>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default SettingScreen