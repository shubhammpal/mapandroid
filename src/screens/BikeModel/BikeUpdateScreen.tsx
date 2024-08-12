import { View, Text } from 'react-native'
import React from 'react'
import BikeModalScreen from '.'

const BikeUpdateScreen = ({navigation, route}: any) => {
  return (
    <View style={{flex: 1}}>
      <BikeModalScreen navigation={navigation} route={route}  />
    </View>
  )
}

export default BikeUpdateScreen