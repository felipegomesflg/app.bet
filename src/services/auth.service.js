import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const signup = (email, password) => {
 
  return axios
    .post(API_URL + "/signup",{
      "username":email,
      "password":password,
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
    .post(API_URL + "/login", {
      "username":email,
      "password":password,
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
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;