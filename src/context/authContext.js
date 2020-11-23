import createDataContext from "../context/createDataContext";
import trackerApi from "../api/tracker";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "store_token":
      return { error: null, token: action.token };
    case "error":
      return { ...state, error: action.error };
    case "clear_error":
      return { ...state, error: null };
    case "logout":
      return { ...state, token: null };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "store_token", token });
      navigate("TrackListScreen");
    } else {
      navigate("loginFlow");
    }
  };
};
//create action functions
const signUp = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/signup", {
      email,
      password,
    });

    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "store_token",
      token: response.data.token,
    });
    navigate("TrackListScreen");
  } catch (err) {
    console.log(err.response.data);
    //checks type of server error response dispatches based on the message
    if (err.response.data.errors) {
      const errorArray = err.response.data.errors;
      const message = errorArray.find((error) => error.param === "email");
      console.log(message.msg);
      dispatch({
        type: "error",
        error: message.msg,
      });
    }
    if (err.response.data.error) {
      dispatch({
        type: "error",
        error: err.response.data.error,
      });
    }
  }
};
const clearError = (dispatch) => {
  console.log("fired");
  return () => {
    dispatch({ type: "clear_error" });
  };
};

const signIn = (dispatch) => async (email, password) => {
  try {
    const response = await trackerApi.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token);
    dispatch({
      type: "store_token",
      token: response.data.token,
    });

    navigate("TrackListScreen");
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "error",
      error: err.response.data.error,
    });
  }
};

const logout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");

  dispatch({
    type: "log_out",
  });
  navigate("Landing");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signUp, signIn, clearError, tryLocalSignin, logout },

  { token: null, error: null }
);
