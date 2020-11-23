import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import { ListItem, Button } from "react-native-elements";
import { Context } from "../context/authContext";
import { Context as TrackContext } from "../context/trackContext";
import { NavigationEvents } from "react-navigation";
import { SafeAreaView } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { Context as LocationContext } from "../context/locationContext";

export default function TrackListScreen({ navigation }) {
  const { getTracks, state, removeTrack } = useContext(TrackContext);
  const handleDelete = (id) => {
    removeTrack(id);
    navigation.navigate("ResolveAuthScreen");
  };

  return (
    <SafeAreaView>
      <NavigationEvents
        onWillFocus={async () => {
          await getTracks();
        }}
      />

      <FlatList
        keyExtractor={(item) => item._id}
        data={state}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("TrackDetailScreen", { id: item._id });
            }}
          >
            <ListItem
              containerStyle={{
                backgroundColor: "#dce0e6",
                justifyContent: "space-evenly",
              }}
              topDivider
              bottomDivider
              style={styles.item}
            >
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron
                size={25}
                style={{
                  marginRight: 40,
                }}
                color="white"
              />
              <Button
                onPress={() => handleDelete(item._id)}
                type="clear"
                style={styles.button}
                icon={
                  <Feather
                    size={18}
                    style={{
                      marginRight: 20,
                    }}
                    name="delete"
                  />
                }
              />
            </ListItem>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {},
  icon: {},
});
