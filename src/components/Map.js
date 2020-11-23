import React, { useContext, useState } from "react";
import { Text, StyleSheet, ActivityIndicator } from "react-native";
import { Context } from "../context/locationContext";
//how to get maps
import MapView, { Polyline, Circle } from "react-native-maps";

export default function Map() {
  const {
    state: { currentLocation, locations },
  } = useContext(Context);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <MapView
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      style={styles.map}
    >
      <Circle
        center={currentLocation.coords}
        radius={30}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158, 158, 255, 0.3)"
      />
      <Polyline
        coordinates={locations.map((loc) => loc.coords)}
        strokeWidth={5}
        strokeColor="rgba(0,0,255,0.7)"
        lineCap="round"
      />
    </MapView>
  );
}
const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
