import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spacer from "../components/Spacer";

export default function Landing({ navigation }) {
  return (
    <>
      <ImageBackground
        style={styles.bg}
        source={require("../../assets/dude.jpg")}
      >
        <View style={styles.logoBox}>
          <Text h1 style={styles.text}>
            Tread Track
          </Text>

          <MaterialCommunityIcons
            size={55}
            style={styles.icon}
            name="run-fast"
          />
        </View>

        <View style={styles.loginBox}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

Landing.navigationOptions = () => {
  return {
    header: () => false,
  };
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "space-around",
    paddingBottom: 300,

    resizeMode: "cover",
  },
  text: {
    fontWeight: "700",
    color: "#f2f2f2",
    textAlign: "center",
  },
  icon: {
    color: "#f2f2f2",
    textAlign: "center",
  },
  logoBox: {
    marginTop: 300,
    marginBottom: 200,
  },

  loginBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    height: 100,
  },
  loginText: {
    color: "#f2f2f2",
    fontSize: 20,
  },
});
