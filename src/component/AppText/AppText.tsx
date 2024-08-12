import { View, Text, StyleSheet, StyleProp, TextStyle, Animated } from 'react-native'
import React from 'react'
import { fonts } from '../../utils/misc'

type AppTextProps = {
  size?: number,
  color?: string,
  family?: 'PoppinsBlack' |  'PoppinsBold' | 'PoppinsExBold' | 'PoppinsExLight' | 
  'PoppinsLight' | 'PoppinsMedium' | 'PoppinsRegular' | 'PoppinsSemiB' | 'PoppinsThin' | string
  align?: 'left' | 'center' | 'right'
  transform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none'
  numLines?: number
  children?: React.ReactNode | React.ReactNode[]
  testID?: string,
  animateValue?: any,
  customColor?: string,
  spacing?:any,
  horizontal?:any,
  underlineColor?:any,
  underline?: 'underline' | 'line-through' | 'none' | 'underline line-through'
  onPress?:any,
  dotMode?: 'head' | 'tail' | 'middle' | 'clip'
  width?:any
  maxWidth?:any

} 
const AppText = ({ size, color, family, align,width, underlineColor,underline,onPress,transform, numLines,spacing, horizontal,children, testID, customColor, dotMode, animateValue, maxWidth }: AppTextProps) => {

  let fontFamily: any
  switch (family) {
    case 'PoppinsBlack': {
      fontFamily = fonts.PoppinsBlack //
      break
    }
    case 'PoppinsBold': {
      fontFamily = fonts.PoppinsBold
      break
    }
    case 'PoppinsExBold': {
      fontFamily = fonts.PoppinsExBold
      break
    }
    case 'PoppinsExLight': {
      fontFamily = fonts.PoppinsExLight
      break
    }
    case 'PoppinsLight': {
      fontFamily = fonts.PoppinsLight
      break
    }
    case 'PoppinsMedium': {
      fontFamily = fonts.PoppinsMedium
      break
    }
    case 'PoppinsRegular': {
      fontFamily = fonts.PoppinsRegular
      break
    }
    case 'PoppinsSemiB': {
      fontFamily = fonts.PoppinsSemiB
      break
    }
    case 'PoppinsThin': {
      fontFamily = fonts.PoppinsThin
      break
    }

    
  }
  const style: StyleProp<TextStyle> = {
    color: color ? color : 'black',
    fontSize: size,
    fontFamily: fontFamily,
    textAlign: align,
    textTransform: transform,
    letterSpacing:spacing,
    paddingHorizontal:horizontal,
    textDecorationLine:underline,
    textDecorationColor:underlineColor,
    width:width,  
    maxWidth:maxWidth  
  }
  return (
    <Animated.Text style={[style, animateValue && { transform: [{ scale: animateValue }] }]} numberOfLines={numLines} ellipsizeMode={dotMode} onPress={onPress}>{children}</Animated.Text>
  )
}
const styles = StyleSheet.create({
  mainText: {}
})

export default AppText