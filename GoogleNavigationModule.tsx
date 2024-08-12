import { NativeModules } from 'react-native';
const { GoogleNavigationManager } = NativeModules;

const startNavigation = (destination) => {
  return GoogleNavigationManager.startNavigation({}, destination);
};

export default {
  startNavigation,
};
