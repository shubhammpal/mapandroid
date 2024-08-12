import {View, Text} from 'react-native';
import React from 'react';
import InnerBikeModalScreen from './Innerbikemodel';

const InnerBikeUpdate = ({navigation, route}: any) => {
  return (
    <View style={{flex: 1}}>
      <InnerBikeModalScreen navigation={navigation} route={route} />
    </View>
  );
};

export default InnerBikeUpdate;
