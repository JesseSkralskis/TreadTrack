// import "../_mocklocations";
import React, { useContext, useCallback } from "react";
import { View, StyleSheet, Text } from "react-native";
import Map from "../components/Map";
import TrackForm from "../components/TrackForm";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Context } from "../context/locationContext";
import UseLocation from "../hooks/useLocation";
import Spacer from "../components/Spacer";
import { FontAwesome } from "@expo/vector-icons";
//we need is focused so we can controll if tracking will continue when user is not on the trackcreate screen
function TrackCreateScreen({ isFocused }) {
  //use call back is used to limit the amount of callback functions to avoid infinite loops
  //allows us to say only change the call back function when the dependency is changed
  //so in this case when we change the paramater of state.recording to true
  //then it will fire the new call back

  const {
    addLocation,
    state: { recording },
  } = useContext(Context);

  const callBack = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  //if either we are focused on the screen or recording is happening kepp tracking
  const [error] = UseLocation(isFocused || recording, callBack);

  return (
    <SafeAreaView>
      <Map />
      {error && <Text>Please enable location services</Text>}
      <Spacer />
      <TrackForm />
    </SafeAreaView>
  );
}
//how to add icons to bottom navigator
TrackCreateScreen.navigationOptions = {
  title: "add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

export default withNavigationFocus(TrackCreateScreen);
