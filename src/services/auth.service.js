import axios from "axios";
import MainNavigation from "../layout/MainNavigation";

const API_URL = "http://127.0.0.1:8000";
let userData = [];
const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      username: email,
      password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/auth", {
      username: email,
      password: password,
    })
    .then((response) => {
      if (response.data.access_token) {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  console.log("logout");
  localStorage.removeItem("user");
  MainNavigation.currentUser = undefined;
  window.location.reload();
};

const getCurrentUser = () => {
  userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) return false
  const date = new Date();
  const currentTime = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()).getTime();
  //const currentTime = new Date(Date.UTC()).getTime();
  const adjExpirationTime = new Date(userData.expiration_time).getTime();
  const remaining = adjExpirationTime - currentTime;
  if (!remaining || remaining<0) {
    logout();
    return "";
  } else return userData;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
