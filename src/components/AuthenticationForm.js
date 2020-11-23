import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./Spacer";

export default function AuthenticationForm({
  onSubmit,
  title,
  error,

  submitText,
}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <>
      <Spacer></Spacer>
      <Spacer />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
        label="Email"
      />
      <Spacer />

      <Input
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={(text) => setPassword(text)}
        label="Password"
      />
      <Spacer />
      {error && <Text style={styles.error}>{error}</Text>}
      <Spacer>
        <Button onPress={() => onSubmit(email, password)} title={submitText} />
      </Spacer>
      <Spacer />
    </>
  );
}

AuthenticationForm.navigationOptions = () => {
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
  text: {
    textAlign: "center",
  },

  error: {
    color: "red",
    textAlign: "center",

    paddingBottom: 20,
  },
});
