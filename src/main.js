import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created(){
    // auto login
    const userString = localStorage.getItem('user')
    if(userString){
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    }
  },
  render: h => h(App)
}).$mount('#app')
