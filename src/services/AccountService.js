import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  register(credentials) {
    return apiClient.post("/register", credentials);
  },
  login(credentials) {
    return apiClient.post("/login", credentials);
  },

  users() {
    return apiClient.get("/users?delay=3");
  },
};
