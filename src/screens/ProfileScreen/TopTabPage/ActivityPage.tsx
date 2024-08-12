import { View, Text } from 'react-native'
import React from 'react'
import Myactivities from '../../Tabbarscreens/Myactivities/Myactivities'

const ActivityPage = ({navigation, data,}: any) => {
  return (
    <View style={{flex: 1,}}>
      <Myactivities data={data} profile={'profile'}/>
    </View>
  )
}

export default ActivityPage