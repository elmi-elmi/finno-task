import Vue from "vue";
import Vuex from "vuex";

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex);

/**
 * state managment by VUEX
 * 
 *
 * @author Shahrokh elmi
 */


export default new Vuex.Store({
  state: {
    user: null,
    cryptoData: null,
    usersList: null,
    snackContent: null,
  },
  getters ,
  mutations,
  actions,
  modules: {},
});
