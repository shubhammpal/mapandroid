import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { COLORS } from '../../style'

const PostLinkPage = () => {
  return (
    <View style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <ScrollView style={{ backgroundColor: COLORS.black, flex: 1 }}>
        <Text>PostLinkPage</Text>
      </ScrollView>
    </View>
  )
}

export default PostLinkPage