import { requireNativeComponent, ViewProps } from 'react-native';
import React from 'react';

type UniqueMapViewProps = ViewProps & {
  // Add any additional props you want to pass to the native component here
};

const UniqueMapView = requireNativeComponent<UniqueMapViewProps>('UniqueMapManager');

const UniqueMapViewWrapper: React.FC<UniqueMapViewProps> = (props) => {
  return <UniqueMapView {...props} />;
};

export default UniqueMapViewWrapper;
