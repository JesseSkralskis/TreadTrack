import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/authContext";
import { SafeAreaView } from "react-navigation";
import { FontAwesome } from "@expo/vector-icons";

export default function AccountScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView
      forceInset={{
        top: "always",
      }}
    >
      <Spacer />
      <Text style={styles.text} h3>
        Account
      </Text>
      <Spacer />
      <Spacer />
      <Button onPress={logout} style={styles.button} title="logout" />
      <Spacer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  button: {
    marginHorizontal: 50,
  },
});

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <FontAwesome name="gear" size={20} />,
};
