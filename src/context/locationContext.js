import { navigate } from "../navigationRef";
import createDataContext from "../context/createDataContext";

const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return {
        ...state,
        currentLocation: action.location,
      };
    
    

    case "add_location":
      return { ...state, locations: [...state.locations, action.location] };
    case "start_record":
      return { ...state, recording: true };
    case "stop_record":
      return { ...state, recording: false };
    case "change_name":
      return { ...state, name: action.name };
    case "reset":
      return { ...state, name: "", locations: [], recording: false };

    default:
      return state;
  }
};
const changeName = (dispatch) => (name) => {
  dispatch({
    type: "change_name",
    name,
  });
};
const resetForm = (dispatch) => {
  return () => {
    dispatch({
      type: "reset",
    });
  };
};

const startRecording = (dispatch) => () => {
  dispatch({ type: "start_record" });
};
const stopRecording = (dispatch) => () => {
  dispatch({ type: "stop_record" });
};

const addLocation = (dispatch) => {
  return (location, recording) => {
    dispatch({
      type: "add_current_location",
      location,
    });
    if (recording) {
      dispatch({
        type: "add_location",
        location,
      });
    }
  };
};

export const { Provider, Context } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    resetForm,
  },
  {
    currentLocation: null,
    recording: false,
    locations: [],

    name: "",
    stop: false,
  }
);
