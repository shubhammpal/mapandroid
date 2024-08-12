import * as React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import MapboxNavigation from "@homee/react-native-mapbox-navigation";
 
export const MapBox = ({navigation, setDirectionRouteDetails, origin, currentLocation, setScreenData, imageAnnotations, setDestinationArrivedBox, handleSubmit, setTraveledPath}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MapboxNavigation
        origin={origin}
        destination={currentLocation}
        imageAnnotations={imageAnnotations}
        hideStatusView
        onLocationChange={(event) => {
          const { latitude, longitude } = event.nativeEvent;
          setTraveledPath((prevPath: any) => [...prevPath, [longitude, latitude]]);
        }}
        onRouteProgressChange={(event) => {
          const {
            distanceTraveled,
            durationRemaining,
            fractionTraveled,
            distanceRemaining,
          } = event.nativeEvent;
          console.log(event.nativeEvent)
          
          setDirectionRouteDetails(event?.nativeEvent)
          
        }}
        onError={(event) => {
          const { message } = event.nativeEvent;
        }}
        onCancelNavigation={() => {
          
          setScreenData(0)
          
        }}
        onArrive={() => {
            
            handleSubmit()
          
          // Called when you arrive at the destination.
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.94,
  },
});

