import Vue from "vue";
import Vuex from "vuex";

import accountService from "@/services/AccountService";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    cryptoData:null
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
    SET_CRYPTO_DATA(state,cryptoData){
      console.log(cryptoData)
      state.cryptoData = cryptoData
    }
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
    fetchTableData({commit}){
      console.log('fetching')
      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cbinancecoin%2Clitecoin%2Cripple%2Cbitcoin-cash%2Ctornado-cash&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true')
      .then(({data})=>commit('SET_CRYPTO_DATA',data))
    }
  },
  modules: {},
});
