import React, { useContext } from "react";
import { Context as LocationContext } from "../context/locationContext";
import { StyleSheet, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import useSaveTrack from "../hooks/useSaveTrack";

import Spacer from "../components/Spacer";

function TrackForm() {
  const {
    state: { name, locations, recording },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [error, handleSave] = useSaveTrack();

  return (
    <>
      <Input value={name} onChangeText={changeName} placeholder="enter name" />
      <Spacer />
      {recording ? (
        <Button style={styles.button} onPress={stopRecording} title="stop" />
      ) : (
        <Button
          style={styles.button}
          onPress={startRecording}
          title="start Recording"
        />
      )}
      <Spacer />
      {!recording && locations.length ? (
        <Button
          style={styles.button}
          onPress={() => handleSave()}
          title="save"
        />
      ) : null}
      <Spacer />
      {error ? <Text>{error}</Text> : null}
    </>
  );
}
const styles = StyleSheet.create({
  button: { marginHorizontal: 60 },
});

export default TrackForm;
