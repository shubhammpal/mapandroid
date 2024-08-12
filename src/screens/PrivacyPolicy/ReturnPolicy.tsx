import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebView from 'react-native-webview'
import AppText from '../../component/AppText/AppText';
import { ArrowBAckIcon } from '../../assets/svgImg/SvgImg';
import { styles } from './styles';
import { COLORS } from '../../style';
const ReturnPolicy = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(delay);
  }, []);
  return (
    <SafeAreaView style={styles.contain}>
      <View style={styles.contain}>
      <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{paddingVertical: 15, paddingRight: 15}}>
            <ArrowBAckIcon />
          </TouchableOpacity>
          <AppText
            size={20}
            color={COLORS.black}
            family="PoppinsSemiB"
            align="center"
            horizontal={10}>
            RETURN AND REFUND POLICY
          </AppText>
        </View>
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <ActivityIndicator size={50} color={'black'} />
            </View>
          ) : (
            <WebView
            showsVerticalScrollIndicator={false}
              source={{ uri: 'https://mytra.club/returnpolicy' }}
              style={{ flex: 1 }} />
          )}
        </View>
        <View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ReturnPolicy