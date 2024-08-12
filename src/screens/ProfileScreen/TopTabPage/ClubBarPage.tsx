import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ClubScreen from '../../Tabbarscreens/Club/Club'

const ClubBarPage = ({navigation, data, setadressheight}: any) => {
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    
    if(height){}
    // setadressheight(height);
  };
  return (
    <View style={{flex: 1}}>
      
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
      <Text>djjdjdj</Text>
    </View>
  )
}

export default ClubBarPage