import React, { useContext } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
//way to take in props that trigger on navigation events
import { NavigationEvents } from "react-navigation";

import { Context } from "../context/authContext";
import AuthenticationForm from "../components/AuthenticationForm";
import NavLink from "../components/NavLink";
export default function SignIn({ navigation }) {
  const { state, signIn, clearError } = useContext(Context);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearError} />
      <AuthenticationForm
        onSubmit={signIn}
        error={state.error}
        title="Sign In"
        submitText="Sign In"
      />
      <NavLink routeName="SignUp" text="Dont have an Account? Go to Sign up" />
    </View>
  );
}

SignIn.navigationOptions = () => {
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
