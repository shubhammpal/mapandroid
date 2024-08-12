import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../../style'
import ImgView from '../../component/ImgView/ImgView'
import Animated from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element'
import { string } from 'yup'
import { strings } from '../../utils/strings'

const ImageDetails = ({ navigation, route }: any) => {
  
  return (
    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.black }} onPress={() => navigation.navigate(strings.PROFILE_SCREEN)} activeOpacity={1}>
      <TouchableOpacity style={{ width: "100%", height: 600, borderRadius: 10 }} activeOpacity={1}>
      <SharedElement id={`item.${1}.logo`}>
          <Image
            source={{ uri: route?.params?.url }}
            style={{ width: "100%", height: 600, borderRadius: 10 }}
          />
        </SharedElement>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
ImageDetails.sharedElements = (route: any) => {
  const { item } = route.params;
  return [`item.${item?.id}.logo`];;
}

export default ImageDetails