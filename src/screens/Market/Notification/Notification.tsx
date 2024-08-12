//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import SimpleHeader from '../../../component/header/Header';
import Animated from 'react-native-reanimated';
import {moderateScale} from 'react-native-size-matters';
import NotificationCard from './NotificationCard';
import {styles} from './NotificationStyle';

// create a component
const NotificationScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.Cardcontainer}>
      <View>
        <SimpleHeader label="Notifications" navigation={navigation} />
      </View>
      <Animated.ScrollView>
        <View style={styles.CardsubContainer}>
          <NotificationCard
            text={'Apex Venomous D/V Gloss Helmet'}
            price={4552}
          />
          <NotificationCard
            text={'Apex Venomous D/V Gloss Helmet'}
            price={4552}
          />
          <NotificationCard
            text={'Apex Venomous D/V Gloss Helmet'}
            price={4552}
          />
          <NotificationCard
            text={'Apex Venomous D/V Gloss Helmet'}
            price={4552}
          />
          <NotificationCard
            text={'Apex Venomous D/V Gloss Helmet'}
            price={4552}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

//make this component available to the app
export default NotificationScreen;
