/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
PushNotification.createChannel(
  {
    channelId: 'foreground_noti', // Change this to a unique ID for your channel
    channelName: 'My Channel', // Change this to a custom channel name
    channelDescription: 'A channel to categorize your notifications',
    soundName: 'default', // Change this to the sound file you want to play for notifications
    importance: 4, // Change this to set the importance level of the notification
    vibrate: true, // Change this to enable or disable vibration for notifications
  },
  created => console.log(`Channel 'channel-id' created: ${created}`),
);

AppRegistry.registerComponent(appName, () => App);
