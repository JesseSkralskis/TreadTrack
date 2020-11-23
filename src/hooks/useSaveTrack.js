import React, { useContext } from "react";
import { Context as LocationContext } from "../context/locationContext";
import { Context as TrackContext } from "../context/trackContext";
import { navigate } from "../navigationRef";

export default () => {
  const {
    resetForm,
    state: { name, locations },
  } = useContext(LocationContext);

  const {
    saveTrack,
    state: { error },
  } = useContext(TrackContext);

  const handleSave = async () => {
    await saveTrack(name, locations);
    resetForm();
    navigate("TrackListScreen");
  };

  return [error, handleSave];
};
