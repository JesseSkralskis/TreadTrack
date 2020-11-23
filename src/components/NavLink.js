import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { withNavigation } from "react-navigation";

export function NavLink({ navigation, text, routeName }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.signIn}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  signIn: {
    color: "blue",
    textAlign: "center",
  },
});

export default withNavigation(NavLink);
