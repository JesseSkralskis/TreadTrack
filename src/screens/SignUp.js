import React, { useContext } from "react";
import { NavigationEvents } from "react-navigation";

import { View, StyleSheet, ImageBackground } from "react-native";

import { Context } from "../context/authContext";
import AuthenticationForm from "../components/AuthenticationForm";
import NavLink from "../components/NavLink";

export default function SignUp() {
  const { signUp, state, clearError } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearError} />
      <AuthenticationForm
        error={state.error}
        title="Sign Up For Tracker"
        submitText="Sign Up"
        onSubmit={signUp}
      />
      <NavLink
        routeName="SignIn"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
}
SignUp.navigationOptions = () => {
  return {
    header: () => false,
  };
};
const styles = StyleSheet.create({
  container: {
    flex: 1, //makes expand to 100% of container or divided with other flexs
    justifyContent: "center",
    marginBottom: 200,
  },
});
//function that is fire when mounted for nav options
//navigationOptions must be spelled right to work
