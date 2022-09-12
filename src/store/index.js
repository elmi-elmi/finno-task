import Vue from "vue";
import Vuex from "vuex";

import accountService from "@/services/AccountService";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    userLoggedIn(state){
      return !! state.user
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      accountService.saveAuthHeader(userData.token);
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
  },
  actions: {
    doRegister({ commit }, credentials) {
      console.log("---?", credentials);
      return accountService
        .register(credentials)
        .then(({ data }) => commit("SET_USER_DATA", data))
        .catch(console.log); // TODO
    },
    doLogin({ commit }, credentials) {
      return accountService
        .login(credentials)
        .then(({ data }) => commit("SET_USER_DATA", data))
        .catch(console.log); // TODO 
    },
    doLogout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  modules: {},
});
