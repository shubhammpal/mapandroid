import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const Skeleton = ({ type, width,height,borderRadius,style }:any) => {
  const renderShimmer = () => {
    switch (type) {
      case 'circle':
        return <View style={[{ width: width, height: height }]} />;
      case 'box':
        return <View style={[ { width: width, height: height }]} />;
      default:
        return <View style={[{ width: width, height: height }]} />;
    }
  };
  return (
    <ShimmerPlaceholder
      style={[style,{ height: height, width: width ,borderRadius:borderRadius}]}
      shimmerColors={['#B3B3B3', '#FFFFFF', '#B3B3B3',]}
    >
      {renderShimmer()}
    </ShimmerPlaceholder>
  );
};


export default Skeleton;
