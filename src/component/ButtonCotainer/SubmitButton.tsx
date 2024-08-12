import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { COLORS } from '../../style'
import AppText from '../AppText/AppText'
const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity)
type SubmitButtonProps = {
  title: string
  pressing: () => void
  widthOf?: any
  loader?: any
  colorChange?: any
  colortext?: any
  width?: any
  height?:any
  disabled?:any
}

const SubmitButton = ({ title, pressing, widthOf, loader, colorChange, colortext ,height,disabled}: SubmitButtonProps) => {
  const [loading, setLoading] = useState(false);
  const animatedWidth = useSharedValue(widthOf)
  const animatedRadius = useSharedValue(4)
 
  useEffect(() => {
    if (loader == true) {
      animatedWidth.value = withTiming(50, { duration: 500 });
      animatedRadius.value = withTiming(4, { duration: 500 });
      setLoading(true);
    }
  }, [loader])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
      borderRadius: animatedRadius.value
    }
  })
  
  useEffect(() => {
    if (loader == false) {
      setLoading(false);
      // Revert back to initial width after 5 seconds
      animatedWidth.value = withTiming(widthOf, { duration: 500 });
      animatedRadius.value = withTiming(4, { duration: 500 });
    }
  }, [loader])

  return (
    <AnimatedBtn style={[styles.buttonContainer, { width: widthOf, backgroundColor:colorChange ? colorChange: COLORS.blue,height: height ? height : 55, },animatedStyle]} onPress={() => {
      pressing()
    }} disabled={disabled}>
      {
        loading ? (
          <ActivityIndicator size={32} color={COLORS.white} />
        ) : (
          <AppText size={18} color={colortext ? colortext :COLORS.white} align='center'family='PoppinsBold'>{title}</AppText>
        )
      }
    </AnimatedBtn>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    alignSelf:'center'
  }
})

export default SubmitButton