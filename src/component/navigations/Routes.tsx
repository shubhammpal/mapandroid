import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import DrawerNavigation from './Drawer'

const Routes = () => {
  return (
   <NavigationContainer>
    <DrawerNavigation/>
   </NavigationContainer>
  )
}

export default Routes