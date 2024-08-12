import React, { useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Routes from './src/component/navigations/Routes'
import { PaperProvider } from 'react-native-paper'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import AlertPage from './src/component/Emitter/AlertPage'
import { AuthProvider } from './src/component/auth/AuthContext'
import Splash from './src/screens/Splash'
import InternetBox from './src/component/InternetBox/Internetbox'
import { useNavigation } from '@react-navigation/native'
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Alert, PermissionsAndroid, Platform } from 'react-native'
import { notificationListener, notificationListenerdummy, requestUserPermission } from './src/services/pushnotification_helper'
import ForegroundHandlerIOS from './src/services/foregroundHandlerIOS'
import { ForegroundHandler } from './src/services/foregroundHandler'

const App = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const navigationRef = React.useRef(null)
  useEffect(() => {
    checkApplicationPermission()
    requestUserPermission()
    notificationListener(navigation)
    notificationListenerdummy()
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
      }
    }
  };

  return (
    <AuthProvider>
      <GestureHandlerRootView>
        <PaperProvider >
          <BottomSheetModalProvider>
            <SafeAreaProvider>
              {
                loading == false && (
                  Platform.OS == 'ios' ? <ForegroundHandlerIOS navigation={navigationRef.current} /> : <ForegroundHandler navigation={navigationRef.current} />
                )
              }
              {loading === true ? <Splash /> : <Routes />}
              <AlertPage />
              <InternetBox />
            </SafeAreaProvider>
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  )
}

export default App