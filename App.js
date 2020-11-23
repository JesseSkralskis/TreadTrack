import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignIn from "./src/screens/SignIn";
import AccountScreen from "./src/screens/AccountScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";

import SignUp from "./src/screens/SignUp";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from "./src/context/authContext";
import { setNavigator } from "./src/navigationRef";
import { Provider as LocationProvider } from "./src/context/locationContext";
import { Provider as TrackProvider } from "./src/context/trackContext";
import { FontAwesome } from "@expo/vector-icons";
import Landing from "./src/screens/Landing";
const trackListFlow = createStackNavigator({
  TrackListScreen,
  TrackDetailScreen,
});

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name="th-list" />,
};
const switchNavaigator = createSwitchNavigator({
  ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Landing,
    SignUp,
    SignIn,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow,
    TrackCreateScreen,
    AccountScreen,
  }),
});
//always need to wrap the navigator with the createapp container
//now app.js will render the Signup
const App = createAppContainer(switchNavaigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
