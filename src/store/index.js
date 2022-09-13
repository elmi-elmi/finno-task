import Vue from "vue";
import Vuex from "vuex";
import accountService from "@/services/AccountService";
import cryptoService from "@/services/CryptoService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cryptoData: null,
    usersList: null,
    snackContent: null,
  },
  getters: {
    userLoggedIn(state) {
      return !!state.user;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      console.log("useeeeee", state.user);
      localStorage.setItem("user", JSON.stringify(userData));
      accountService.saveAuthHeader(userData.token);
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem("user");
      location.reload();
    },
    SET_CRYPTO_DATA(state, cryptoData) {
      state.cryptoData = cryptoData;
    },
    SET_USERS_LIST(state, usersList) {
      state.usersList = usersList;
    },
    SET_SNACK_CONTENT(state, content) {
      state.snackContent = content;
    },
  },
  actions: {
    doRegister({ commit }, credentials) {
      return accountService
        .register(credentials)
        .then(({ data }) => commit("SET_USER_DATA", data))
        .catch((e) => {
          throw e;
        });
    },
    doLogin({ commit }, credentials) {
      return accountService
        .login(credentials)
        .then(({ data }) => commit("SET_USER_DATA", data))
        .catch((e) => {
          throw e;
        });
    },
    doLogout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
    fetchTableData({ commit }) {
      return cryptoService
        .fetchCryptoData()
        .then(({ data }) => commit("SET_CRYPTO_DATA", data))
        .catch((e) => {
          throw e;
        });
    },
    fetchUsersList({ commit }) {
      return accountService
        .users()
        .then(({ data }) => {
          commit("SET_USERS_LIST", data);
        })
        .catch((e) => {
          throw e;
        });
    },
    snackBarContent({ commit }, content) {
      commit("SET_SNACK_CONTENT", content);
    },
  },

  modules: {},
});
