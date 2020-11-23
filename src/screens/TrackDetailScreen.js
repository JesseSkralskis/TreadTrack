import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Polyline } from "react-native-maps";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/Spacer";
import useStats from "../hooks/useStats";

export default function TrackDetailScreen({ navigation }) {
  const [milesOrKph, setMilesOrKph] = useState("switch to kilometers");
  const handleSwitch = () => {
    if (milesOrKph === "switch to kilometers") {
      setMilesOrKph("switch to miles");
    } else {
      setMilesOrKph("switch to kilometers");
    }
  };

  const id = navigation.state.params.id;
  const [
    track,
    miles,
    kilometers,
    avMph,
    avKph,
    startTime,
    endTime,
    totalTime,
    mhigh,
    mlow,
    khigh,
    klow,
  ] = useStats(id);

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Spacer>
        <Text style={styles.header} h4>
          {track.name}
        </Text>
      </Spacer>

      <MapView
        style={styles.map}
        initialRegion={{
          ...track.locations[0].coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeWidth={5}
          strokeColor="rgba(0,0,255,0.7)"
          lineCap="round"
        />
      </MapView>
      <Spacer />
      <Spacer>
        <View style={styles.container}>
          <Text style={styles.header} h4>
            Stats
          </Text>

          <TouchableOpacity onPress={handleSwitch}>
            <Text style={styles.switcher}>{milesOrKph}</Text>
          </TouchableOpacity>
        </View>
      </Spacer>

      <Text style={styles.text}>
        <Text style={styles.nested}>Total Time:</Text> {totalTime.hours} hours{" "}
        {totalTime.minutes} minutes {totalTime.seconds} seconds
      </Text>

      <Text style={styles.text}>
        <Text style={styles.nested}>Start Time:</Text> {startTime}
      </Text>

      <Text style={styles.text}>
        <Text style={styles.nested}>End Time:</Text> {endTime}
      </Text>
      {milesOrKph === "switch to kilometers" ? (
        <Text style={styles.text}>
          <Text style={styles.nested}>Total Distance:</Text> {miles} Miles
          travelled
        </Text>
      ) : (
        <Text style={styles.text}>
          <Text style={styles.nested}>Total Distance:</Text> {kilometers}{" "}
          Kilometers travelled
        </Text>
      )}
      {milesOrKph === "switch to kilometers" ? (
        <Text style={styles.text}>
          <Text style={styles.nested}>Average Speed:</Text> {avMph} Miles per
          hour
        </Text>
      ) : (
        <Text style={styles.text}>
          <Text style={styles.nested}>Average Speed:</Text> {avKph} Kilometers
          per hour
        </Text>
      )}
      {milesOrKph === "switch to kilometers" ? (
        <Text style={styles.text}>
          <Text style={styles.nested}>High Speed:</Text> {mhigh} Miles per hour
        </Text>
      ) : (
        <Text style={styles.text}>
          <Text style={styles.nested}>High Speed:</Text> {khigh} Kilometers per
          hour
        </Text>
      )}
      {milesOrKph === "switch to kilometers" ? (
        <Text style={styles.text}>
          <Text style={styles.nested}>Low Speed:</Text> {mlow} Miles per hour
        </Text>
      ) : (
        <Text style={styles.text}>
          <Text style={styles.nested}>Low Speed:</Text> {klow} Kilometers per
          hour
        </Text>
      )}
    </SafeAreaView>
  );
}

TrackDetailScreen.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  text: {
    marginVertical: 10,
    marginLeft: 30,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
  },
  nested: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "white",
  },
  switcher: {
    textAlign: "center",
    color: "blue",
    marginTop: 15,
  },
  maincontainer: {
    backgroundColor: "white",
    flex: 1,
  },
});
