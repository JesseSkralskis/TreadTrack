////how to create helper styling function for spacing

import React from "react";
import { View, StyleSheet } from "react-native";

export default function Spacer({ children }) {
  return <View style={styles.spacer}>{children}</View>;
}

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },
});
