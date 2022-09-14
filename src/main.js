import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import i18n from './includes/i18n';
import 'nprogress/nprogress.css'
import ProgressBar from './includes/progress-bar.js';
Vue.use(Vuelidate)
Vue.config.productionTip = false
ProgressBar(router);
new Vue({
  router,
  store,
  vuetify,
  i18n,
  created(){
    // auto login
    const userString = localStorage.getItem('user')
    
    if(userString){
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response=>{
        response},
      error=>{
        if(error.response.status === 401){
          this.$store.dispatch('doLogout')
        }
        return Promise.reject(error)
      }
    )
    
  },
  render: h => h(App)
}).$mount('#app')
