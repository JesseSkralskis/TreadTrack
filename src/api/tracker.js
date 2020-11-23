//where the majic of getting data from mongodb
//can add functions to help with automatic token
import { AsyncStorage } from "react-native";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://vast-castle-60036.herokuapp.com/",
});

//1. set axios config to a variable
//2. attach inteceptors.request.use()
//3. inteceptors.request.use() takes to arguments both functions
//4. second function is error handling
//5. first function is way to attach our token to headers. Authorization
//6. return the modified config object
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
