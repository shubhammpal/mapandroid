import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import AppText from '../../component/AppText/AppText'
import { COLORS } from '../../style'
import { ArrowBAckIcon, CommunityIcon, DeleteIcon, MobileIcon } from '../../assets/svgImg/SvgImg'
import { strings } from '../../utils/strings'
import { styles } from './styles'


const PrivacyPolicyScreens = ({ navigation }: any) => {
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
              Policy
            </AppText>
          </View>
          <TouchableOpacity style={[{ marginVertical: 30 }]} onPress={() => navigation.navigate(strings.ABOUT_US)}>
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>ABOUT US</AppText>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate(strings.RETURN_POLICY)}>
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>RETURN AND REFUND POLICY</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={[ { marginVertical: 30 }]} onPress={() => navigation.navigate(strings.PRIVACY)}>
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>PRIVACY POLICY</AppText>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate(strings.TERMS_CONDITION)}>
            <AppText size={18} color={COLORS.greyC4C4} family='PoppinsMedium' horizontal={20}>TERMS AND CONDITIONS</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyScreens