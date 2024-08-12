import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  StyleProp,  
  ViewStyle,
} from 'react-native';
import MultiSlider, {LabelProps} from '@ptomasroos/react-native-multi-slider';
import {COLORS} from '../../style';
import {fonts} from '../../utils/misc';

const customMarker = (triangleStyle: StyleProp<ViewStyle>) => (
  <View style={styles.shadowBg}>
    <View style={styles.markerStyle}></View>
  </View>
);
type RangeSliderViewProps = {
  setMiniMum: any;
  setMaximum: any;
  maximum: any;
  miniMum: any;
};

const RangeSliderView = ({
  setMiniMum,
  setMaximum,
  maximum,
  miniMum,
}: RangeSliderViewProps) => {
  const {width} = useWindowDimensions();
  const mainWidth: any = width * 0.85;
  const {containerStyle, trackStyle, selectedStyle} = styles;
  const customLabel = useCallback(
    (prop: LabelProps) => {
      const {oneMarkerValue, twoMarkerValue} = prop;

      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
            }}>
            <Text style={styles.rangeText}>{oneMarkerValue} min</Text>
            <Text style={styles.rangeText}> - </Text>
            <Text style={styles.rangeText}>{twoMarkerValue} max </Text>
          </View>
          <View></View>
        </>
      );
    },
    [mainWidth],
  );

  return (
    <MultiSlider
      {...{containerStyle, trackStyle, selectedStyle}}
      markerContainerStyle={{height: 52}}
      values={[miniMum, maximum]}
      sliderLength={mainWidth - 0}
      max={50000}
      allowOverlap
      isMarkersSeparated
      customMarkerLeft={_ => customMarker(styles.triangleLeftStyle)}
      customMarkerRight={_ => customMarker(styles.triangleRightStyle)}
      enableLabel
      customLabel={props => customLabel(props)}
      onValuesChangeFinish={values => {
        setMiniMum(values[0]);
        setMaximum(values[1]);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  trackStyle: {
    backgroundColor: 'lightgrey',
    height: 4,
    borderRadius: 8,
  },
  rangeText: {
    color: 'rgba(2, 36, 45, 0.7)',
    fontFamily: fonts.PoppinsRegular,
    opacity: 0.7,
    fontSize: 16,
  },
  selectedStyle: {
    backgroundColor: COLORS.blue,
    height: 6,
    borderRadius: 8,
  },
  sliderLabel: {minWidth: 50, padding: 8},
  sliderLabelText: {
    color: 'black',
    textAlign: 'center',
  },
  triangleRightStyle: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 7,
  },
  triangleLeftStyle: {
    width: 0,
    height: 0,
    borderRightWidth: 8,
    borderBottomWidth: 5,
    borderTopWidth: 5,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderRightColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 5,
  },
  markerStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    borderColor: 'white',
    borderWidth: 2,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 7.49,
  },
  shadowBg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    // backgroundColor: 'rgba(128, 128, 128, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 12,
  },
});

export default RangeSliderView;
