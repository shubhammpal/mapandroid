import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { COLORS, ms } from '../../style';
import { fonts } from '../../utils/misc';
import Home from '../../screens/HomeScreen';
import MapScreen from '../../screens/MapScreen';
import { BikerideIcon, HomeIcon, MarketIcon, ProfileIcon } from '../../assets/svgImg/SvgImg';
import { BlurView } from '@react-native-community/blur';
import TopTabScreen from '../../screens/ProfileScreen/TopTabScreen';
import Market from '../../screens/Market/Home/Market';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useContext, useEffect, useRef } from 'react';
import AppText from '../AppText/AppText';
import { useNavigation } from '@react-navigation/native';
import { strings } from '../../utils/strings';
import { AuthContext } from '../auth/AuthContext';


const Tab = createBottomTabNavigator();
const BottomTab = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const navigation = useNavigation()
  const { userDetails }: any = useContext(AuthContext);
  
  return (
    <>
      <Tab.Navigator
        initialRouteName={'Homes'}
        detachInactiveScreens={false}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarShowLabel: false,
          headerBackgroundContainerStyle: {
            backgroundColor: COLORS.black131
          },
          tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderTopWidth: 0,

            height: Platform.OS == 'ios' ? 85 : 75,
            paddingTop: Platform.OS == 'ios' ? 10 : 0,

          },
          tabBarBackground: () => <BlurView
            style={{ flex: 1 }}
            blurType="dark"
            blurAmount={1000}
            reducedTransparencyFallbackColor="black"
            overlayColor='transparent'
          />,
          tabBarHideOnKeyboard: true,
          tabBarAllowFontScaling: true,
        }}>

        <Tab.Screen
          name={strings.HOME}
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View style={styles.container}>
                    <HomeIcon active={focused} />

                  </View>
                  <Text style={[styles.labelText, { color: focused ? COLORS.blue : COLORS.white, fontFamily: focused ? fonts.PoppinsBold : fonts.PoppinsMedium, }]}>
                    {'HOME'}</Text>
                </View>
              );
            },
            headerShown: true,
            headerTransparent: true,
          }}
        />

        <Tab.Screen
          name={strings.MAP}
          component={() => null} // Render nothing here
          listeners={{
            tabPress: e => {
              e.preventDefault();
              actionSheetRef.current?.show()
            },
          }}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <View>
                <View style={styles.container}>
                  <BikerideIcon active={focused} />
                </View>
                <Text style={[styles.labelText, { color: focused ? COLORS.blue : COLORS.white, fontFamily: focused ? fonts.PoppinsBold : fonts.PoppinsMedium, }]}>
                  {'RIDE'}
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name={strings.MARKET}
          component={Market}
          options={{
            headerShown: false,
            title: "MarketPlace",
            headerTitleStyle: {
              fontFamily: fonts.PoppinsBold,
              fontSize: 20,
              textAlign: 'center',
              color: COLORS.white
            },

            headerStyle: {
              backgroundColor: COLORS.black,

            },
            headerShadowVisible: false,
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View style={styles.container}>
                    <MarketIcon active={focused} />

                  </View>
                  <Text style={[styles.labelText, { color: focused ? COLORS.blue : COLORS.white, fontFamily: focused ? fonts.PoppinsBold : fonts.PoppinsMedium, }]}>
                    {'MARKET'}</Text>
                </View>
              );
            },
          }}
        />

       


        <Tab.Screen
          name={strings.PROFILE_SCREEN}
          component={TopTabScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <View style={styles.container}>
                    {userDetails?.profile_picture != null ||
                      userDetails?.profile_picture != undefined ? (
                      <Image
                        source={{ uri: userDetails?.profile_picture }}
                        style={styles.avatar}
                      />
                    ) : (
                      <ProfileIcon active={focused} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.labelText,
                      {
                        color: focused ? COLORS.blue : COLORS.white,
                        fontFamily: focused
                          ? fonts.PoppinsBold
                          : fonts.PoppinsMedium,
                        bottom: 1.5,
                      },
                    ]}>
                    {'PROFILE'}
                  </Text>
                </View>
              );
            },
          }}
        />


      </Tab.Navigator>
      <ActionSheet ref={actionSheetRef} containerStyle={{ backgroundColor: COLORS.black, }} overlayColor='black'>
        <View style={styles.contentContainer}>
          <View style={{ height: 10 }} />
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              actionSheetRef.current?.hide()
              navigation.navigate("Mapscreen");

            }}>
            <View style={styles.icons}>
              <Image
                source={require('../../assets/img/soloRide.png')}
                style={{ height: 40, width: 40 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <AppText
                color={COLORS.white}
                size={14}
                family={'PoppinsBold'}
                horizontal={15}>
                Solo Ride
              </AppText>
              <AppText
                color={COLORS.grey92}
                size={10}
                family={'PoppinsMedium'}
                horizontal={15}>
                Ride solo, wherever you can
              </AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => {
              actionSheetRef.current?.hide()
              navigation.navigate(strings.PROFILE_SCREEN, { profile: 2 })
            }}>
            <View style={styles.icons}>
              <Image
                source={require('../../assets/img/groupRide.png')}
                style={{ height: 40, width: 40 }}
                resizeMode="contain"
              />
            </View>
            <View>
              <AppText
                color={COLORS.white}
                size={14}
                family={'PoppinsBold'}
                horizontal={15}>
                Group Ride
              </AppText>
              <AppText
                color={COLORS.grey92}
                size={10}
                family={'PoppinsMedium'}
                horizontal={15}>
                Create you own group and ride with your friends
              </AppText>
            </View>
          </TouchableOpacity>
          <View style={{ height: 20 }} />
        </View>
      </ActionSheet>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },
  activeLine: {
    borderWidth: 2,
    borderColor: '#25C4DC',
    width: 96,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? -32 : -26
  },
  warrantyactiveLine: {
    borderWidth: 2,
    borderColor: '#25C4DC',
    width: 120,
    position: 'absolute',
    bottom: -34
  },
  labelText: {
    fontSize: 12, textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: ms(4),
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icons: {
    backgroundColor: COLORS.black3232D,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
})
export default BottomTab;