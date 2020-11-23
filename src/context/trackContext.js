import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";

const trackReducer = (state, action) => {
  switch (action.type) {
    // case "error":
    //   return { ...state, error: action.error };

    case "get_tracks":
      return action.tracks;

    default:
      return state;
  }
};
const removeTrack = (dispatch) => {
  return async (id) => {
    console.log(id);
    const response = await trackerApi.put("/tracks", { id });

    dispatch({
      type: "get_tracks",
      tracks: response.data,
    });
  };
};

const getTracks = (dispatch) => {
  return async () => {
    const response = await trackerApi.get("/tracks");
    dispatch({
      type: "get_tracks",
      tracks: response.data,
    });
  };
};
const saveTrack = (dispatch) => {
  return async (name, locations) => {
    try {
      if (name) {
        await trackerApi.post("/tracks", {
          name,
          locations,
        });
      } else {
      }
    } catch (err) {
      dispatch({
        type: "error",
        error: "there was an error saving" + err,
      });
    }
  };
};

export const { Provider, Context } = createDataContext(trackReducer, {
  removeTrack,
  getTracks,
  saveTrack,
});
